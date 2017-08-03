const Joi = require('joi');
const Boom = require('boom');
const Errors = require('../errors');
const Event = require('../models').Event;
const StudentService = require('../services/StudentService');
const EventService = require('../services/EventService');
const responses = require('../responses');
const ebService = require('../services/Eventbrite');

// TODO: Remove Responses and rationalise errors into one class (errors.js)

// [POST] /prepopulate/event
exports.prepoulateEvent = {
  handler: (req, res) => {
    const payload = req.payload;
    ebService.prepopulateEvent(payload.eventId)
      .then((data) => {
        EventService.createEvent(data, (err, result) => {
          if (err) return res(Errors.handler(err));
          return res(result);
        });
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
          .then((students) => {
            StudentService.bulkCreateStudent(students, (err, result) => {
              if (err) return res(Errors.handler(err));
              return res(result);
            });
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
