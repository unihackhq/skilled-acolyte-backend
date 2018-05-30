const Boom = require('boom');
const { Event, Ticket, Student } = require('../models');

exports.list = async () => {
  return Event.findAll();
};

exports.get = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw Boom.notFound('Could not find the event');
  return event;
};

exports.create = async (payload) => {
  return Event.create(payload);
};

exports.update = async (id, payload) => {
  const event = await Event.findById(id);
  if (!event) throw Boom.notFound('Could not find the event');
  return event.updateAttributes(payload);
};

exports.delete = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw Boom.notFound('Could not find the event');

  const deleted = await event.destroy({ where: { id } });
  if (!deleted) throw Boom.internal('Could not delete the event');

  return {};
};

exports.attendees = async (id) => {
  const event = await Event.findById(id, {
    include: [{
      model: Ticket,
      as: 'tickets',
      include: [{ model: Student, as: 'student' }],
    }],
  });
  if (!event) throw Boom.notFound('Could not find the event');
  return event.tickets.map(t => t.student);
};
