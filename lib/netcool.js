var config = require('config');

var options = {
  host: config.get('netcool:host'),
  port: config.get('netcool:port'),
  path: config.get('netcool:path'),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
    'Authorization': 'Basic ' + new Buffer(config.get('netcool:login') + ':' + config.get('netcool:password')).toString('base64')
  }
};

exports.netcoolOptions = options;