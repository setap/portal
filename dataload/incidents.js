var oracle = require('oracle');
var connectData = require('../lib/oracle').connectData;
var log = require('lib/log')(module);
var config = require('config');
var translite = require('lib/translite');
var formatDate = require('lib/formatDate');
var genericPool = require('generic-pool');

var pool = genericPool.Pool({
  name: 'testpool',
  log: false,
  max: 20,
  create: function (callback) {
    var settings = {
      hostname: config.get("oracle:hostname"),
      port: config.get("oracle:port"),
      database: config.get("oracle:database"),
      user: config.get("oracle:user"),
      password: config.get("oracle:password")
    };
    new oracle.connect(settings, function (err, connection) {
      callback(err, connection);
    });
  },
  destroy: function (connection) {
    connection.close();
  }
});

var acquireAndQuery = function () {
  pool.acquire(function (err, connection) {
    if (err) {
      console.log(err, "Error acquiring from pool.");
      return;
    }
    connection.execute(config.get("nameOfQuery:incidents"), [], function (err, results) {
      if (err) {
        console.log(err, "Error executing query.");

        // Simply releasing this connection back to the pool means a potentially
        // corrupt connection may get reused.
        pool.release(connection)

        // This solves the issue
        // pool.destroy(connection);

        return;
      }
      incidents = results;

      for (var i = 0; i < incidents.length; i++) {
        incidents[i].CREATIONDATE = formatDate(incidents[i].CREATIONDATE);
      }


      log.info('Incidents data loaded from Oracle');

      pool.release(connection);
    });
  });
};

exports.getIncidents = function () {
  acquireAndQuery();
};