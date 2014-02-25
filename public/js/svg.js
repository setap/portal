function dimension(id) {
  var dimensionElem = document.getElementById(id).getBoundingClientRect();
  var exc = dimensionElem.left + dimensionElem.width / 2;
  var eyc = dimensionElem.bottom + scrollY - dimensionElem.height / 2;

  var dimensionRect = document.getElementById('region-map').getBoundingClientRect();
  var rxc = dimensionRect.left + dimensionRect.width / 2;
  var ryc = dimensionRect.bottom + scrollY - dimensionRect.height / 2;

  var exl = dimensionElem.left;
  var rxl = dimensionRect.left;

  var exb = dimensionElem.bottom;
  var rxb = dimensionRect.bottom;

  var dyt = dimensionRect.top - dimensionElem.top;

  var eh = dimensionElem.height;

  var dxl = rxl - exl;
  var dxb = rxb - exb;

  var dxc = rxc - exc;
  var dyc = ryc - eyc;

  var d = {
    dxb: dxb,
    dxl: dxl,
    dyc: dyc,
    dxc: dxc,
    dyt: dyt,
    eh: eh
  }

  return d;

};

function scaleMap(id, scale) {
  var dytComp = dimension(id).dyt * (scale - 1);
  var dxlComp = dimension(id).dxl * (scale - 1);

  d3.select('path#' + id).attr('transform', 'translate(' + (dxlComp) + ',' + (dytComp) + ') scale(' + scale + ')');

  var dycComp = dimension(id).dyc;
  var dxcComp = dimension(id).dxc;

  d3.select('path#' + id)
    .transition()
    .duration(500)
    .ease('liner')
    .attr('transform', 'translate(' + (dxlComp + dxcComp) + ',' + (dytComp + dycComp) + ') scale(' + scale + ')');
};

d3.selectAll('.map-region')
  .on('click', function (d, i) {

    var save = this;
    d3.selectAll(".map-region:not([id='" + $(this).attr('id') + "'])").remove();
    d3.selectAll('.chanel').remove();
    d3.selectAll('.node').remove();

    console.log(dimension($(this).attr('id')).eh);

    if (dimension($(this).attr('id')).eh > 170 && dimension($(this).attr('id')).eh < 290) {
      scaleMap($(this).attr('id'), 2);
    } else if (dimension($(this).attr('id')).eh >= 290) {
      scaleMap($(this).attr('id'), 1.2);
    } else {
      scaleMap($(this).attr('id'), 3.5);
    }

  });

