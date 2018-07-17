const PushNotifications = require('@pusher/push-notifications-server');
const env = require('../../env');

let pusher;
if (env.PROD) {
  pusher = new PushNotifications({
    instanceId: env.BEAMS_INSTANCE_ID,
    secretKey: env.BEAMS_SECRET_KEY,
  });
}

exports.send = async (interests, title, body) => {
  try {
    const publishResponse = await pusher.publish(interests, {
      apns: {
        aps: { alert: { title, body } },
      },
      fcm: {
        notification: { title, body },
      },
    });
    console.log(
      JSON.stringify({
        event: 'notification-sent',
        response: publishResponse,
      }),
    );
  } catch (error) {
    console.log(
      JSON.stringify({
        event: 'notification-error',
        error,
      }),
    );
  }
};
