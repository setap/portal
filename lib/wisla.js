var config = require('config');

var options = {
  host: config.get('wisla:host'),
  port: config.get('wisla:port'),
  path: config.get('wisla:path'),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
    'Authorization': 'Basic ' + new Buffer(config.get('wisla:login') + ':' + config.get('wisla:password')).toString('base64')
  }
};

exports.wislaOptions = options;