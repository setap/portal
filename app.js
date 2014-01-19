var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('lib/log')(module);
var app = express();
var HttpError = require('error').HttpError;
var async = require('async');

app.set('port',config.get("port"));

var server = http.createServer(app);

server.listen(app.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});

require('./socket')(server);

app.engine('ejs',require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(require('middleware/sendHttpError'));

app.use(express.cookieParser('your secret here'));
//app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



require('routes')(app);

app.use(function(req, res, next){
   if (req.url == '/error'){
       next(new Error("Will be careful....."));
   } else{
       next();
   }
});

app.use(function(req, res, next) {
    if (req.url == '/'){
//        res.end("Hello");
        res.render('index',{device:device})
    }else{
        next();
    }
});

app.use(function(req, res, next) {
    if (req.url == '/test'){
        res.end(req.user);
    }else{
        next()
    };
});

app.use(function(req, res){
    res.send(404, 'Page not found');
});

app.use(function(err, req, res, next){
    console.log('error code ' + err);

   if (typeof err == 'number'){
       err = new HttpError(err);
   }

   if (err instanceof  HttpError) {
       res.sendHttpError(err);
   } else {

       if(app.get('env') == 'development'){
           var errorHandler = express.errorHandler();
           errorHandler(err, req, res, next);
       } else {
           log.error(err);
           err = new HttpError(500);
           res.sendHttpError(err);
       }
   }
});

var oracle = require('oracle');

var device = null;

var YFO = 'ЮФО';
var SFO = 'СФО';
var UFO = 'УФО';
var PFO = 'ПФО';
var SKFO = 'СКФО';
var CFO = 'ЦФО';
var SZFO = 'СЗФО';
var DFO = 'ДФО';

var connectData = require('lib/oracle').connectData;

oracle.connect(connectData, function(err, connection) {

    if (err) {
        log.error("Error connecting to db:", err);
    }



    connection.execute("call json2(:1,:2)",
        [YFO, new oracle.OutParam(oracle.OCCISTRING, {size:4000})],
        function(err, results){

            setJSON(results.returnParam);
            connection.close();

        });
});

oracle.connect(connectData, function(err, connection) {

    if (err) {
        log.error("Error connecting to db:", err);
    }



    connection.execute("call json2(:1,:2)",
        [SFO, new oracle.OutParam(oracle.OCCISTRING, {size:4000})],
        function(err, results){

            setJSON(results.returnParam);
            connection.close();

        });
});

oracle.connect(connectData, function(err, connection) {

    if (err) {
        log.error("Error connecting to db:", err);
    }



    connection.execute("call json2(:1,:2)",
        [UFO, new oracle.OutParam(oracle.OCCISTRING, {size:4000})],
        function(err, results){

            setJSON(results.returnParam);
            connection.close();

        });
});

oracle.connect(connectData, function(err, connection) {

    if (err) {
        log.error("Error connecting to db:", err);
    }



    connection.execute("call json2(:1,:2)",
        [PFO, new oracle.OutParam(oracle.OCCISTRING, {size:4000})],
        function(err, results){

            setJSON(results.returnParam);
            connection.close();

        });
});

oracle.connect(connectData, function(err, connection) {

    if (err) {
        log.error("Error connecting to db:", err);
    }



    connection.execute("call json2(:1,:2)",
        [SKFO, new oracle.OutParam(oracle.OCCISTRING, {size:4000})],
        function(err, results){

            setJSON(results.returnParam);
            connection.close();

        });
});

oracle.connect(connectData, function(err, connection) {

    if (err) {
        log.error("Error connecting to db:", err);
    }



    connection.execute("call json2(:1,:2)",
        [CFO, new oracle.OutParam(oracle.OCCISTRING, {size:4000})],
        function(err, results){

            setJSON(results.returnParam);
            connection.close();

        });
});

oracle.connect(connectData, function(err, connection) {

    if (err) {
        log.error("Error connecting to db:", err);
    }



    connection.execute("call json2(:1,:2)",
        [SZFO, new oracle.OutParam(oracle.OCCISTRING, {size:4000})],
        function(err, results){

            setJSON(results.returnParam);
            connection.close();

        });
});

oracle.connect(connectData, function(err, connection) {

    if (err) {
        log.error("Error connecting to db:", err);
    }



    connection.execute("call json2(:1,:2)",
        [DFO, new oracle.OutParam(oracle.OCCISTRING, {size:4000})],
        function(err, results){

            setJSON(results.returnParam);
            connection.close();

        });
});

var i = 0;

function setJSON(results){

    if (i == 0){
        device = '{ "device" : ['
    }

    if(i < 7){
        device += '[';
        device += results;
        device += '],'
    }

    if (i == 7){
        device += '[';
        device += results;
        device += ']]}';

        device = JSON.parse(device);

        exports.device = device;
    }

    i++;
}


