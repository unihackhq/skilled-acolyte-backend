const Errors = require('../errors');
const Event = require('../models').Event;
const StudentService = require('../services/StudentService');
const EventService = require('../services/EventService');
const eventbriteService = require('../services/Eventbrite');

exports.prepopulateEvent = (payload, callback) => {
  eventbriteService.prepopulateEvent(payload.eventId)
    .then((data) => {
      EventService.createEvent(data, (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      });
    })
    .catch((error) => {
      // print error (also the response if it's http error)
      console.log(error.message, error.stack, error.response);
      callback(Errors.invalid.failedToCreate('event'));
    });
};

exports.prepopulateAttendees = (payload, callback) => {
  Event.findOne({
    where: {
      eventbriteId: payload.eventId
    }
  })
    .then((event) => {
      if (!event) {
        return callback(Errors.invalid.outOfOrder('event'));
      }

      return eventbriteService.prepopulateStudents(payload.eventId)
        .then((students) => {
          StudentService.bulkCreateStudent(students, (err, result) => {
            if (err) return callback(err);
            return callback(null, result);
          });
        })
        .catch((error) => {
          // print error (also the response if it's http error)
          console.log(error.message, error.stack, error.response);
          callback(Errors.invalid.failedToCreate('student'));
        });
    });
};
