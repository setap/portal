var oracle = require('oracle');
var connectData = require('../lib/oracle').connectData;
require('treeDevices');

var YFO = 'ЮФО';
var SFO = 'СФО';
var UFO = 'УФО';
var PFO = 'ПФО';
var SKFO = 'СКФО';
var CFO = 'ЦФО';
var SZFO = 'СЗФО';
var DFO = 'ДФО';

module.exports = function (server) {
    var io = require('socket.io').listen(server);

    io.set('log level', 0);

    io.sockets.on('connection', function (socket) {

        socket.on('YFO', function (data) {

            oracle.connect(connectData, function (err, connection) {

                if (err) {
                    log.error("Error connecting to db:", err);
                }
                i = 0;
                connection.execute("call json2(:1,:2)",
                    [YFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
                    function (err, results) {
                        setJSON(results.returnParam);
                        socket.emit('YFO', results.returnParam);
                        results = JSON.parse(results.returnParam);

                        connection.close();

                    });
            });
        });
        socket.on('SFO', function (data) {

            oracle.connect(connectData, function (err, connection) {

                if (err) {
                    log.error("Error connecting to db:", err);
                }

                connection.execute("call json2(:1,:2)",
                    [SFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
                    function (err, results) {
                        setJSON(results.returnParam);
                        socket.emit('SFO', results.returnParam);
                        results = JSON.parse(results.returnParam);

                        connection.close();

                    });
            });
        });
        socket.on('UFO', function (data) {

            oracle.connect(connectData, function (err, connection) {

                if (err) {
                    log.error("Error connecting to db:", err);
                }

                connection.execute("call json2(:1,:2)",
                    [UFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
                    function (err, results) {
                        setJSON(results.returnParam);
                        socket.emit('UFO', results.returnParam);
                        results = JSON.parse(results.returnParam);

                        connection.close();

                    });
            });
        });
        socket.on('PFO', function (data) {

            oracle.connect(connectData, function (err, connection) {

                if (err) {
                    log.error("Error connecting to db:", err);
                }

                connection.execute("call json2(:1,:2)",
                    [PFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
                    function (err, results) {
                        setJSON(results.returnParam);
                        socket.emit('PFO', results.returnParam);
                        results = JSON.parse(results.returnParam);

                        connection.close();

                    });
            });
        });
        socket.on('SKFO', function (data) {

            oracle.connect(connectData, function (err, connection) {

                if (err) {
                    log.error("Error connecting to db:", err);
                }

                connection.execute("call json2(:1,:2)",
                    [SKFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
                    function (err, results) {
                        setJSON(results.returnParam);
                        socket.emit('SKFO', results.returnParam);
                        results = JSON.parse(results.returnParam);

                        connection.close();

                    });
            });
        });
        socket.on('CFO', function (data) {

            oracle.connect(connectData, function (err, connection) {

                if (err) {
                    log.error("Error connecting to db:", err);
                }

                connection.execute("call json2(:1,:2)",
                    [CFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
                    function (err, results) {
                        setJSON(results.returnParam);
                        socket.emit('CFO', results.returnParam);
                        results = JSON.parse(results.returnParam);

                        connection.close();

                    });
            });
        });
        socket.on('SZFO', function (data) {

            oracle.connect(connectData, function (err, connection) {

                if (err) {
                    log.error("Error connecting to db:", err);
                }

                connection.execute("call json2(:1,:2)",
                    [SZFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
                    function (err, results) {
                        setJSON(results.returnParam);
                        socket.emit('SZFO', results.returnParam);
                        results = JSON.parse(results.returnParam);

                        connection.close();

                    });
            });
        });
        socket.on('DFO', function (data) {

            oracle.connect(connectData, function (err, connection) {

                if (err) {
                    log.error("Error connecting to db:", err);
                }

                connection.execute("call json2(:1,:2)",
                    [DFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
                    function (err, results) {
                        setJSON(results.returnParam);
                        socket.emit('DFO', results.returnParam);
                        results = JSON.parse(results.returnParam);

                        connection.close();

                    });
            });
        });

    });

    var i = 0;

    function setJSON(results) {

        if (i == 0) {
            d = '{ "device" : ['
        }

        if (i < 7) {
            d += '[';
            d += results;
            d += '],'
        }

        if (i == 7) {
            d += '[';
            d += results;
            d += ']]}';

            d = JSON.parse(d);

            treeDevices = d;
        }

        i++;
    }
}

