const Postmark = require('postmark');

const env = require('./env');

// Email
const emailClient = new Postmark.Client(env.POSTMARK_CLIENT_KEY);

exports.validate = {
  handler: (req, res) => {
    // TODO:
    // Validate token exists
    // Validate token has not expired
    // Get corresponding user and create JWT
  }
};

exports.request = {
  handler: (req, res) => {
    // TODO:
    // Create the Token here
    res();
  }
};
