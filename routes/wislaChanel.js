exports.get = function (req, res) {

  var wislaServiceList = {};
  wislaServiceList.chanels = [];

  for (var i in dataFromWisla.serviceBaseDtos) {
    var chanel = {};
    chanel.id = dataFromWisla.serviceBaseDtos[i].id;
    chanel.name = dataFromWisla.serviceBaseDtos[i].name;
    chanel.profile = dataFromWisla.serviceBaseDtos[i].serviceStatuses[0].profile;
    wislaServiceList.chanels[i] = chanel;
  }

  res.json(wislaServiceList);

}