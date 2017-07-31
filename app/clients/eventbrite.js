const axios = require('axios');
const env = require('../../env');

const api = axios.create({
  baseURL: 'https://www.eventbriteapi.com/v3',
  timeout: 10000,
  headers: { Authorization: `Bearer ${env.EVENTBRITE_TOKEN}` },
});

const call = (url) => {
  return api.get(url)
    .then(response => response.data);
};

exports.getEvent = (eventId) => {
  return call(`/events/${eventId}/?expand=venue`);
};

exports.getAttendee = (eventId, attendeeId) => {
  return call(`/events/${eventId}/attendees/${attendeeId}/`);
};

exports.getAttendees = (eventId) => {
  return call(`/events/${eventId}/attendees`);
};
