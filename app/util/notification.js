const PushNotifications = require('@pusher/push-notifications-server');
const webpush = require('web-push');
const service = require('../services/notification');
const env = require('../../env');

const pusher = env.DEV ? null : new PushNotifications({
  instanceId: env.BEAMS_INSTANCE_ID,
  secretKey: env.BEAMS_SECRET_KEY,
});

const vapidDetails = {
  subject: `mailto:${env.VAPID_EMAIL}`,
  publicKey: env.VAPID_PUBLIC_KEY,
  privateKey: env.VAPID_PRIVATE_KEY,
};

const sendMobile = async (event, topic, title, body) => {
  try {
    const interest = `${event}-${topic}`;
    const publishResponse = await pusher.publish([interest], {
      apns: { aps: { alert: { title, body } } },
      fcm: { notification: { title, body } },
    });

    console.log(JSON.stringify({ event: 'notification-sent', response: publishResponse }));
  } catch (error) {
    console.log(JSON.stringify({ event: 'notification-error', error }));
  }
};

const sendWeb = async (event, topic, title, body) => {
  if (env.DEV) {
    return;
  }

  const payload = JSON.stringify({ event, topic, title, body });

  const subscriptions = await service.subscriptions(event);
  await Promise.all(subscriptions.map(async (sub) => {
    const { endpoint, auth, p256dh } = sub;
    const subscription = { endpoint, keys: { auth, p256dh } };

    try {
      await webpush.sendNotification(subscription, payload, { vapidDetails });
    } catch (error) {
      // if there is an error, delete the subscription
      await sub.destroy();
    }
  }));
};

exports.send = async (event, topic, title, body) => {
  await sendMobile(event, topic, title, body);
  await sendWeb(event, topic, title, body);
};
