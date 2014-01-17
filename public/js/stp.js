
$(document).ready(function() {
  var collapseNode = [];

  $('.tree-toggle').click(function() {
    collapseNode.push();
    $(this).parent().children('ul.tree').toggle(200);
  });
});

$('.device').popover(
  { trigger:'hover',
    placement:'right',
    html:true,

    content: function() {
      var d = $('div.info', $(this).parent()).html();
      return d;
    }
  }
);

var socket = io.connect();

var t = 0;

setInterval(function() {
  t += 5;
  $('div.bar').css('width', t + "px");
}, 500);

setInterval(function() {
  socket.emit('YFO');
  socket.emit('SFO');
  socket.emit('UFO');
  socket.emit('PFO');
  socket.emit('SKFO');
  socket.emit('CFO');
  socket.emit('SZFO');
  socket.emit('DFO');
}, 10 * 1000);

socket.on('YFO', function(data) {
  var data = jQuery.parseJSON(data);

  $('li#' + data.name + ' label.area').each(function() {
    var countFromDb = findArea(data, $(this).text());
    $(this).next().text(countFromDb);
  });

  $('li#' + data.name + ' label.location').each(function() {
    var countFromDb = findLocation(data, $(this).text());
    $(this).next().text(countFromDb);
  });

  $('li#' + data.name + ' a.device').each(function() {
    var countFromDb = findDevice(data, $(this).text());
    var countFromPage = $('span', $(this).parent()).text();

    if(countFromDb != countFromPage) {
      var message = '<div class="alert fade in"><button class="close"' +
                    'type="button" data-dismiss="alert">x</button><br>' +
                    '<strong>Новое событие на узле : </strong>' + $(this).text() +
                    '<p class="infodevice"></p></div>';

      $('div.span7').prepend(message);
    }
      $('span', $(this).parent()).text(countFromDb);
  });
    
  $('div.bar').css('width', "0px");
  t = 0;
});
socket.on('SFO', function(data) {
    var data = jQuery.parseJSON(data);

    $('li#' + data.name + ' label.area').each(function() {
        var countFromDb = findArea(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' label.location').each(function() {
        var countFromDb = findLocation(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' a.device').each(function() {
        var countFromDb = findDevice(data, $(this).text());
        var countFromPage = $('span', $(this).parent()).text();

        if(countFromDb != countFromPage) {
            var message = '<div class="alert fade in"><button class="close"' +
                'type="button" data-dismiss="alert">x</button><br>' +
                '<strong>Новое событие на узле : </strong>' + $(this).text() +
                '<p class="infodevice"></p></div>';

            $('div.span7').prepend(message);
        }
        $('span', $(this).parent()).text(countFromDb);
    });

    $('div.bar').css('width', "0px");
    t = 0;
});
socket.on('UFO', function(data) {
    var data = jQuery.parseJSON(data);

    $('li#' + data.name + ' label.area').each(function() {
        var countFromDb = findArea(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' label.location').each(function() {
        var countFromDb = findLocation(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' a.device').each(function() {
        var countFromDb = findDevice(data, $(this).text());
        var countFromPage = $('span', $(this).parent()).text();

        if(countFromDb != countFromPage) {
            var message = '<div class="alert fade in"><button class="close"' +
                'type="button" data-dismiss="alert">x</button><br>' +
                '<strong>Новое событие на узле : </strong>' + $(this).text() +
                '<p class="infodevice"></p></div>';

            $('div.span7').prepend(message);
        }
        $('span', $(this).parent()).text(countFromDb);
    });

    $('div.bar').css('width', "0px");
    t = 0;
});
socket.on('PFO', function(data) {
    var data = jQuery.parseJSON(data);

    $('li#' + data.name + ' label.area').each(function() {
        var countFromDb = findArea(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' label.location').each(function() {
        var countFromDb = findLocation(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' a.device').each(function() {
        var countFromDb = findDevice(data, $(this).text());
        var countFromPage = $('span', $(this).parent()).text();

        if(countFromDb != countFromPage) {
            var message = '<div class="alert fade in"><button class="close"' +
                'type="button" data-dismiss="alert">x</button><br>' +
                '<strong>Новое событие на узле : </strong>' + $(this).text() +
                '<p class="infodevice"></p></div>';

            $('div.span7').prepend(message);
        }
        $('span', $(this).parent()).text(countFromDb);
    });

    $('div.bar').css('width', "0px");
    t = 0;
});
socket.on('SKFO', function(data) {
    var data = jQuery.parseJSON(data);

    $('li#' + data.name + ' label.area').each(function() {
        var countFromDb = findArea(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' label.location').each(function() {
        var countFromDb = findLocation(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' a.device').each(function() {
        var countFromDb = findDevice(data, $(this).text());
        var countFromPage = $('span', $(this).parent()).text();

        if(countFromDb != countFromPage) {
            var message = '<div class="alert fade in"><button class="close"' +
                'type="button" data-dismiss="alert">x</button><br>' +
                '<strong>Новое событие на узле : </strong>' + $(this).text() +
                '<p class="infodevice"></p></div>';

            $('div.span7').prepend(message);
        }
        $('span', $(this).parent()).text(countFromDb);
    });

    $('div.bar').css('width', "0px");
    t = 0;
});
socket.on('CFO', function(data) {
    var data = jQuery.parseJSON(data);

    $('li#' + data.name + ' label.area').each(function() {
        var countFromDb = findArea(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' label.location').each(function() {
        var countFromDb = findLocation(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' a.device').each(function() {
        var countFromDb = findDevice(data, $(this).text());
        var countFromPage = $('span', $(this).parent()).text();

        if(countFromDb != countFromPage) {
            var message = '<div class="alert fade in"><button class="close"' +
                'type="button" data-dismiss="alert">x</button><br>' +
                '<strong>Новое событие на узле : </strong>' + $(this).text() +
                '<p class="infodevice"></p></div>';

            $('div.span7').prepend(message);
        }
        $('span', $(this).parent()).text(countFromDb);
    });

    $('div.bar').css('width', "0px");
    t = 0;
});
socket.on('SZFO', function(data) {
    var data = jQuery.parseJSON(data);

    $('li#' + data.name + ' label.area').each(function() {
        var countFromDb = findArea(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' label.location').each(function() {
        var countFromDb = findLocation(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' a.device').each(function() {
        var countFromDb = findDevice(data, $(this).text());
        var countFromPage = $('span', $(this).parent()).text();

        if(countFromDb != countFromPage) {
            var message = '<div class="alert fade in"><button class="close"' +
                'type="button" data-dismiss="alert">x</button><br>' +
                '<strong>Новое событие на узле : </strong>' + $(this).text() +
                '<p class="infodevice"></p></div>';

            $('div.span7').prepend(message);
        }
        $('span', $(this).parent()).text(countFromDb);
    });

    $('div.bar').css('width', "0px");
    t = 0;
});
socket.on('DFO', function(data) {
    var data = jQuery.parseJSON(data);

    $('li#' + data.name + ' label.area').each(function() {
        var countFromDb = findArea(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' label.location').each(function() {
        var countFromDb = findLocation(data, $(this).text());
        $(this).next().text(countFromDb);
    });

    $('li#' + data.name + ' a.device').each(function() {
        var countFromDb = findDevice(data, $(this).text());
        var countFromPage = $('span', $(this).parent()).text();

        if(countFromDb != countFromPage) {
            var message = '<div class="alert fade in"><button class="close"' +
                'type="button" data-dismiss="alert">x</button><br>' +
                '<strong>Новое событие на узле : </strong>' + $(this).text() +
                '<p class="infodevice"></p></div>';

            $('div.span7').prepend(message);
        }
        $('span', $(this).parent()).text(countFromDb);
    });

    $('div.bar').css('width', "0px");
    t = 0;
});

function findArea(data, findObject){

    for(i in data.area){

        if(data.area[i].n == findObject){

            return data.area[i].c

        }
    }
}

function findLocation(data, findObject){

    for(var a in data.area){

        for (var l in data.area[a].l){

            if(data.area[a].l[l].n == findObject){

                return data.area[a].l[l].c;

            }
        }
    }
}

function findDevice(data, findObject){

    for(var a in data.area){

        for (var l in data.area[a].l){

            for (var d in data.area[a].l[l].h) {

                if(data.area[a].l[l].h[d].n == findObject){

                    return data.area[a].l[l].h[d].c;
                }

            }
        }
    }
}
