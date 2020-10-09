const axios = require('axios');

function logError(e) {
  console.log('error', e);
}

function makeRequest(url, config, handler) {
  console.log('makeRequest', url);
  axios.get(url, config?config:{})
    .then(function recvResponse(response) {
      response.request = undefined;
      response.config = undefined;
      console.log('response', response);
      handler(response); 
    })
    .catch(logError);
  // $.getJSON(url, handler);
}
module.exports = {
  TEXT_HTML : 'text/html',
  TEXT_CSS : 'text/css',
  APPLICATION_JSON:'application/json',
  APPLICATION_JAVASCRIPT:'application/javascript',
  makeRequest : makeRequest
}

