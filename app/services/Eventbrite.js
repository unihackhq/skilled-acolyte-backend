const client = require('../clients/eventbrite');
const uniUtils = require('../util/University');

exports.prepopulateEvent = (eventId) => {
  return client.getEvent(eventId)
    .then(data => ({
      name: data.name.text,
      startDate: data.start.utc,
      endDate: data.end.utc,
      timezone: data.start.timezone,
      eventbriteId: data.id,
      eventbriteLink: data.url,
      location: data.venue.address.localized_address_display,
    }));
};

const mapAttendeeToStudent = (attendee) => {
  // put questions in an id accessible object
  const questions = attendee.answers.reduce((acc, question) => {
    return Object.assign(acc, { [question.question_id]: question });
  }, {});

  // TODO: put question ids in a config file or something
  const uni = questions['15299392'].answer;
  const studyLevel = questions['15299396'].answer;
  const shirtSize = questions['15299395'].answer;
  const dietaryReq = questions['15299393'].answer;
  const medicalReq = questions['15299394'].answer;

  return uniUtils.findCreateFromName(uni)
    .then(university => ({
      firstName: attendee.profile.first_name,
      lastName: attendee.profile.last_name,
      preferredName: attendee.profile.first_name,
      email: attendee.profile.email,
      dateOfBirth: attendee.profile.birth_date,
      gender: attendee.profile.gender,
      mobile: attendee.profile.cell_phone,
      university: university.id,
      studyLevel,
      // lol we didn't ask :P
      degree: 'Unknown',
      dietaryReq,
      medicalReq,
      shirtSize,
      photoUrl: '',
    }));
};

exports.prepopulateStudents = (eventId) => {
  return client.getAttendees(eventId)
    .then(attendees => attendees.map(attendee => mapAttendeeToStudent(attendee)))
    .then(attendees => Promise.all(attendees));
};
