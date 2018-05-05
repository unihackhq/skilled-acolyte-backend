const Stream = require('stream');
const { RequestError } = require('good/lib/utils');

class RequestErrorScrubber extends Stream.Transform {
  constructor(options) {
    super(Object.assign({}, options, { objectMode: true }));
  }

  // eslint-disable-next-line class-methods-use-this
  _transform(chunk, enc, callback) {
    let data = chunk;
    if (data instanceof RequestError) {
      // strip RequestError because RequestError.toJSON will obfuscate the error
      data = Object.assign({}, data);
    }
    return callback(null, data);
  }
}

exports.requestErrorScrubber = RequestErrorScrubber;
