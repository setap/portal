var log = require('lib/log')(module);
var config = require('config');
var http = require('http');

exports.getNetcoolData = function (io) {

  var output = '';

  http.get(require('lib/netcool').netcoolOptions,function (res) {

    log.debug('Start netcool data loaded');
    res.on('data', function (chunk) {
      output += chunk;
    });
    res.on('end', function (res) {
      log.debug('Start netcool data loaded end');
      var result = JSON.parse(output);
      netcoolAlert = result;

      io.sockets.emit('netcool', JSON.stringify(netcoolAlert));

      log.info('Netcool data loaded');
    });

  }).on('error', function (e) {
      console.log("Got error: " + e.message);
    });

};

exports.getNetcoolDataStart = function () {

  var output = '';

  http.get(require('lib/netcool').netcoolOptions,function (res) {
    res.on('data', function (chunk) {
      output += chunk;
    });
    res.on('end', function (res) {
      var result = JSON.parse(output);
      netcoolAlert = result;
      log.info('Netcool data loaded');
    })

  }).on('error', function (e) {
      console.log("Got error: " + e.message);
    });


}