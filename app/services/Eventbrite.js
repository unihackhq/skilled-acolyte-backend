const { University } = require('../models');
const client = require('../clients/eventbrite');

exports.event = async (eventId) => {
  const {
    name,
    start,
    end,
    id,
    url,
    venue
  } = await client.getEvent(eventId);
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
const findCreateUniFromName = (name) => {
  return University
    .findOrCreate({ where: { name }, defaults: { country: 'Australia' } })
    .spread(uni => uni.get({ plain: true }));
};

const mapAttendeeToStudent = async (attendee) => {
  // put questions in an id accessible object
  const questions = attendee.answers.reduce((acc, question) => {
    return Object.assign(acc, { [question.question_id]: question });
  }, {});

  // TODO: put question ids in a config file or something
  const uniName = questions['15299392'].answer;
  const studyLevel = questions['15299396'].answer;
  const shirtSize = questions['15299395'].answer;
  const dietaryReq = questions['15299393'].answer;
  const medicalReq = questions['15299394'].answer;

  const uni = await findCreateUniFromName(uniName);
  return {
    user: {
      firstName: attendee.profile.first_name,
      lastName: attendee.profile.last_name,
      preferredName: attendee.profile.first_name,
      email: attendee.profile.email,
      dateOfBirth: attendee.profile.birth_date,
      gender: attendee.profile.gender,
      mobile: attendee.profile.cell_phone
    },
    university: uni.id,
    studyLevel,
    // lol we didn't ask :P
    degree: 'Unknown',
    dietaryReq,
    medicalReq,
    shirtSize,
    photoUrl: '',
  };
};

exports.students = async (eventId) => {
  const attendees = await client.getAttendees(eventId);
  return Promise.all(attendees.map(attendee => mapAttendeeToStudent(attendee)));
};
