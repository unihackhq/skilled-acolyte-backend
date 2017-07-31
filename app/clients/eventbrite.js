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

const getMoreAttendees = (eventId, data) => {
  // if (data.pagination.has_more_items) {
  //   return call(`/events/${eventId}/attendees?continuation=${data.pagination.continuation}`)
  //     // call this function again to get more attendees if this isn't the last page
  //     .then(data => getMoreAttendees(eventId, data))
  //     // concat the attendees from prev call with attendees
  //     // from the current call (all the calls after it)
  //     .then(newAttendees => data.attendees.concat(newAttendees));
  // }
  return data.attendees;
};

exports.getAttendees = (eventId) => {
  return call(`/events/${eventId}/attendees`)
    .then(data => getMoreAttendees(eventId, data));
};
