exports.get = function (req, res) {
    req.session.numOfSession = req.session.numOfSession + 1 || 1;
    res.send('Count ' + req.session.numOfSession);
}