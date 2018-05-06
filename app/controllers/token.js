const Postmark = require('postmark');
const Joi = require('joi');
const Boom = require('boom');

const { User, Token } = require('../models');
const createToken = require('../util/token').create;
const env = require('../../env');

const emailClient = new Postmark.Client(env.POSTMARK_CLIENT_KEY);

exports.validate = {
  handler: async (req) => {
    const { token } = req.payload;

    const t = await Token.findById(token, { include: [{ model: User, as: 'user' }] });
    if (!t) throw Boom.unauthorized();
    if (new Date() > t.expiry) throw Boom.unauthorized('Token expired');
    if (!t.valid) throw Boom.unauthorized('Token invalid');

    // tokens are one time use
    await t.update({ valid: false });

    const jwt = createToken({ userId: t.user.id, type: 'normal' });
    return { token: jwt };
  },
  validate: {
    payload: {
      token: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: false,
};

exports.request = {
  handler: async (req) => {
    const { params: { email } } = req;

    // Look up user by email
    const user = await User.findOne({ where: { email } });
    if (!user) throw Boom.notFound('Could not find the user');

    // Create Token with userId
    const token = await Token.create();
    await user.addToken(token);
    console.log(token);

    req.log('token', token.id);
    if (env.SEND_EMAIL) {
      // Send the token
      await emailClient.sendEmailWithTemplate({
        From: env.FROM_EMAIL,
        To: email,
        TemplateId: env.POSTMARK_TEMPLATE,
        TemplateModel: {
          product_name: 'Unihack',
          product_url: env.FRONTEND_URL,
          name: user.firstName,
          action_url: `${env.FRONTEND_URL}/entry/${token.id}`
        }
      });
    }
    return {};
  },
  validate: {
    params: {
      email: Joi.string().email(),
    },
  },
  auth: false,
};
