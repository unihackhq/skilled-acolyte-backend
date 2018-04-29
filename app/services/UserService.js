const Boom = require('boom');
const { User } = require('../models');

exports.list = async () => {
  return User.findAll();
};

exports.get = async (id) => {
  const result = await User.findById(id);
  if (!result) throw Boom.notFound('Could not find the user');
  return result;
};

exports.create = async (payload) => {
  try {
    const result = await User.create(payload);
    return result;
  } catch (err) {
    throw Boom.internal('Could not create the user');
  }
};

exports.update = async (id, payload) => {
  const result = await User.findById(id);
  if (!result) throw Boom.notFound('Could not find the user');
  return result.updateAttributes(payload);
};

exports.delete = async (id) => {
  const result = await User.findById(id);
  if (!result) throw Boom.notFound('Could not find the user');

  const deactivated = result.updateAttributes({ deactivated: true });
  if (!deactivated) throw Boom.internal('Could not delete the user');

  return {};
};
