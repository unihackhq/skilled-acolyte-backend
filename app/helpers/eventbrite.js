const rp = require('request-promise');
const env = require('../../env');

const BC_ORDER_END_POS = 9;
const BC_ATTENDEE_END_POS = 18;
const API_URL = 'https://www.eventbriteapi.com/v3';

const authHeaders = {
  Authorization: `Bearer ${env.EVENTBRITE_AUTH}`,
};

const restTemplate = (uri, method, headers, json = true) => {
  const options = { uri, method, headers, json };
  return rp(options)
    .catch((err) => {
      console.log('Rest call failed: %s', err);
    });
};

module.exports = {
  extractOrderId: (barcode) => {
    if (barcode.length !== 21) {
      return null;
    }
    return barcode.substring(0, BC_ORDER_END_POS);
  },
  extractAttendeeId: (barcode) => {
    if (barcode.length !== 21) {
      return null;
    }
    return barcode.substring(BC_ORDER_END_POS, BC_ATTENDEE_END_POS);
  },
  apiGET: (endpoint, headers = {}) => restTemplate(API_URL + endpoint, 'GET', Object.assign(headers, authHeaders)),
  apiPOST: (endpoint, headers = {}) => restTemplate(API_URL + endpoint, 'POST', Object.assign(headers, authHeaders)),
};
