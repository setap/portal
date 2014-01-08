

var mongoose = require('lib/mongoose');
var async = require('async');


async.series([
    open,
    dropDb,
    requierModels,
    createUser
],
    function(err, results){
        console.log(arguments);
        mongoose.disconnect();
        process.exit(err ? 255 : 0);
    }
)

function open(callback){
    mongoose.connection.on("open", callback);
};

function dropDb(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
};

function requierModels(callback){
    require('models/user');
    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);

}


function createUser(callback){

    var users = [
        {username: "Vasya", password: "123"},
        {username: "Petya", password: "1234"},
        {username: "admin", password: "1235"}
    ];

    async.each(users, function(userData, callback){
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback)

};

function disconnect(callback){
    mongoose.disconnect(callback);
};
