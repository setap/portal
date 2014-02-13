//require('treeDevices')()
exports.get = function (req, res) {
  for (var i = 0; i < global.ncim_metrics.length; i++) {
    if (global.ncim_metrics[i].HOSTNAME == req.query.device) {
      var data = global.ncim_metrics[i];
    }
  }
  res.send(data);
}