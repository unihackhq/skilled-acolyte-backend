const Boom = require('boom');
const { Event } = require('../models');

exports.list = async () => {
  return Event.findAll();
};

exports.get = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw Boom.notFound('Could not find the event');
  return event;
};

exports.create = async (payload) => {
  try {
    return Event.create(payload);
  } catch (err) {
    throw Boom.internal('Could not create the event');
  }
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
