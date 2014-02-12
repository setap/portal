exports.get = function (req, res) {
  require('treeDevices')();
  res.render('index', {device: treeDevices, incidends: incidents});
}