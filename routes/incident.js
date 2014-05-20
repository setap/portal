exports.post = function (req, res, next) {
  console.dir("ticketid " + req.body.ticketid);
  console.dir("ticketid " + req.body.owner);
  console.dir("ticketid " + req.body.desc);
  console.dir("ticketid " + req.body.priority);

  res.send("ok");
}