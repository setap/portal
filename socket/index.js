var oracle = require('oracle');
var connectData = require('../lib/oracle').connectData;
var log = require('lib/log')(module);
var fs = require('fs');
var config = require('config');

function translite(str) {
  var translatedString = '';
  for (var i = 0; i < str.length; i++) {
    translatedString += alph[str[i]];
  }
  return translatedString;
}
//),'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЭЫЬЮЯ','ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567'
var alph = {
  A: "А",
  B: "Б",
  C: "В",
  D: "Г",
  E: "Д",
  F: "Е",
  G: "Ё",
  H: "Ж",
  I: "З",
  J: "И",
  K: "Й",
  L: "К",
  M: "Л",
  N: "М",
  O: "Н",
  P: "О",
  Q: "П",
  R: "Р",
  S: "С",
  T: "Т",
  U: "У",
  V: "Ф",
  W: "Х",
  X: "Ц",
  Y: "Ч",
  Z: "Ш",
  1: "Щ",
  2: "Ъ",
  3: "Э",
  4: "Ы",
  5: "Ь",
  6: "Ю",
  7: "Я",
  ' ': " ",
  '.': ".",
  '-': "-"
}

module.exports = function (server) {
  var io = require('socket.io').listen(server);
  io.set('log level', 0);
  io.set('origins', '*:*')

  var clientSocket = [];

  io.sockets.on('connection', function (socket) {
    clientSocket.push(socket);
    socket.on('getDevicesInfo', function (data) {
      console.log('getDevicesInfo');
    });
  });

  setInterval(function () {
    oracle.connect(connectData, function (err, connection) {

      if (err) {
        log.error("Error connecting to db:", err);
      }

      connection.execute("call " + config.get('nameOfQuery:json_devices') + "(:1)",
        [new oracle.OutParam(oracle.OCCICLOB)],
        function (err, results) {

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

          for (var i = 0; i < clientSocket.length; i++) {
            clientSocket[i].emit('devices', results);
          }

          connection.close();

        });
    });

    oracle.connect(connectData, function (err, connection) {
      if (err) {
        console.log("Error connecting to db:", err);
        return;
      }

      connection.execute(config.get("nameOfQuery:incidents"), [], function (err, results) {
        if (err) {
          console.log("Error executing query:", err)
        }

        incidents = results;
        for (var i = 0; i < incidents.length; i++) {
          incidents[i].CREATIONDATE = formatDate(incidents[i].CREATIONDATE);
        }
        log.info('Incidents data loaded from Oracle');
        connection.close();

      })
    });

    oracle.connect(connectData, function (err, connection) {
      if (err) {
        console.log("Error connecting to db:", err);
        return;
      }

      connection.execute(config.get("nameOfQuery:ping_time"), [], function (err, results) {
        if (err) {
          console.log("Error executing query:", err)
        }

        ncim_metrics = results;
        log.info('NCIM data loaded from Oracle');


        connection.close();

      })
    });

  }, config.get('refreshInterval') * 1000);

  function formatDate(date) {
    02

    03
    var dd = date.getDate()
    04
    if (dd < 10) dd = '0' + dd;
    05

    06
    var mm = date.getMonth() + 1
    07
    if (mm < 10) mm = '0' + mm;
    08

    09
    var yy = date.getFullYear() % 100;
    10
    if (yy < 10) yy = '0' + yy;
    11

    12
    return dd + '.' + mm + '.' + yy;
    13
  }

}
