const Boom = require('boom');
const { Ticket } = require('../models');
const studentService = require('./student');

exports.list = async () => {
  return Ticket.findAll();
};

exports.get = async (id) => {
  const ticket = await Ticket.findById(id);
  if (!ticket) throw Boom.notFound('Could not find the ticket');
  return ticket;
};

exports.transfer = async (id, email) => {
  const ticket = await Ticket.findById(id);
  if (!ticket) throw Boom.notFound('Could not find the ticket');

  const student = await studentService.createWithoutTicket({
    user: { email }
  });
  return ticket.updateAttributes({
    studentId: student.id
  });
};
