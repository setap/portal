
var HttpError = require('error').HttpError;
//var User = require('models/user').User;

module.exports = function(app){

    app.get('/device', function(req, res, next) {
        var device = require('../app.js').device;
        console.log(device);
        res.json(device);
    });
/*
    app.get('/user/:id', function(req, res, next){
        User.findById(req.params.id, function(err, results){
            if(err) {
                console.log("error " + err);
                next(err);
            }
            if(!results) next(new HttpError(404, "User not found"));
            res.json(results);
        });
    });*/
}
