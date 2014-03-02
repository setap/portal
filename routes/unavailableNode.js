//require('treeDevices')()
exports.get = function (req, res) {
  //console.log(global.netcoolAlert);
  for (var i = 0; i < global.netcoolAlert.rowset.rows.length; i++) {
    if (global.netcoolAlert.rowset.rows[i].Node == req.query.data) {
      var data = global.netcoolAlert.rowset.rows[i];
    }
  }
  res.send(data);
}