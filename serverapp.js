const fs = require('fs');
//const _ = require("underscore");
const axios = require('axios');
const common = require('./common.js')

function send_value(res, value) {
  console.log('value:',value);
  res.setHeader( 'Content-Type', common.APPLICATION_JSON);
  res.send(JSON.stringify({value:value}));
}
function makeRequest (url, config, handler, errhandler) {
  const axiosconfig = config?config:{};
  console.log('makeRequest', url, axiosconfig);
  //axiosconfig.auth = { username, password };
  axios.get(url, axiosconfig).then(function recvRequest(response) {
    response.request = undefined;
    response.config = undefined;
    //console.log('response', response);
    handler(response);
  })
  .catch(function handleError(e) {
    if (errhandler) {
      console.log('error', e);
      common.logError(e);
    } else {
      console.log('error', e);
    }
  });
  // $.getJSON(url, handler);
} 
function sendRestError(res, error) {
    res.send(JSON.stringify({error:error}));
}
function index(res) {
  sendfile("index.html", res);
}
function sendfile(filePath, res) {
  var rs = fs.createReadStream(filePath);
  console.log('sending '+filePath);
  rs.pipe(res); 
}

module.exports.sendfile= sendfile;
module.exports.send_value= send_value;
module.exports.makeRequest = makeRequest;
module.exports.sendRestError = sendRestError;
module.exports.index = index;
