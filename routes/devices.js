//require('treeDevices')()
exports.get = function (req, res) {
  res.json(global.treeDevices);
}