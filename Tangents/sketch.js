var frequencySlider, zoomSlider, alphaSlider, axisCheckbox, selectFunction, ampSlider, tangentLineDensity, functionCheckBox;
var sliderCount = 0,
  sliderLabels = [];
var needsRedraw = true;



function setup() {
  createCanvas(1000, 800);
  //slider descriptions & position
  frequencySlider = makeSlider(0.1, 20, 1, 0.1, "Frequency");

  zoomSlider = makeSlider(0.2, 5, 1, 0.1, "Zoom");

  alphaSlider = makeSlider(0.1, 255, 1, 1, "Tangent Line Opacity");

  ampSlider = makeSlider(0.1, 20, 1, 0.01, "Amplitude");

  tangentLineDensity = makeSlider(0.001, 1, 0.005, 0.0001, "Tangent Line Density");

  axisCheckbox = createCheckbox("Show Axis", true);
  axisCheckbox.position(20, 260);

  functionCheckBox = createCheckbox("Show Function", true);
  functionCheckBox.position(20, 300);



  sel = createSelect();
  sel.position(20, 20);
  sel.option('cosine');
  sel.option('secant');
  sel.option('tangent');
  sel.option('harmonic');
  // sel.changed(requestRedraw);
  setF();

}

function makeSlider(min, max, start, increment, label) {
  var slider = createSlider(min, max, start, increment);
  slider.position(20, 60 + (40 * sliderCount++));
  sliderLabels.push(label);
  return slider;
}

function requestRedraw() {
  needsRedraw = true;
}


function setF() {
  var frequency = frequencySlider.value();
  var amp = ampSlider.value();
  var item = sel.value();
  if (item === 'cosine') {
    f = function a(x) {
      return amp * cos(frequency * x);
    };
  } else if (item === 'secant') {
    f = function a(x) {
      return 1 / (amp * cos(frequency * x));
    };
  } else if (item === 'tangent') {
    f = function a(x) {
      return amp * tan(frequency * x);
    };
  } else if (item === 'harmonic') {
    f = function a(x) {
      return (amp * sin(frequency * x)) / x;
    };
  }
  // return x*x*x-x;
  // return 1/cos(x);
  // return exp(x);
}

function fPrime(x) {
  var h = 0.0001;
  return (f(x + h) - f(x)) / h;
}

function draw() {
  setF();
  push();
  var pixelsPerUnit = 100.0 * zoomSlider.value();
  var xStepSize = tangentLineDensity.value();
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

  //graph parabola
  if (functionCheckBox.checked()) {
    stroke(0);
    noFill();
    smooth();
    beginShape();
    for (var x = xMin - xStepSize; x < xMax + 2 * xStepSize; x += xStepSize) {
      curveVertex(x, f(x));
    }
    endShape();
  }

  //graph tangents
  stroke(0, alphaSlider.value());
  for (var x = xMin - xStepSize; x < xMax + 2 * xStepSize; x += xStepSize) {
    line(xMin, fPrime(x) * (xMin - x) + f(x), xMax, fPrime(x) * (xMax - x) + f(x));
  }
  pop();

  //UI labels
  for (var c = 0; c < sliderLabels.length; c++) {
    text(sliderLabels[c], 20, 60 + (40 * c));
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
