const Joi = require('joi');
const service = require('../services/token');
const constant = require('../constants');
const env = require('../../env');

exports.list = {
  handler: async () => service.list(),
  auth: {
    scope: [constant.adminScope],
  }
};

exports.request = {
  handler: async (req) => {
    const { email } = req.params;

    // bypass normal auth for admin and send jwt to slack
    if (email === env.ADMIN_EMAIL) {
      const jwt = await service.admin();
      await service.adminSendSlack(jwt);

      // log jwt, slack message doesn't get sent in dev environment
      if (env.DEV) {
        req.log('admin-jwt', jwt);
      }
      return {};
    }

    const { token, user } = await service.create(email);
    await service.sendAuthEmail(email, user.preferredName, token.id);

    // log token in dev environment (useful since emails are turned off)
    if (env.DEV) {
      req.log('token', token.id);
    }

    return {};
  },
  validate: {
    params: {
      email: Joi.string().email(),
    },
  },
  auth: false,
};

exports.validate = {
  handler: async (req) => {
    const { token } = req.payload;
    const jwt = await service.validate(token);
    return { token: jwt };
  },
  validate: {
    payload: {
      token: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: false,
};
