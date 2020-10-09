//'use strict';

//const _ = require("underscore");
const $ = require('jquery');

const common = require('./common.js')
const BASE_URL ="/demo";

var jsonParams = {};

function update_value() {
  $('#value').text("loading...");
  common.makeRequest('/rest/value', undefined , function _recv(json) {
    console.log(json.data);
    console.log("value", json.data.value);
    $('#value').text(json.data.value);
  }, jsonParams); 
}
function startup() {
  console.log("startup");
  $("#value" ).click(update_value);
  update_value();
}

$('#main').ready( function load() {
  startup();
});
