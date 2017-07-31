const client = require('../clients/eventbrite');

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

const mapAttendeeToStudent = (attendee, eventDBId) => ({

});

exports.prepopulateStudents = (eventId, eventDBId) => {
  return client.getAttendees(eventId)
    .then(data => data.map(attendee => mapAttendeeToStudent(attendee, eventDBId)));
};
