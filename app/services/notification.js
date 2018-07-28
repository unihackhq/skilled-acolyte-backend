const Boom = require('boom');
const { Op } = require('sequelize');
const moment = require('moment-timezone');
const { ScheduleItem, NotificationSubscription } = require('../models');
const notificationUtil = require('../util/notification');

exports.manual = (eventId, title, body) => {
  return notificationUtil.send(eventId, 'importantMessages', title, body);
};

exports.worker = async () => {
  // find all schedule items starting in the next 15 min
  const items = await ScheduleItem.findAll({
    where: {
      startDate: {
        [Op.gt]: moment().toDate(),
        [Op.lt]: moment().add(15, 'm').toDate(),
      },
      notificationSent: false,
    },
  });

  // send notification for each item
  const pending = items.map(async (item) => {
    await item.update({ notificationSent: true });

    const { name, location, startDate } = item;
    const start = moment(startDate).tz('Australia/Sydney').format('h:mma');
    const startFromNow = moment(startDate).fromNow();

    await notificationUtil.send(
      item.eventId,
      item.type,
      `${name} starts ${startFromNow}`,
      `${name} is happening in ${location} at ${start}`,
    );
  });

  return Promise.all(pending);
};

exports.subscribe = async (studentId, eventId, endpoint, auth, p256dh) => {
  return NotificationSubscription.create({
    studentId,
    eventId,
    endpoint,
    auth,
    p256dh,
  });
};

exports.unsubscribe = async (id) => {
  const subscription = await NotificationSubscription.findOne({ where: { id } });
  if (!subscription) throw Boom.notFound('Could not find the subscription');
  await subscription.destroy();
  return {};
};

exports.subscriptions = async (eventId) => {
  return NotificationSubscription.findAll({ where: { eventId } });
};
