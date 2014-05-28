global.treeDevices = null;
global.incidents = null;
global.ncim_metrics = null;
global.netcoolAlert = null;
global.dataFromWisla = null;
global.tickets = null;

module.exports = function () {

  require('dataload/devices').getDevicesStart();

  require('dataload/incidents').getIncidents();

  require('dataload/ncim').getNCIMDataStart();

  require('dataload/netcool').getNetcoolDataStart();

  require('dataload/wisla').getWislaDataStart();

};