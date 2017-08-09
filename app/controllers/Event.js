const Joi = require('joi');

const EventService = require('../services/EventService');
const Errors = require('../errors');
const validators = require('../validators');

// [GET] /events
exports.getAllEvents = {
  handler: (req, res) => {
    EventService.listAll((err, results) => {
      if (err) return res(Errors.handler(err));
      return res({ status: 'Success', results });
    });
  },
};

// [GET] /event/{id}
exports.getEventById = {
  handler: (req, res) => {
    const id = req.params.id;
    EventService.getEvent(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /event
exports.createEvent = {
  handler: (req, res) => {
    const payload = req.payload;
    EventService.createEvent(payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.Event.payload(true),
  },
};

// [PUT] /event/{id}
exports.updateEventById = {
  handler: (req, res) => {
    const id = req.params.id;
    const payload = req.payload;
    EventService.updateEvent(id, payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.Event.payload(false),
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [DELETE] /event/{id}
exports.deleteEventById = {
  handler: (req, res) => {
    const id = req.params.id;
    EventService.deleteEvent(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
