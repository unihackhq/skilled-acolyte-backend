const Joi = require('joi');

const User = require('../models').User;
const validators = require('../validators');
const responses = require('../responses');

// [GET] /user
exports.getAllUsers = {
  handler: (req, res) => {
    User.findAll()
      .then((result) => {
        res({
          status: 'Success',
          data: result,
        });
      });
  },
};

// [GET] /user/{id}
exports.getUserById = {
  handler: (req, res) => {
    const id = req.params.id;

    User.findById(id)
      .then((result) => {
        if (!result) {
          return res(responses.notFound('user'));
        }
        return res(result);
      });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};

// [POST] /user
exports.createUser = {
  handler: (req, res) => {
    const payload = req.payload;
    return User.create(payload)
      .then((result) => { res(result); })
      .catch(() => { res(responses.internalError('create', 'user')); });
  },
  validate: {
    payload: validators.User.payload,
  },
};

// [PUT] /user/{id}
exports.updateUserById = {
  handler: (req, res) => {
    const id = req.params.id;
    const payload = req.payload;

    User.findById(id)
      .then((user) => {
        if (!user) {
          return res(responses.notFound('user'));
        }

        return user.updateAttributes(payload)
          .then((result) => { res(result); });
      });
  },
  validate: {
    payload: validators.User.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};

// [DELETE] /user/{id}
exports.deleteUserById = {
  handler: (req, res) => {
    const id = req.params.id;

    // Soft delete
    User.findById(id)
      .then((user) => {
        if (!user) {
          return res(responses.notFound('user'));
        }

        return user.updateAttributes({
          deactivated: true,
        })
          .then(() => res(responses.successDelete('user')));
      });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};
