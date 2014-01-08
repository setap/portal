var oracle = require('oracle');
var config = require('config');

var connectData = {
    hostname: config.get("oracle:hostname"),
    port: config.get("oracle:port"),
    database: config.get("oracle:database"), // System ID (SID)
    user: config.get("oracle:user"),
    password: config.get("oracle:password")
}

exports.connectData = connectData;