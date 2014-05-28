var log = require('lib/log')(module);
var fs = require('fs');
var config = require('config');

module.exports = function (server) {

  global.io = require('socket.io').listen(server);
  global.io.set('log level', 0);
  global.io.set('origins', '*:*')

  io.sockets.on('connection', function (socket) {
  });

  setInterval(function () {

    //require('dataload/devices').getDevices(io);
    require('dataload/incidents').getIncidents(global.io);
    require('dataload/ncim').getNCIMData(global.io);
    require('dataload/netcool').getNetcoolData(global.io);
    require('dataload/wisla').getWislaData(global.io);
    console.log(require('../dataload/tickets.js').tickets);

  }, config.get('refreshInterval') * 1000);

}
