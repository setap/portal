//require('treeDevices')()
exports.get = function (req, res) {
  console.log(req.query.data);
  for (var i = 0; i < global.dataFromWisla.serviceBaseDtos.length; i++) {
    if (global.dataFromWisla.serviceBaseDtos[i].name == req.query.data) {
      var data = global.dataFromWisla.serviceBaseDtos[i];
      console.log(data);
    }
  }
  res.send(data);
}