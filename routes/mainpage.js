//require('treeDevices')();
var templates = {
  tempSnmpBandwidth: require('fs').readFileSync('./views/clientside/_tempSnmpBandwidth.ejs', 'utf-8'),
  tempNodeMap: require('fs').readFileSync('./views/clientside/_tempNodeMap.ejs', 'utf-8'),
  tempRegionMap: require('fs').readFileSync('./views/clientside/_tempRegionMap.ejs', 'utf-8'),
  tempNetcoolAlert: require('fs').readFileSync('./views/clientside/_tempNetcoolAlert.ejs', 'utf-8'),
  tempUnavailableNode: require('fs').readFileSync('./views/clientside/_tempUnavailableNode.ejs', 'utf-8'),
  tempUnavailableNodeDetail: require('fs').readFileSync('./views/clientside/_tempUnavailableNodeDetail.ejs', 'utf-8'),
  tempWislaChanel: require('fs').readFileSync('./views/clientside/_tempWislaChanel.ejs', 'utf-8'),
  tempWislaChanelDetail: require('fs').readFileSync('./views/clientside/_tempWislaChanelDetail.ejs', 'utf-8')

};


exports.get = function (req, res) {
  res.render('index', {
    device: global.treeDevices,
    incidents: global.incidents,
    templates: templates,
    netcool: netcoolAlert,
    wisla: dataFromWisla});
}