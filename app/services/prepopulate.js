const Boom = require('boom');
const { Event } = require('../models');
const studentService = require('../services/student');
const eventService = require('../services/event');
const eventbriteService = require('../services/eventbrite');

exports.event = async (eventId) => {
  const data = await eventbriteService.event(eventId);
  return eventService.createEvent(data);
};

exports.attendees = async (eventId) => {
  const event = await Event.findOne({ where: { eventbriteId: eventId } });
  if (!event) throw Boom.notFound('Could not find the event');

  const students = await eventbriteService.students(eventId);
  return studentService.bulkCreateStudent(students);
};
