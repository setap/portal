var log = require('lib/log')(module);
var config = require('config');
var http = require('http');

exports.getWislaData = function (io) {


  var dataFromWislaTemp = '';
  var req = http.get(require('lib/wisla').wislaOptions, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      dataFromWislaTemp += chunk;
    });
    res.on('end', function (data) {
      dataFromWisla = JSON.parse(dataFromWislaTemp);
      for (var i in dataFromWisla.serviceBaseDtos) {
        //console.log(i + ' ' + dataFromWisla.serviceBaseDtos[i].name);
      }
      io.sockets.emit('wisla', dataFromWisla);
    })
  });
};

exports.getWislaDataStart = function () {
  var dataFromWislaTemp = '';
  var req = http.get(require('lib/wisla').wislaOptions, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      dataFromWislaTemp += chunk;
    });
    res.on('end', function (data) {
      dataFromWisla = JSON.parse(dataFromWislaTemp);
      for (var i in dataFromWisla.serviceBaseDtos) {
        //console.log(i + ' ' + dataFromWisla.serviceBaseDtos[i].name);
      }
      log.info('Wisla data loaded');
    })
  });

}