const axios = require('axios');
const env = require('../../env');

const api = axios.create({
  baseURL: 'https://www.eventbriteapi.com/v3',
  timeout: 10000,
  headers: { Authorization: `Bearer ${env.EVENTBRITE_AUTH}` },
});

module.exports = {
  prepopulateEvent: (eventId) => {
    return api.get(`/events/${eventId}/?expand=venue`)
      .then((response) => {
        const data = response.data;
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
      })
      .catch((error) => {
        console.log('Error returned: ', error.message);
      });
  },
};
