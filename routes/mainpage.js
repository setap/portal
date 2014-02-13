//require('treeDevices')();
exports.get = function (req, res) {
  res.render('index', {device: global.treeDevices, incidends: global.incidents});
}