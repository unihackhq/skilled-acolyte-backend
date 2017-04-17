const Joi = require('joi');

const Event = require('../models').Event;
const validators = require('../validators');
const responses = require('../responses');

// [GET] /events
exports.getAllEvents = {
  handler: (req, res) => {
    Event.findAll()
      .then((result) => {
        res({
          status: 'Success',
          data: result,
        });
      });
  },
};

// [GET] /event/{id}
exports.getEventById = {
  handler: (req, res) => {
    const id = req.params.id;

    Event.findById(id)
      .then((result) => {
        if (!result) {
          return res(responses.notFound('event'));
        }
        return res(result);
      });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};

// [POST] /event
exports.createEvent = {
  handler: (req, res) => {
    const payload = req.payload;
    return Event.create(payload)
      .then((result) => { res(result); })
      .catch(() => { res(responses.internalError('create', 'event')); });
  },
  validate: {
    payload: validators.Event.payload,
  },
};

// [PUT] /event/{id}
exports.updateEventById = {
  handler: (req, res) => {
    const id = req.params.id;
    const payload = req.payload;

    Event.findById(id)
      .then((event) => {
        if (!event) {
          return res(responses.notFound('event'));
        }

        return event.updateAttributes(payload)
          .then((result) => { res(result); });
      });
  },
  validate: {
    payload: validators.Event.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};

// [DELETE] /event/{id}
exports.deleteEventById = {
  handler: (req, res) => {
    const id = req.params.id;

    Event.findById(id)
      .then((event) => {
        if (!event) {
          return res(responses.notFound('event'));
        }

        return event.destroy({
          where: { id },
        }).then((result) => {
          if (!result) {
            return res(responses.internalError('delete', 'event'));
          }

          return res(responses.successDelete('event'));
        });
      });
  },
  validate: {
    payload: validators.Event.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};
