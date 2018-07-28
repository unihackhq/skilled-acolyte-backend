const Boom = require('boom');
const { Student, Event, sequelize } = require('../models');
const studentService = require('../services/student');
const eventService = require('../services/event');
const eventbriteService = require('../services/eventbrite');

exports.event = async (eventId, data) => {
  const eventbriteData = await eventbriteService.event(eventId);
  // combine eventbrite's data and the original payload's data
  const event = Object.assign({}, eventbriteData, data);
  return eventService.create(event);
};

exports.attendees = async (eventId, questions) => {
  const event = await Event.findOne({ where: { eventbriteId: eventId } });
  if (!event) throw Boom.notFound('Could not find the event');

  const t = await sequelize.transaction();
  try {
    // get list of new students and existing students in parallel
    const [
      newStudents,
      existingStudents,
    ] = await Promise.all([
      eventbriteService.students(eventId, event.id, questions, t),
      Student.findAll({ raw: true }),
    ]);

    // create a map with email as key to find if students already exist or not
    const studentMap = existingStudents.reduce((map, student) => {
      // raw doesn't create instances so all nested properties are weird
      map.set(student['user.email'], student.id);
      return map;
    }, new Map());

    const response = await Promise.all(
      newStudents.map(async (student) => {
        // if user student already exists just add tickets to them
        if (studentMap.has(student.user.email)) {
          const studentId = studentMap.get(student.user.email);
          await student.tickets.map(ticket => studentService.addTicket(studentId, ticket));
          return {
            id: studentId,
            user: {
              email: student.user.email,
            },
            tickets: student.tickets
          };
        }
        return studentService.create(student, t);
      })
    );
    t.commit();
    return response;
  } catch (error) {
    t.rollback();
    throw error;
  }
};
