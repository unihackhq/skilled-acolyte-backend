const Boom = require('boom');
const { Event, sequelize } = require('../models');
const studentService = require('../services/student');
const eventService = require('../services/event');
const eventbriteService = require('../services/eventbrite');

exports.event = async (eventId) => {
  const data = await eventbriteService.event(eventId);
  return eventService.create(data);
};

exports.attendees = async (eventId) => {
  const event = await Event.findOne({ where: { eventbriteId: eventId } });
  if (!event) throw Boom.notFound('Could not find the event');


  const t = await sequelize.transaction();
  try {
    const students = await eventbriteService.students(eventId, event.id, t);
    const response = await Promise.all(students.map(student => studentService.create(student, t)));
    t.commit();
    return response;
  } catch (error) {
    t.rollback();
    throw error;
  }
};
