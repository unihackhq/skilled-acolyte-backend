const { University } = require('../models');
const client = require('../clients/eventbrite');
const _ = require('lodash');

exports.event = async (eventId) => {
  const {
    name,
    start,
    end,
    id,
    url,
    venue
  } = await client.event(eventId);
  return {
    name: name.text,
    startDate: start.utc,
    endDate: end.utc,
    timezone: start.timezone,
    eventbriteId: id,
    eventbriteLink: url,
    location: venue.address.localized_address_display,
  };
};

// find or create a university with name
const findCreateUniFromName = (name, t) => {
  return University
    .findOrCreate({
      where: { name },
      defaults: { country: 'Australia' },
      transaction: t,
    })
    .spread(uni => uni.get({ plain: true }));
};

const mapAttendeeToStudent = async (attendee, eventId, questions, t) => {
  const { answers } = attendee;
  const getAnswer = key => _.get(_.find(answers, ['question_id', key]), 'answer', null);

  const uniName = getAnswer(questions.uni);
  const studyLevel = getAnswer(questions.studyLevel);
  const degree = getAnswer(questions.degree);
  const shirtSize = getAnswer(questions.shirtSize);
  const dietaryReq = getAnswer(questions.dietaryReq);
  const medicalReq = getAnswer(questions.medicalReq);

  const uni = await findCreateUniFromName(uniName, t);
  return {
    universityId: uni.id,
    studyLevel,
    degree,
    dietaryReq,
    medicalReq,
    shirtSize,
    photoUrl: null,
    user: {
      firstName: attendee.profile.first_name,
      lastName: attendee.profile.last_name,
      preferredName: attendee.profile.first_name,
      email: attendee.profile.email,
      dateOfBirth: attendee.profile.birth_date,
      gender: attendee.profile.gender,
      mobile: attendee.profile.cell_phone
    },
    tickets: [{
      eventId,
      eventbriteOrder: attendee.order_id,
      ticketType: attendee.ticket_class_name,
      cancelled: attendee.cancelled,
    }],
  };
};

exports.students = async (eventId, dbEventId, questions, t) => {
  const attendees = await client.attendees(eventId);
  const filteredAttendees = attendees.filter(attendee => !attendee.cancelled);
  return Promise.all(
    filteredAttendees.map(
      attendee => mapAttendeeToStudent(attendee, dbEventId, questions, t)
    )
  );
};
