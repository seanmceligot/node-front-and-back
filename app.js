const fs = require('fs');
const express = require('express')
const app = express();

const common = require('./common.js')
const serverapp = require('./serverapp.js')
const moment = require("moment");

app.get('/', function handleHome(req, res) {
  console.log(req.baseUrl);
  res.setHeader( 'Content-Type', common.TEXT_HTML);
  serverapp.index(res, "start");
});
app.get('/app.css', function handleCss(req, res) {
  console.log(req.baseUrl);
  res.setHeader( 'Content-Type', common.TEXT_CSS);
  serverapp.sendfile('app.css', res);
});
app.get('/bundle.js', function handleJs(req, res) {
  console.log(req.baseUrl);
  //const value= req.params.value;
  //console.log('value:',value);
  res.setHeader( 'Content-Type', common.APPLICATION_JAVASCRIPT);
  send_clientjs('build/clientapp.js', res, "empty");
});
app.get('/rest/echo/:value', function handleTab(req, res) {
  console.log(req.baseUrl);
  const value = req.params.value;
  serverapp.send_value(res, value);
});
app.get('/rest/value', function handleTab(req, res) {
  console.log(req.baseUrl);
  const value = moment().format('MMMM Do YYYY, h:mm:ss a'); 
  serverapp.send_value(res, value);
});

const port = 9080;
app.listen(port, function startServer() {
  console.log('listening on '+port);
});
function send_clientjs(filepath, res, val) {
  fs.readFile(filepath, "utf8", function recvFile(err, data) {
    if (err) {
      res.send(err);
    } else {
      const defs = "const val='"+val+"';\n";
      const client = defs + data;
      res.send(client);
    }
  });
}
