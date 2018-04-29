const Boom = require('boom');
const { University } = require('../models');

exports.list = async () => {
  return University.findAll();
};

exports.get = async (id) => {
  const result = await University.findById(id);
  if (!result) throw Boom.notFound('Could not find the university');
  return result;
};

exports.create = async (payload) => {
  try {
    const result = await University.create(payload);
    return result;
  } catch (err) {
    throw Boom.internal('Could not create the university');
  }
};

exports.update = async (id, payload) => {
  const result = await University.findById(id);
  if (!result) throw Boom.notFound('Could not find the university');
  return result.updateAttributes(payload);
};

exports.delete = async (id) => {
  const result = await University.findById(id);
  if (!result) throw Boom.notFound('Could not find the university');

  const deleted = await result.destroy({ where: { id } });
  if (!deleted) throw Boom.internal('Could not delete the university');

  return {};
};
