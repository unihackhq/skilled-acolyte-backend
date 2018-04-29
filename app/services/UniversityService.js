const Boom = require('boom');
const { University } = require('../models');

const MODEL_NAME = 'university';

exports.listAll = async () => {
  return University.findAll();
};

exports.getUniversity = async (id) => {
  const result = await University.findById(id);
  if (!result) throw Boom.notFound('Could not find the university');
  return result;
};

exports.createUniversity = async (payload) => {
  try {
    const result = await University.create(payload);
    return result;
  } catch (err) {
    throw Boom.internal('Could not create the university');
  }
};

exports.updateUniversity = async (id, payload) => {
  const result = await University.findById(id);
  if (!result) throw Boom.notFound('Could not find the university');
  return result.updateAttributes(payload);
};

exports.deleteUniversity = async (id) => {
  const result = await University.findById(id);
  if (!result) throw Boom.notFound('Could not find the university');

  const deleted = await result.destroy({ where: { id } });
  if (!deleted) throw Boom.internal('Could not delete the university');

  return {};
};
