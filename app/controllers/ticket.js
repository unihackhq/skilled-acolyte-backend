const Joi = require('joi');

const strip = require('../util/strip');
const service = require('../services/ticket');
const constant = require('../constants');

// [GET] /tickets
exports.list = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;

    const list = await service.list();
    return list.map(ticket => strip.ticket(ticket, scope));
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [GET] /tickets/{id}
exports.get = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const ticket = await service.get(id);
    return strip.ticket(ticket, scope);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.ticketScope}-{params.id}`],
  },
};

// [POST] /tickets/{id}/transfer
exports.transfer = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;
    const { email } = req.payload;

    const ticket = await service.transfer(id, email);
    return strip.ticket(ticket, scope);
  },
  validate: {
    payload: {
      email: Joi.string().email(),
    },
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.ticketScope}-{params.id}`],
  },
};
