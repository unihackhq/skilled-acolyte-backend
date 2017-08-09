const Joi = require('joi');

const UserService = require('../services/UserService');
const Errors = require('../errors');
const validators = require('../validators');

// [GET] /user
exports.getAllUsers = {
  handler: (req, res) => {
    UserService.listAll((err, results) => {
      if (err) return res(Errors.handler(err));
      return res({ status: 'Success', results });
    });
  },
};

// [GET] /user/{id}
exports.getUserById = {
  handler: (req, res) => {
    const id = req.params.id;
    UserService.getUser(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /user
exports.createUser = {
  handler: (req, res) => {
    const payload = req.payload;
    UserService.createUser(payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
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

    UserService.updateUser(id, payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.User.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [DELETE] /user/{id}
exports.deleteUserById = {
  handler: (req, res) => {
    const id = req.params.id;
    UserService.deleteUser(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
