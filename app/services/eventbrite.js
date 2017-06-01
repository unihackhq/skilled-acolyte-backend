const ebHelper = require('../helpers/eventbrite');

module.exports = {
  prepopulateEvent: (eventId) => {
    return ebHelper.apiGET(`/events/${eventId}/?expand=venue`)
      .then((data) => {
        console.log('Successfully getting data from event ', eventId, '.');

        const payload = {
          name: data.name.text,
          startDate: data.start.utc,
          endDate: data.end.utc,
          timezone: data.start.timezone,
          eventbriteId: data.id,
          eventbriteLink: data.url,
          location: data.venue.address.localized_address_display,
        };

        return payload;
      });
  },
};
