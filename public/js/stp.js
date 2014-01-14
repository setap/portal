
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
      var d = null;

      d = $('div.info', $(this).parent()).html();

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

/*
socket.on('device', function(data){


    var data = jQuery.parseJSON(data);

    var displayRegion = $('#' + data.name + ' ul').css("display") == 'block' ? true : false;
    var displayArea = $('#' + data.name + ' ul li ul').css("display") == 'block' ? true : false;
    var displayLocation = $('#' + data.name + ' ul li ul li ul').css("display") == 'block' ? true : false;


    console.log(data.area['Астраханская обл.']);

    var html='';
    html += ' <li id="' + data.name + '"><label class="tree-toggle nav-header">' + data.name + '</label>'
    for(var a =0; a < data.area.length; a++){

        html += '<ul class="nav nav-list tree">';
        html += '<li><label class="tree-toggle nav-header">' + data.area[a].n + '</label>';

        for(var l = 0; l < data.area[a].l.length; l++){
            html += '<ul class="nav nav-list tree">';
            html += '<li><label class="tree-toggle nav-header">' + data.area[a].l[l].n + '</label>';

            for(var d = 0; d < data.area[a].l[l].h.length; d++){
                html += '<ul class="nav nav-list tree">';
                html += '<li>';
                html += '<a href="#" class="device" data-toggle="popover" data-placement="right">' +
                    data.area[a].l[l].h[d].n;

                if(data.area[a].l[l].h[d].s == 'ok'){
                    html += '<span class="badge badge-success">1</span>';
                }

                html += '</a>';
                html += '</li>';
                html += '</ul>';
            }

            html += '</li>';
            html += '</ul>';
        }

        html += '</li>';
        html += '</ul>';
    }
    html += '</li>';

    $('#'+data.name).replaceWith(html);


    if(displayRegion == false){
        $('#' + data.name + ' ul').hide();
    }

    $('#' + data.name + ' .tree-toggle').click(function () {
        console.log('click');
        $(this).parent().children('ul.tree').toggle(200);
    });


    console.log(html);
})
*/

/*$(function(){
    var docHeight = $(document).height();
    $("body").append("<div id='overlay'></div>");
    $("#overlay")
        .height(docHeight)
        .css({
            'opacity' : 0.4,
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'background-color': 'black',
            'width': '100%',
            'z-index': 5000
        });
});*/
