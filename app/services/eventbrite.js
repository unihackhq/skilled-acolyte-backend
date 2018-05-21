const { University } = require('../models');
const client = require('../clients/eventbrite');
const env = require('../../env');

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
  // put questions in an id accessible object
  const questions = attendee.answers.reduce((acc, question) => {
    return Object.assign(acc, { [question.question_id]: question });
  }, {});

  const qId = env.EVENTBRITE_QUESTION_IDS;
  const uniName = questions[qId.uni].answer;
  const studyLevel = questions[qId.study_level].answer;
  const shirtSize = questions[qId.shirt_size].answer;
  const dietaryReq = questions[qId.dietary_req].answer;
  const medicalReq = questions[qId.medical_req].answer;

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
  return Promise.all(attendees.map(attendee => mapAttendeeToStudent(attendee, dbEventId, t)));
};
