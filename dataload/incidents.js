var oracle = require('oracle');
var connectData = require('../lib/oracle').connectData;
var log = require('lib/log')(module);
var config = require('config');
var translite = require('lib/translite');
var formatDate = require('lib/formatDate');


exports.getIncidents = function (io) {
  oracle.connect(connectData, function (err, connection) {

    if (err) {
      log.error("Error connecting to db:" + err);
      return;
    }

    log.debug('Start load incidents');

    connection.execute(config.get("nameOfQuery:incidents"), [], function (err, results) {

      if (err) {
        log.error("Error executing query:" + err);
      }

      incidents = results;

      for (var i = 0; i < incidents.length; i++) {
        incidents[i].CREATIONDATE = formatDate(incidents[i].CREATIONDATE);
      }

      log.info('Incidents data loaded from Oracle');

      connection.close();

      log.debug('Finished load incidents');

    });
  });
};

exports.getIncidentsStart = function () {
  oracle.connect(connectData, function (err, connection) {
    if (err) {
      console.log("Error connecting to db:", err);
    }

    connection.execute(config.get("nameOfQuery:incidents"), [], function (err, results) {
      if (err) {
        console.log("Error executing query:", err);
      }

      incidents = results;
//      console.log(incidents);
      for (var i = 0; i < incidents.length; i++) {
        incidents[i].CREATIONDATE = formatDate(incidents[i].CREATIONDATE);
      }
      log.info('Incidents data loaded from Oracle');
      connection.close();

    })
  });
};