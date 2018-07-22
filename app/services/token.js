const Postmark = require('postmark');
const Boom = require('boom');
const axios = require('axios');
const { User, Token } = require('../models');
const { create: createJwt } = require('../util/jwt');
const env = require('../../env');
const constant = require('../constants');

const emailClient = env.DEV ? null : new Postmark.Client(env.POSTMARK_CLIENT_KEY);

exports.list = async () => Token.findAll({ where: { valid: true } });

exports.create = async (email) => {
  // Look up user by email
  const user = await User.findOne({ where: { email } });
  if (!user) throw Boom.notFound('Could not find the user');

  // Create Token with userId
  const token = await Token.create();
  await user.addToken(token);
  return { token, user };
};

exports.validate = async (token) => {
  const t = await Token.findById(token, { include: [{ model: User, as: 'user' }] });
  if (!t) throw Boom.unauthorized();
  if (new Date() > t.expiry) throw Boom.unauthorized('Token expired');
  if (!t.valid) throw Boom.unauthorized('Token invalid');

  // tokens are one time use
  await t.update({ valid: false });

  return createJwt({ userId: t.user.id, type: t.user.type });
};

exports.admin = async () => createJwt({ type: constant.adminType });

exports.sendAuthEmail = async (email, name, token) => {
  // we don't want random emails to go off in dev
  if (env.DEV) {
    return;
  }

  // Send the token
  await emailClient.sendEmailWithTemplate({
    From: env.FROM_EMAIL,
    To: email,
    TemplateId: env.POSTMARK_TEMPLATE,
    TemplateModel: {
      product_name: 'Unihack',
      product_url: env.FRONTEND_URL,
      name,
      action_url: `${env.FRONTEND_URL}/entry/${token}`,
      action_url_ios: `${env.IOS_PREFIX}token/${token}`,
    }
  });
};

exports.adminSendSlack = async (jwt) => {
  // we don't want to spam slack with dev env jwts
  if (!env.DEV) {
    return;
  }

  // send jwt to slack
  await axios.post(env.SLACK_WEBHOOK_URL, {
    text: `Genereted admin JWT: \`${jwt}\``,
  });
};
