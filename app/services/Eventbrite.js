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
