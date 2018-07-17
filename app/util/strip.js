const _ = require('lodash');
const constant = require('../constants');

exports.student = (student, scope) => {
  if (scope.includes(constant.adminScope)) {
    return student;
  }

  let stripped;
  if (scope.includes(`${constant.userScope}-${student.id}`)) {
    stripped = _.pick(student, [
      'id',
      'studyLevel',
      'degree',
      'photoUrl',
      'firstLaunch',
      'universityId',
    ]);
  } else {
    stripped = _.pick(student, [
      'id',
      'photoUrl',
      'universityId'
    ]);
  }

  return Object.assign(stripped, {
    university: exports.university(student.university, scope),
    user: exports.user(student.user, scope),
  });
};

exports.user = (user, scope) => {
  if (scope.includes(constant.adminScope)) {
    return user;
  }

  if (scope.includes(`${constant.userScope}-${user.id}`)) {
    return _.pick(user, [
      'id',
      'email',
      'firstName',
      'lastName',
      'preferredName',
      'dateOfBirth',
      'gender',
      'mobile',
      'type',
    ]);
  }

  return _.pick(user, [
    'id',
    'firstName',
    'lastName',
    'preferredName',
  ]);
};

exports.university = (university, scope) => {
  if (scope.includes(constant.adminScope)) {
    return university;
  }

  return _.pick(university, ['id', 'name', 'country']);
};

exports.event = (event, scope) => {
  if (scope.includes(constant.adminScope)) {
    return event;
  }

  return _.pick(event, [
    'id',
    'name',
    'startDate',
    'endDate',
    'location',
    'handbookUrl',
    'logoColor',
    'sponsors',
    'prizes',
    'judges',
  ]);
};

exports.schedule = (scheduleItem, scope) => {
  if (scope.includes(constant.adminScope)) {
    return scheduleItem;
  }

  const stripped = _.pick(scheduleItem, [
    'id',
    'name',
    'description',
    'type',
    'location',
    'startDate',
    'endDate',
    'eventId',
  ]);

  return Object.assign(stripped, {
    event: exports.event(scheduleItem.event, scope),
  });
};

exports.team = (team, scope) => {
  if (scope.includes(constant.adminScope)) {
    return team;
  }

  const stripped = _.pick(team, [
    'id',
    'name',
    'shortDescription',
    'stack',
    'devpostLink',
    'longDescription',
    'photoUrl',
    'eventId'
  ]);

  // add stripped members and invited
  if (team.members) {
    Object.assign(stripped, {
      members: team.members.map(student => exports.student(student, scope)),
    });
  }
  if (team.invited) {
    Object.assign(stripped, {
      invited: team.invited.map(student => exports.student(student, scope)),
    });
  }

  return stripped;
};

exports.ticket = (ticket, scope) => {
  if (scope.includes(constant.adminScope)) {
    return ticket;
  }

  const stripped = _.pick(ticket, [
    'id',
    'eventbriteOrder',
    'ticketType',
    'transferred',
    'cancelled',
    'studentId',
    'eventId',
  ]);

  return Object.assign(stripped, {
    student: exports.student(ticket.student, scope),
    event: exports.event(ticket.event, scope),
  });
};
