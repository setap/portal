function Tickets() {
  this.stack = [];

  this.push = function (item) {
    if (this.stack.length == 50) {
      this.stack.pop();
    }
    this.stack.unshift(item);
  }
}

var tickets = new Tickets();

exports.tickets = tickets;