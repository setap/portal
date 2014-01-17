var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('lib/log')(module);
var app = express();
var HttpError = require('error').HttpError;
var async = require('async');
require('device')();

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





