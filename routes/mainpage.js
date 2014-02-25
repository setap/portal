//require('treeDevices')();
var templates = {
  tempSnmpBandwidth: require('fs').readFileSync('./views/clientside/_tempSnmpBandwidth.ejs', 'utf-8'),
  tempNodeMap: require('fs').readFileSync('./views/clientside/_tempNodeMap.ejs', 'utf-8'),
  tempRegionMap: require('fs').readFileSync('./views/clientside/_tempRegionMap.ejs', 'utf-8'),
  tempNetcoolAlert: require('fs').readFileSync('./views/clientside/_tempNetcoolAlert.ejs', 'utf-8')

};

exports.get = function (req, res) {
  res.render('index', {
    device: global.treeDevices,
    incidents: global.incidents,
    templates: templates,
    netcool: netcoolAlert,
    wisla: dataFromWisla});
}