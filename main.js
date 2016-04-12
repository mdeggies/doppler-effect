$(document).ready(init);

function init() {
  var hexMap = hexMapper();

  //animate star using greensock's library
  TweenMax.to(".star", 4, {y:150, x:400, ease:Linear.easeIn, scaleX: 0.1, scaleY: 0.1, repeat: -1});

  //initialize slider
  var $range = $(".js-range-slider"),
  $from = $(".js-from"),
  range,
  min = -100,
  max = 100

  var updateValues = function () {
    //bind slider and input box values
    $from.prop("value", from);
    var num = from;
    num = Math.ceil(num/2);
    var hexValue = hexMap[num];
    //change the color of the star based on input values
    colorImage('starImg', hexValue);
  };

  $range.ionRangeSlider({
    type: "single",
    min: min,
    max: max,
    prettify_enabled: true,
    grid: true,
    grid_num: 5,
    onChange: function (data) {
      from = data.from;
      updateValues();
    }
  });

  range = $range.data("ionRangeSlider");

  var updateRange = function () {
    range.update({
      from: from
    });
  };

  $from.on("change", function () {
    from = +$(this).prop("value");
    if (from < min) {
      from = min;
    }
    updateValues();
    updateRange();
  });
}

function hexMapper() {
  //return object of hex colors for every possible input value
  var hexMap = {};

  var whiteToBlue = jsgradient.generateGradient('#FFFFFF', '#0000FF', 51); //0 to -50
  var whiteToRed = jsgradient.generateGradient('#FFFFFF', '#FF0000', 51); //0 to 50

  for (var i=whiteToBlue.length-1; i>=1; i--) {
    var value = whiteToBlue[i];
    var key = '-'+i;
    hexMap[key] = value;
  }
  for (var i=0; i<whiteToRed.length; i++) {
    var value = whiteToRed[i];
    var key = i.toString();
    hexMap[key] = value;
  }

  return hexMap;
}

function hexToRgb(color) {
  //convert hex to rgb values
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  color = color.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : {
    r: 0,
    g: 0,
    b: 0
  };
}

function colorImage(imgId,hexaColor) {
  //create hidden canvas (using image dimensions)
  var imgElement = document.getElementById(imgId);

  var canvas = document.createElement("canvas");
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(imgElement,0,0);

  var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

  var data = imageData.data;

  //convert image to grayscale
  var rgbColor = hexToRgb(hexaColor);

  for (var p = 0, len = data.length; p < len; p+=4) {
    data[p + 0] = rgbColor.r;
    data[p + 1] = rgbColor.g;
    data[p + 2] = rgbColor.b;
  }
  ctx.putImageData(imageData, 0, 0);

  //replace image source with canvas data
  imgElement.src = canvas.toDataURL();
}
