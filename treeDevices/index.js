var oracle = require('oracle');
global.treeDevices = null;

module.exports = function () {

    var YFO = 'ЮФО';
    var SFO = 'СФО';
    var UFO = 'УФО';
    var PFO = 'ПФО';
    var SKFO = 'СКФО';
    var CFO = 'ЦФО';
    var SZFO = 'СЗФО';
    var DFO = 'ДФО';

    var connectData = require('lib/oracle').connectData;

    oracle.connect(connectData, function (err, connection) {

        if (err) {
            log.error("Error connecting to db:", err);
        }


        connection.execute("call json2(:1,:2)",
            [YFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
            function (err, results) {

                setJSON(results.returnParam);
                connection.close();

            });
    });

    oracle.connect(connectData, function (err, connection) {

        if (err) {
            log.error("Error connecting to db:", err);
        }


        connection.execute("call json2(:1,:2)",
            [SFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
            function (err, results) {

                setJSON(results.returnParam);
                connection.close();

            });
    });

    oracle.connect(connectData, function (err, connection) {

        if (err) {
            log.error("Error connecting to db:", err);
        }


        connection.execute("call json2(:1,:2)",
            [UFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
            function (err, results) {

                setJSON(results.returnParam);
                connection.close();

            });
    });

    oracle.connect(connectData, function (err, connection) {

        if (err) {
            log.error("Error connecting to db:", err);
        }


        connection.execute("call json2(:1,:2)",
            [PFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
            function (err, results) {

                setJSON(results.returnParam);
                connection.close();

            });
    });

    oracle.connect(connectData, function (err, connection) {

        if (err) {
            log.error("Error connecting to db:", err);
        }


        connection.execute("call json2(:1,:2)",
            [SKFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
            function (err, results) {

                setJSON(results.returnParam);
                connection.close();

            });
    });

    oracle.connect(connectData, function (err, connection) {

        if (err) {
            log.error("Error connecting to db:", err);
        }


        connection.execute("call json2(:1,:2)",
            [CFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
            function (err, results) {

                setJSON(results.returnParam);
                connection.close();

            });
    });

    oracle.connect(connectData, function (err, connection) {

        if (err) {
            log.error("Error connecting to db:", err);
        }


        connection.execute("call json2(:1,:2)",
            [SZFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
            function (err, results) {

                setJSON(results.returnParam);
                connection.close();

            });
    });

    oracle.connect(connectData, function (err, connection) {

        if (err) {
            log.error("Error connecting to db:", err);
        }


        connection.execute("call json2(:1,:2)",
            [DFO, new oracle.OutParam(oracle.OCCISTRING, {size: 4000})],
            function (err, results) {

                setJSON(results.returnParam);
                connection.close();

            });
    });

    var i = 0;

    function setJSON(results) {
        if (i == 0) {
            treeDevices = '{ "device" : ['
        }

        if (i < 7) {
            treeDevices += '[';
            treeDevices += results;
            treeDevices += '],'
        }

        if (i == 7) {
            treeDevices += '[';
            treeDevices += results;
            treeDevices += ']]}';
            treeDevices = JSON.parse(treeDevices);
        }

        i++;
    }

}