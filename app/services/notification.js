const { Op } = require('sequelize');
const moment = require('moment');
const { ScheduleItem } = require('../models');
const notificationUtil = require('../util/notification');

exports.manual = (eventId, title, body) => {
  return notificationUtil.send([eventId], title, body);
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
    const start = moment(startDate).format('h:mma');
    const startFromNow = moment(startDate).fromNow();

    await notificationUtil.send(
      [item.eventId],
      `${name} starts in ${startFromNow}`,
      `${name} is happening in ${location} at ${start}`,
    );
  });

  return Promise.all(pending);
};
