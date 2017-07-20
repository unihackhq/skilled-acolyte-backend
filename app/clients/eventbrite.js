const axios = require('axios');
const env = require('../../env');

const api = axios.create({
  baseURL: 'https://www.eventbriteapi.com/v3',
  timeout: 10000,
  headers: { Authorization: `Bearer ${env.EVENTBRITE_AUTH}` },
});

exports.getEvent = (eventId) => {
  return api.get(`/events/${eventId}/?expand=venue`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('Error returned: ', error.message);
    });
};

exports.getAttendee = (eventId, attendeeId) => {
  return api.get(`/events/${eventId}/attendees/${attendeeId}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('Error returned: ', error.message);
    });
};

exports.getAttendees = (eventId) => {
  return api.get(`/events/${eventId}/attendees`)
    .then((response) => {
      return response.data;
    });
};
