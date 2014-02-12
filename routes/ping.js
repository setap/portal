require('treeDevices')()
exports.get = function (req, res) {
  for (var i = 0; i < ping_time.length; i++) {
    if (ping_time[i].HOSTNAME == req.query.device) {
      var data = [ping_time[i].VALUE];
    }
  }
  res.send(data);
}