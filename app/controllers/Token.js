const Postmark = require('postmark');
const Joi = require('joi');
const Boom = require('boom');

const User = require('../models').User;
const Token = require('../models').Token;
const createToken = require('../util/Token').create;
const env = require('../../env');

const FIFTEEN_MINUTES = 900;

const emailClient = new Postmark.Client(env.POSTMARK_CLIENT_KEY);

exports.validate = {
  validate: {
    payload: {
      token: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid token')),
    },
  },
  handler: (req, res) => {
    const { payload: { token }} = req;
    Token.findById(token)
      .then(token => {
        if (!token) {
          throw Boom.unauthorized();
        }
        if (new Date() > token.expiry) {
          throw Boom.unauthorized('Token expired');
        }
        if (!token.valid) {
          console.log('token invalid');
          throw Boom.unauthorized('Token invalid');
        }
        return User.findById(token.userId)
      })
      .then(user => 
        Token.update({ valid: false }, { where: { id: token } })
          .then(() => {
            console.log(user.id);
            const jwt = createToken({ userId: user.id });
            // Create JWT here
            return res({ token: jwt});
          })
      )
      .catch((err) => {
        console.log(err);
        return res(Boom.unauthorized());
      });
  }
};

exports.request = {
  validate: {
    params: {
      email: Joi.string().email(),
    },
  },
  handler: (req, res) => {
    const { params: { email } } = req;

    // Look up user by email
    // Create Token with userId
    User.findOne({ where: { email }})
      .then(user => Token.create({ userId: user.id }))
      .then(token => {
        console.log(token.id);
        // Send the token
        emailClient.sendEmail({
          From: "UNIHACK Team <unihack@anonmail.ovh>",
          To: email,
          Subject: "Verify your email address to use UNIHACK",
          TextBody: `Your token is: ${token.id}` // TODO: This will need an email template + link to frontend
        }, (err, res) => {
          // TODO: Logs here
        });

        res();
      })
      .catch(err => {
        res(Boom.badRequest(err)); // TODO: Proper error
      })
  }
};
