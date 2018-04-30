const Boom = require('boom');
const { Event } = require('../models');
const StudentService = require('../services/StudentService');
const EventService = require('../services/EventService');
const EventbriteService = require('../services/Eventbrite');

exports.event = async (eventId) => {
  const data = await EventbriteService.event(eventId);
  return EventService.createEvent(data);
};

exports.attendees = async (eventId) => {
  const event = await Event.findOne({ where: { eventbriteId: eventId } });
  if (!event) throw Boom.notFound('Could not find the event');

  const students = await EventbriteService.students(eventId);
  return StudentService.bulkCreateStudent(students);
};
