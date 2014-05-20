exports.post = function (req, res, next) {
  console.log("incident request " + req);

  res.send("iii");
}