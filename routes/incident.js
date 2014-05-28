var incidets = require('../dataload/tickets.js').tickets;

exports.post = function (req, res, next) {
  var event = {"ticketid": req.body.ticketid,
    "owner": req.body.owner,
    "priority": req.body.priority,
    "desc": req.body.desc,
    "event": req.body.event}

  incidets.push(event);

  global.io.sockets.emit('newticket', incidets);

  console.dir("ticketid " + req.body.ticketid);
  console.dir("ticketid " + req.body.owner);
  console.dir("ticketid " + req.body.desc);
  console.dir("ticketid " + req.body.priority);

  require('../dataload/tickets.js').tickets = incidets;

  res.send("ok");
}