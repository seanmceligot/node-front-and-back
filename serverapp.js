//const fs = requere('fs');
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
function index(res, value) {
 const html = `<html>\n
  <head>\n
  <script src="/bundle.js"></script>\n
  <link rel="stylesheet" href="app.css">\n
  \n
  <script>\n
  </script>\n
  </head>\n
  \n
  <body>\n
  <h3 id='header'><h3>\n
  <div id='main'>\n
  <div id='value'>${value}</div>
  </div>\n
  `;
  res.send(html);
}
module.exports.send_value= send_value;
module.exports.makeRequest = makeRequest;
module.exports.sendRestError = sendRestError;
module.exports.index = index;
