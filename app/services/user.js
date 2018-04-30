const Boom = require('boom');
const { User } = require('../models');

exports.list = async () => {
  return User.findAll();
};

exports.get = async (id) => {
  const user = await User.findById(id);
  if (!user) throw Boom.notFound('Could not find the user');
  return user;
};

exports.create = async (payload) => {
  try {
    return User.create(payload);
  } catch (err) {
    throw Boom.internal('Could not create the user');
  }
};

exports.update = async (id, payload) => {
  const user = await User.findById(id);
  if (!user) throw Boom.notFound('Could not find the user');
  return user.updateAttributes(payload);
};

exports.delete = async (id) => {
  const user = await User.findById(id);
  if (!user) throw Boom.notFound('Could not find the user');

  const deactivated = user.updateAttributes({ deactivated: true });
  if (!deactivated) throw Boom.internal('Could not delete the user');

  return {};
};
