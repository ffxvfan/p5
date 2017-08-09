var frequencySlider, zoomSlider, alphaSlider, axisCheckbox, selectFunction, ampSlider, tangentLineDensity, functionCheckBox;
var sliderCount = 0,
  sliders = [],
  sliderLabels = [];
var needsRedraw = true;
var xOft, yOft;

var madeChanges = false;



function setup() {
  createCanvas(1000, 800);
  //slider descriptions & position
  aSlider = makeSlider(0.1, 10, 1, 0.1, "a");

  bSlider = makeSlider(0.1, 10, 1, 0.1, "b");

  cSlider = makeSlider(0, 10, 3, 0.1, "c");

  zoomSlider = makeSlider(0.2, 5, 1, 0.1, "Zoom");

  alphaSlider = makeSlider(0.1, 255, 1, 1, "Tangent Line Opacity");

  // ampSlider = makeSlider(0.1, 20, 1, 0.01, "Amplitude");
  //
  numTanLinesSlider = makeSlider(3, 1000, 12, 1, "Number of Tangent Lines");

  axisCheckbox = createCheckbox("Show Axis", true);
  axisCheckbox.position(20, 300);

  functionCheckBox = createCheckbox("Show Function", true);
  functionCheckBox.position(20, 340);



  sel = createSelect();
  sel.position(20, 20);
  sel.option('ellipse');
  sel.option('asteroid');
  sel.option('epitrochoid')
  // sel.changed(requestRedraw);
  setXandY();

}

function makeSlider(min, max, start, increment, label) {
  var slider = createSlider(min, max, start, increment);
  slider.position(20, 60 + (40 * sliderCount++));
  sliders.push(slider);
  sliderLabels.push(label);
  return slider;
}
//
// function requestRedraw() {
//   needsRedraw = true;
// }


function setXandY() {
  var a = aSlider.value();
  var b = bSlider.value();
  var c = cSlider.value();

  var item = sel.value();
  if (item == 'ellipse') {
    xOft = function zzz(t) {
      return a * cos(t);
    };
    yOft = function zzzz(t) {
      return b * sin(t);
    };
  } else if (item == 'asteroid') {
    xOft = function q(t) {
      return a * Math.pow(cos(t), 3);
    };
    yOft = function e(t) {
      return b * Math.pow(sin(t), 3);
    };
  } else if (item == 'epitrochoid') {
    xOft = function vhs(t) {
      return (a + b) * cos(t) - c * cos((a / b + 1) * t);
    };
    yOft = function dvd(t) {
      return (a + b) * sin(t) - c * sin((a / b + 1) * t);
    };
  }


  // return x*x*x-x;
  // return 1/cos(x);
  // return exp(x);
}

function slope(t) {
  var deltaT = 0.0001;
  return (yOft(t + deltaT) - yOft(t)) / (xOft(t + deltaT) - xOft(t));
}

function draw() {
  setXandY();
  push();
  var pixelsPerUnit = 100.0 * zoomSlider.value();
  var tStepSize = 2 * PI / numTanLinesSlider.value();
  var shapeSize = 0.01;
  var xMin = -width / pixelsPerUnit / 2;
  var xMax = width / pixelsPerUnit / 2;
  var yMin = -height / pixelsPerUnit / 2;
  var yMax = height / pixelsPerUnit / 2;

  background(255);
  translate(width / 2, height / 2);
  scale(pixelsPerUnit, -pixelsPerUnit);

  strokeWeight(1.0 / pixelsPerUnit);

  //draw axis
  if (axisCheckbox.checked()) {
    stroke(0, 40);
    line(xMin, 0, xMax, 0);
    line(0, yMin, 0, yMax);
  }

  var tMin = 0,
    tMax = 12 * PI;
  //graph parabola
  if (functionCheckBox.checked()) {
    stroke(0);
    noFill();
    smooth();
    beginShape();
    for (var t = tMin - shapeSize; t < tMax + 2 * shapeSize; t += shapeSize) {
      curveVertex(xOft(t), yOft(t));
    }
    endShape();
  }

  //graph tangents
  stroke(0, alphaSlider.value());

  for (var index = 0; index < numTanLinesSlider.value(); index++) {
    var t = index * tStepSize;
    var m = slope(t),
      x = xOft(t),
      y = yOft(t);
    // line(xMin, fPrime(x) * (xMin - x) + f(x), xMax, fPrime(x) * (xMax - x) + f(x));
    line(xMin, m * (xMin - x) + y, xMax, m * (xMax - x) + y);
  }
  pop();

  //UI labels
  for (var c = 0; c < sliders.length; c++) {
    text(sliderLabels[c], 20, 60 + (40 * c));
    text(sliders[c].value(), 160, 70 + (40 * c));
  }
  // text("Frequency", 20, 60);
  // text("Zoom", 20, 100);
  // text("Tangent Line Opacity", 20, 140);
  // text("Amplitude", 20, 220);
  // text("Tangent Line Density", 20, 260);



}

// function myCheckedEvent() {
//   if (this.checked()) {
//     console.log("Checking!");
//   } else {
//     console.log("Unchecking!");
//   }
// }
