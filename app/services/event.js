const Boom = require('boom');
const { Event, Ticket } = require('../models');

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
    include: [{ model: Ticket, as: 'tickets' }],
  });
  if (!event) throw Boom.notFound('Could not find the event');
  return event.tickets.map(t => t.student);
};

exports.schedule = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw Boom.notFound('Could not find the event');

  return event.getSchedule({ order: [['startDate', 'ASC']] });
};
