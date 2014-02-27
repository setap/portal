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

// Переключение карт по регионам

$('.region').on('click', function (e) {
  var html = ejs.render(templates.tempRegionMap, {node: this});
  $('.map').html(html);
  d3.select('path#path3879').attr('transform', 'translate("100","0")');
});

// Переключение по городам

$('.location').on('click', function (e) {
  var html = ejs.render(templates.tempNodeMap, {node: this});
  $('.map').html(html);
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
      var id = $(this).attr("id");
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

// Всплывающее окно при наведении на СЭ

$('.device').popover(
  { trigger: 'hover',
    placement: 'right',
    html: true,

    content: function () {

      var strUrl = "/ping", response = "";

      jQuery.ajax({
        url: strUrl,
        data: {"device": this.text},
        success: function (data) {
          response = data;
        },
        async: false
      });

      if (response.RTT == -1 || response.RTT == undefined) {
        $('p.rtt', $(this).parent()).html('Время отклика <span class="badge badge-important">' + 'NA' + '</span>');
      } else {
        $('p.rtt', $(this).parent()).html('Время отклика <span class="badge badge-success">' + response.RTT + 'ms' + '</span>');
      }

      if (response.CPUBUSYPOLL == null || response.CPUBUSYPOLL == undefined) {
        $('p.cpubusy', $(this).parent()).html('Загрузка ЦП <span class="badge">' + 'NA' + '</span>');
      } else {
        $('p.cpubusy', $(this).parent()).html('Загрузка ЦП <span class="badge badge-success">' + response.CPUBUSYPOLL + '%' + '</span>');
      }

      var d = $('div.info', $(this).parent()).html();
      return d;
    }
  }
);

$('.device').click(function () {
  var strUrl = "/info", response = "";
  console.log('click');
  jQuery.ajax({
    url: strUrl,
    data: {"device": this.text},
    success: function (data) {
      response = data;
    },
    async: false
  });

  var snmpOutBandwidth = JSON.parse(response.DATA);

  var html = ejs.render(templates.tempSnmpBandwidth, {snmpOutBandwidth: snmpOutBandwidth, node: this});
  $('.map').html(html);
});

var socket = io.connect('', {
  reconnect: false
});

var tNetcol = 0;
var tNCIM = 0;
var tSCCD = 0;
var tWisla = 0;

setInterval(function () {
  tNetcol += 1;
  tNCIM += 1;
  tSCCD += 1;
  tWisla += 1;
  $('div.bar.netcool').css('width', tNetcol + "px");
  $('div.bar.ncim').css('width', tNCIM + "px");
  $('div.sccd').css('width', tSCCD + "px");
  $('div.wisla').css('width', tWisla + "px");
}, 700);

socket
  .on('netcool', function (data) {
    tNetcol = 0;
    var countDownDevices = 0;
    var unavailableNode = [];
    data = JSON.parse(data);
    for (var i = 0; i < data.rowset.rows.length; i++) {
      if (data.rowset.rows[i].Summary.indexOf('Chassis Ping fail') != -1) {
        countDownDevices++;
        unavailableNode.push(data.rowset.rows[i].NodeAlias)
        console.log(data.rowset.rows[i].Summary);
      }
    }
    var html = ejs.render(templates.tempNetcoolAlert, {countDownDevices: countDownDevices, countEvents: data.rowset.affectedRows});
    var htmlUnavNode = ejs.render(templates.tempUnavailableNode, {unavailableNode: unavailableNode});
    $('.netcool').html(html);
    $('.unavailable').html(htmlUnavNode);
  })
  .on('ncim', function (data) {
    tNCIM = 0;
  })
  .on('wisla', function (data) {
    tWisla = 0;
    var listChanelId = [];
    $('path.chanel').each(function () {
      listChanelId.push(this.id);
    });


    for (var i = 0; i < data.serviceBaseDtos.length; i++) {
      for (var j = 0; j <= listChanelId.length; j++) {
        if (data.serviceBaseDtos[i].id == listChanelId[j]) {
          console.log(listChanelId[j]);
          $("#" + listChanelId[j]).myAddClass(data.serviceBaseDtos[i].currentServiceStatus);

        }
      }
    }
  })
  .on('devices', function (data) {
    for (var i = 0; i < data.device.length; i++) {
      //setCountEvent(data.device[i]);
    }
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
  })

function reconnect() {
  socket.once('error', function () {
    setTimeout(reconnect, 500);
  });
  socket.socket.connect();
}

function findArea(data, findObject) {

  for (i in data.area) {

    if (data.area[i].n == findObject) {

      return data.area[i].c

    }
  }
}

function findLocation(data, findObject) {

  for (var a in data.area) {

    for (var l in data.area[a].l) {

      if (data.area[a].l[l].n == findObject) {

        return data.area[a].l[l].c;

      }
    }
  }
}

function findDevice(data, findObject) {

  for (var a in data.area) {

    for (var l in data.area[a].l) {

      for (var d in data.area[a].l[l].h) {

        if (data.area[a].l[l].h[d].n == findObject) {

          return data.area[a].l[l].h[d].c;
        }

      }
    }
  }
}

function setCountEvent(data) {

  $('li#' + data.name + ' a.area').each(function () {
    var countFromDb = findArea(data, $(this).text());
    $(this).next().text(countFromDb);
  });

  $('li#' + data.name + ' a.location').each(function () {
    var countFromDb = findLocation(data, $(this).text());
    $(this).next().text(countFromDb);
  });

  $('li#' + data.name + ' a.device').each(function () {
    var countFromDb = findDevice(data, $(this).text());
    var countFromPage = $('span', $(this).parent()).text();

    if (countFromDb != countFromPage) {
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
}