const Boom = require('boom');
const { HandbookPage } = require('../models');

exports.get = async (id) => {
  const page = await HandbookPage.findById(id);
  if (!page) throw Boom.notFound('Could not find the page');
  return page;
};

exports.create = async (payload) => {
  return HandbookPage.create(payload);
};

exports.update = async (id, payload) => {
  const page = await HandbookPage.findById(id);
  if (!page) throw Boom.notFound('Could not find the page');
  return page.updateAttributes(payload);
};

exports.delete = async (id) => {
  const page = await HandbookPage.findById(id);
  if (!page) throw Boom.notFound('Could not find the page');

  const deleted = await page.destroy({ where: { id } });
  if (!deleted) throw Boom.internal('Could not delete the page');

  return {};
};
