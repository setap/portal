// Анимация раскрывающегося списка

$(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Expand this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
});

//Пользовательские классы добавлени/удаления CSS свойств для работы с SVG

jQuery.fn.myAddClass = function (classTitle) {
    return this.each(function () {
        var oldClass = jQuery(this).attr("class");
        oldClass = oldClass ? oldClass : '';
        jQuery(this).attr("class", (oldClass + " " + classTitle).trim());
    });
}
jQuery.fn.myRemoveClass = function (classTitle) {
    return this.each(function () {
        var oldClassString = ' ' + jQuery(this).attr("class") + ' ';
        var newClassString = oldClassString.replace(new RegExp(' ' + classTitle + ' ', 'g'), ' ').trim()
        if (!newClassString)
            jQuery(this).removeAttr("class");
        else
            jQuery(this).attr("class", newClassString);
    });
}

//После полной загрузки DOM начинаем работу с SVG картой

$(window).load(function () {

    var svg = document.getElementById('imap');
    if ('contentDocument' in svg) {
        var svgdom = svg.contentDocument;
    }

    $(svgdom.getElementsByClassName("region")).hover(
        function () {
            console.log('region');
            var id = $(this).attr("id");
            console.log(id);
            $("#" + id, svgdom).myAddClass("highlight");
        },
        function () {
            console.log('region');

        }
    );

// Подсвечивание канала связи при наведении

    $(svgdom.getElementsByClassName('chanel')).hover(
        function () {
            var id = $(this).attr("id");
            $("#" + id, svgdom).myAddClass("selected");
        },
        function () {
            var id = $(this).attr("id");
            $("#" + id, svgdom).myRemoveClass("selected");
        }
    );

//    Убираем каналы связи по чек-боксу

    $('#chanel').change(function () {
        var elements = $(".chanel", svgdom);

        if (this.checked) {
            elements.myAddClass("hidden");
        } else {
            elements.myRemoveClass("hidden");
        }

    })
})

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

var socket = io.connect('', {
    reconnect: false
});

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

socket
    .on('YFO', function (data) {
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
    })
    .on('SFO', function (data) {
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
    })
    .on('UFO', function (data) {
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
    })
    .on('PFO', function (data) {
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
    })
    .on('SKFO', function (data) {
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
    })
    .on('CFO', function (data) {
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
    })
    .on('SZFO', function (data) {
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
    })
    .on('DFO', function (data) {
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
    })

    .on('connect', function () {
        $('div.alert').hide();
    })

    .on('disconnect', function () {
        var message = '<div class="alert fade in"><button class="close"' +
            'type="button" data-dismiss="alert">x</button><br>' +
            '<strong>Соединение с порталом утеряно, при восстановлении браузер подключиться автоматически! </strong>' +
            '<p class="infodevice"></p></div>';

        $('div.span7').prepend(message);

        setTimeout(reconnect, 500);
    });

function reconnect() {
    socket.once('error', function () {
        setTimeout(reconnect, 500);
    });
    socket.socket.connect();
}

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

