var frequencySlider, zoomSlider, axisCheckbox, selectFunction;
// var f;
var needsRedraw = true;



function setup() {
  createCanvas(1000, 800);
  //slider descriptions & position
  frequencySlider = createSlider(0.1, 20, 1, 0.1);
  frequencySlider.position(20, 60);
  // frequencySlider.changed(requestRedraw);


  zoomSlider = createSlider(0.2, 5, 1, 0.1);
  zoomSlider.position(20, 100);
  // zoomSlider.changed(requestRedraw);

  axisCheckbox = createCheckbox("Show Axis", true);
  // axisCheckbox.changed(requestRedraw);
  axisCheckbox.position(20, 140);

  sel = createSelect();
  sel.position(20, 20);
  sel.option('cosine');
  sel.option('secant');
  sel.option('tangent');
  sel.option('harmonic');
  // sel.changed(requestRedraw);
  setF();

}
function requestRedraw()  {
  needsRedraw = true;
}


function setF() {
  var frequency = frequencySlider.value();
  var item = sel.value();
  if (item === 'cosine') {
    f = function a(x) {
      return cos(frequency*x);
    };
  } else if (item === 'secant') {
    f = function a(x) {
      return 1 / cos(frequency*x);
    };
  } else if (item === 'tangent') {
    f = function a(x) {
      return tan(frequency*x);
    };
  } else if (item === 'harmonic') {
    f = function a(x) {
      return sin(frequency*x)/x;
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
  var pixelsPerUnit = 100.0 * zoomSlider.value();
  var xStepSize = 0.005;
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
  stroke(0);
  noFill();
  beginShape();
  for (var x = xMin - xStepSize; x < xMax + 2 * xStepSize; x += xStepSize) {
    curveVertex(x, f(x));
  }
  endShape();

  //graph tangents
  stroke(0, 10);
  for (var x = xMin - xStepSize; x < xMax + 2 * xStepSize; x += xStepSize) {
    line(xMin, fPrime(x) * (xMin - x) + f(x), xMax, fPrime(x) * (xMax - x) + f(x));
  }
  pop();

  //UI labels
  text("Frequency", 20, 60);
  text("Zoom", 20, 100);


}

// function myCheckedEvent() {
//   if (this.checked()) {
//     console.log("Checking!");
//   } else {
//     console.log("Unchecking!");
//   }
// }
