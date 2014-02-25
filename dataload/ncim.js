var oracle = require('oracle');
var connectData = require('../lib/oracle').connectData;
var log = require('lib/log')(module);
var config = require('config');
var translite = require('lib/translite');
var formatDate = require('lib/formatDate');


exports.getNCIMData = function (io) {
  oracle.connect(connectData, function (err, connection) {
    if (err) {
      log.error("Error connecting to db: " + err);
    }
    log.debug('Start load NCIM data');
    connection.execute(config.get("nameOfQuery:ping_time"), [], function (err, results) {
      if (err) {
        log.debug("Error executing query:" + err);
      }
      log.debug('Load NCIM data......');
      ncim_metrics = results;
      log.info('NCIM data loaded from Oracle');
      io.sockets.emit('ncim');
      connection.close();
      log.debug('Finished load NCIM data');
    })
  });
};

exports.getNCIMDataStart = function () {
  oracle.connect(connectData, function (err, connection) {
    if (err) {
      console.log("Error connecting to db:", err);
    }

    connection.execute(config.get("nameOfQuery:ping_time"), [], function (err, results) {
      if (err) {
        console.log("Error executing query:", err);
      }

      ncim_metrics = results;
      log.info('NCIM data loaded from Oracle');


      connection.close();

    })
  });
}