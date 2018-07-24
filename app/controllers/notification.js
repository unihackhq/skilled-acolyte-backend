const Joi = require('joi');
const Boom = require('boom');
const service = require('../services/notification');
const constant = require('../constants');
const env = require('../../env');

// [GET] /notifications/vapid-key
exports.key = {
  handler: () => {
    return { key: env.VAPID_PUBLIC_KEY };
  },
  auth: {
    scope: [constant.adminScope, constant.studentScope],
  },
};

// [POST] /notifications
exports.send = {
  handler: async (req) => {
    const { eventId, title, body } = req.payload;
    await service.manual(eventId, title, body);
    return {};
  },
  validate: {
    payload: {
      eventId: Joi.string().guid({ version: 'uuidv4' }),
      title: Joi.string(),
      body: Joi.string(),
    },
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [POST] /notifications/subscriptions
exports.subscribe = {
  handler: async (req) => {
    const { type, scope } = req.auth.credentials;
    const { studentId, eventId, endpoint, keys } = req.payload;
    const { auth, p256dh } = keys;

    // check auth. this is manual because the logic is too complex for hapi
    // either has admin scope or has both student and event scope
    if (!(type === constant.adminType || (
      scope.includes(`${constant.eventScope}-${eventId}`) &&
      scope.includes(`${constant.userScope}-${studentId}`)))) {
      return Boom.forbidden('Insufficient scope');
    }

    const { id } = await service.subscribe(studentId, eventId, endpoint, auth, p256dh);
    return { id };
  },
  validate: {
    payload: {
      studentId: Joi.string().guid({ version: 'uuidv4' }).required(),
      eventId: Joi.string().guid({ version: 'uuidv4' }).required(),
      endpoint: Joi.string().uri().required(),
      keys: {
        auth: Joi.string().required(),
        p256dh: Joi.string().required(),
      },
    },
  },
  auth: {
    scope: [constant.adminScope, constant.studentScope],
  },
};

// [DELETE] /notifications/subscriptions/{id}
exports.unsubscribe = {
  handler: async (req) => {
    const { id } = req.params;
    await service.unsubscribe(id);
    return {};
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.subscriptionScope}-{params.id}`],
  },
};
