const client = require('../clients/eventbrite');

exports.prepopulateEvent = (eventId) => {
  client.getEvent(eventId)
    .then((data) => {
      return {
        name: data.name.text,
        startDate: data.start.utc,
        endDate: data.end.utc,
        timezone: data.start.timezone,
        eventbriteId: data.id,
        eventbriteLink: data.url,
        location: data.venue.address.localized_address_display,
      };
    });
};

exports.prepoulateAttendee = (eventId, attendeeId) => {
  client.getAttendee(eventId, attendeeId)
    .then((data) => {
      return {
        user: {
          firstName: data.profile.first_name,
          lastName: data.profile.lastName,
          preferredName: data.profile.first_name,
          email: data.profile.email,
          authType: 'app',
          dateOfBirth: data.profile.birth_date,
          gender: data.profile.gender,
          mobile: data.profile.cell_phone,
        },
      };
    });
};
