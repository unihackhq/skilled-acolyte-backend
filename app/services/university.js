const Boom = require('boom');
const { University } = require('../models');

exports.list = async () => {
  return University.findAll();
};

exports.get = async (id) => {
  const uni = await University.findById(id);
  if (!uni) throw Boom.notFound('Could not find the university');
  return uni;
};

exports.create = async (payload) => {
  return University.create(payload);
};

exports.update = async (id, payload) => {
  const uni = await University.findById(id);
  if (!uni) throw Boom.notFound('Could not find the university');
  return uni.updateAttributes(payload);
};

exports.delete = async (id) => {
  const uni = await University.findById(id);
  if (!uni) throw Boom.notFound('Could not find the university');

  const deleted = await uni.destroy({ where: { id } });
  if (!deleted) throw Boom.internal('Could not delete the university');

  return {};
};
