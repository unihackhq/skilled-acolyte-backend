const Joi = require('joi');
const Boom = require('boom');
const Event = require('../models').Event;
const responses = require('../responses');
const ebService = require('../services/Eventbrite');

// [POST] /prepopulate/event
exports.prepoulateEvent = {
  handler: (req, res) => {
    const payload = req.payload;
    ebService.prepopulateEvent(payload.eventId)
      .then((data) => {
        Event.create(data)
          .then((result) => { res(result); })
          .catch(() => { res(responses.internalError('create', 'event')); });
      })
      .catch((error) => {
        // print error (also the response if it's http error)
        console.log(error.message, error.stack, error.response);
        res(responses.internalError('create', 'event'));
      });
  },
  validate: {
    payload: {
      eventId: Joi.string().required(),
    },
  },
};

// [POST] /prepopulate/attendees
exports.prepoulateAttendees = {
  handler: (req, res) => {
    const payload = req.payload;

    Event.findOne({
      where: {
        eventbriteId: payload.eventId
      }
    })
      .then((event) => {
        if (!event) {
          return res(Boom.badRequest('You must import the event first!'));
        }

        return ebService.prepopulateStudents(payload.eventId)
          .then((data) => {
            res(data);
          })
          .catch((error) => {
            // print error (also the response if it's http error)
            console.log(error.message, error.stack, error.response);
            res(responses.internalError('create', 'event'));
          });
      });
  },
  validate: {
    payload: {
      eventId: Joi.string().required(),
    },
  },
};

