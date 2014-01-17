exports.get = function (req, res) {
    require('treeDevices')()
    res.json(treeDevices);
}