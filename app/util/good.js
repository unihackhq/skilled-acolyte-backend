const Stream = require('stream');
const { RequestError } = require('good/lib/utils');

class RequestErrorScrubber extends Stream.Transform {
  constructor(options) {
    super(Object.assign({}, options, { objectMode: true }));
  }

  _transform(data, enc, next) {
    if (data instanceof RequestError) {
      // strip RequestError because RequestError.toJSON will obfuscate the error
      data = Object.assign({}, data);
    }
    return next(null, data);
  }
}

exports.requestErrorScrubber = RequestErrorScrubber;
