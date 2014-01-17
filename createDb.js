var User = require('models/user').User;

var user = new User({
    username: "stp",
    password: "123"
});


user.save(function (err, user, affected) {

})

User.findOne({username: "stp"}, function (err, result) {
    console.log(result);
})
