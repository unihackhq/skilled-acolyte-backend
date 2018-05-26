const { University } = require('../models');
const client = require('../clients/eventbrite');
const env = require('../../env');
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

const mapAttendeeToStudent = async (attendee, eventId, t) => {
  const { answers } = attendee;
  const qId = env.EVENTBRITE_QUESTION_IDS;
  const getAnswer = key => _.get(_.find(answers, ['question_id', key]), 'answer', null);

  const uniName = getAnswer(qId.uni);
  const studyLevel = getAnswer(qId.study_level);
  const shirtSize = getAnswer(qId.shirt_size);
  const dietaryReq = getAnswer(qId.dietary_req);
  const medicalReq = getAnswer(qId.medical_req);

  const uni = await findCreateUniFromName(uniName, t);
  return {
    universityId: uni.id,
    studyLevel,
    // lol we didn't ask :P
    degree: 'Unknown',
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

exports.students = async (eventId, dbEventId, t) => {
  const attendees = await client.attendees(eventId);
  const filteredAttendees = attendees.filter(attendee => !attendee.cancelled);
  return Promise.all(
    filteredAttendees.map(
      attendee => mapAttendeeToStudent(attendee, dbEventId, t)
    )
  );
};
