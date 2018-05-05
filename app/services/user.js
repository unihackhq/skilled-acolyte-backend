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
  return User.create(payload);
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
