'use strict';

const db = require('../models');
const Boom = require('boom');
const UniversityController = {};
const universityResponse = (data) => {
  id: data.id,
  name: data.name,
  country: data.country
}

// [GET] /university/{id}
UniversityController.prototype.get = function (req, res) {
  let id = req.param.id;

  db.University.findById(id).then(
    (result) => {
      res(universityResponse(result));
    },
    (err) => {
      console.error(err);
      res(Boom.badImplementation());
    },
  );
};

// [POST] /niversity
UniversityController.prototype.post = function (arguments) {

}

module.exports = UniversityController;
