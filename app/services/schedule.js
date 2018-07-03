const Boom = require('boom');
const { ScheduleItem } = require('../models');

exports.get = async (id) => {
  const item = await ScheduleItem.findById(id);
  if (!item) throw Boom.notFound('Could not find the schedule item');
  return item;
};

exports.create = async (payload) => {
  return ScheduleItem.create(payload);
};

exports.update = async (id, payload) => {
  const item = await ScheduleItem.findById(id);
  if (!item) throw Boom.notFound('Could not find the schedule item');
  return item.updateAttributes(payload);
};

exports.delete = async (id) => {
  const item = await ScheduleItem.findById(id);
  if (!item) throw Boom.notFound('Could not find the schedule item');

  const deleted = await item.destroy();
  if (!deleted) throw Boom.internal('Could not delete the schedule item');

  return {};
};
