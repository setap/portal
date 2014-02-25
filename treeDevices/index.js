var oracle = require('oracle');
var config = require('config');
var log = require('lib/log')(module);
var http = require('http');
var translite = require('lib/translite');
var formatDate = require('lib/formatDate');


global.treeDevices = null;
global.incidents = null;
global.ncim_metrics = null;
global.netcoolAlert = null;
global.dataFromWisla = null;

module.exports = function () {

  require('dataload/devices').getDevicesStart();

  require('dataload/incidents').getIncidentsStart();

  require('dataload/ncim').getNCIMDataStart();

  require('dataload/netcool').getNetcoolDataStart();

  require('dataload/wisla').getWislaDataStart();

};