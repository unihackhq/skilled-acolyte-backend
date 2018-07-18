const Boom = require('boom');
const { Ticket, User } = require('../models');
const studentService = require('./student');
const constant = require('../constants');

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

  const existingStudent = await User.findOne({
    where: { email, type: constant.studentType }
  });
  if (existingStudent) {
    // if the student already has an account
    await ticket.updateAttributes({
      studentId: existingStudent.id
    });
  } else {
    // otherwise create a student
    const student = await studentService.createWithoutTicket({
      user: { email }
    });
    await ticket.updateAttributes({
      studentId: student.id
    });
  }

  return {};
};
