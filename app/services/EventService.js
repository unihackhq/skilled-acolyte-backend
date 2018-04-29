const Boom = require('boom');
const { Event } = require('../models');

exports.list = async () => {
  return Event.findAll();
};


exports.get = async (id) => {
  const result = await Event.findById(id);
  if (!result) throw Boom.notFound('Could not find the event');
  return result;
};

exports.create = async (payload) => {
  try {
    const result = await Event.create(payload);
    return result;
  } catch (err) {
    throw Boom.internal('Could not create the event');
  }
};

exports.update = async (id, payload) => {
  const result = await Event.findById(id);
  if (!result) throw Boom.notFound('Could not find the event');
  return result.updateAttributes(payload);
};

exports.delete = async (id) => {
  const result = await Event.findById(id);
  if (!result) throw Boom.notFound('Could not find the event');

  const deleted = await result.destroy({ where: { id } });
  if (!deleted) throw Boom.internal('Could not delete the event');

  return {};
};
