var oracle = require('oracle');
var connectData = require('../lib/oracle').connectData;
var log = require('lib/log')(module);
var config = require('config');
var translite = require('lib/translite');
var formatDate = require('lib/formatDate');


exports.getDevices = function (io) {

  oracle.connect(connectData, function (err, connection) {
    log.debug('Start load tree devices');
    if (err) {
      log.error("Error connecting to db:", err);
      return;
    }

    connection.execute("call " + config.get('nameOfQuery:json_devices') + "(:1)",
      [new oracle.OutParam(oracle.OCCICLOB)],
      function (err, results) {
        if (err) {
          log.error("Error execute to db:", err);

        }
        results = JSON.parse(results.returnParam);

        for (var i = 0; i < results.device.length; i++) {
          results.device[i].name = translite(results.device[i].name)

          for (var j = 0; j < results.device[i].area.length; j++) {

            if (results.device[i].area[j] !== undefined) {
              results.device[i].area[j].n = translite(results.device[i].area[j].n);

              for (var k = 0; k < results.device[i].area[j].l.length; k++) {
                results.device[i].area[j].l[k].n = translite(results.device[i].area[j].l[k].n)
//                console.log(results.device[i].area[j].l[k].n);
              }
            }
          }
        }

        global.treeDevices = results;

        io.sockets.emit('devices', results);
        log.debug('Finished load tree devices');
        connection.close();

      });
  });

};

exports.getDevicesStart = function () {

  oracle.connect(connectData, function (err, connection) {
    if (err) {
      console.log("Error connecting to SCCD:", err);
    }

    connection.execute("call json_devices_v2(:1)",
      [new oracle.OutParam(oracle.OCCICLOB)], function (err, results) {
        if (err) {
          console.log("Error executing query:", err);
        }

        results = JSON.parse(results.returnParam);

        for (var i = 0; i < results.device.length; i++) {
          results.device[i].name = translite(results.device[i].name)

          for (var j = 0; j < results.device[i].area.length; j++) {

            if (results.device[i].area[j] !== undefined) {
              results.device[i].area[j].n = translite(results.device[i].area[j].n);

              for (var k = 0; k < results.device[i].area[j].l.length; k++) {
                results.device[i].area[j].l[k].n = translite(results.device[i].area[j].l[k].n)
//                console.log(results.device[i].area[j].l[k].n);
              }
            }
          }
        }
        treeDevices = results;
        log.info('Tree devices data loaded from Oracle');
        connection.close();
      });
  });

}