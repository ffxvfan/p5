var iteration;
var iterationSlider, zoomSlider, axisCheckbox;

function setup() {
  createCanvas(1000, 800);
  //slider descriptions & position
  iterationSlider = createSlider(0.1, 20, 1, 0.1);
  iterationSlider.position(20, 20);

  zoomSlider = createSlider(0.2, 5, 1, 0.1);
  zoomSlider.position(20, 60);

  axisCheckbox = createCheckbox("Show Axis", true);
  // axisCheckbox.changed(myCheckedEvent);
  axisCheckbox.position(20, 100);
}

function f(x) {
  return x*x*x-x;
}

function fPrime(x) {
  var h = 0.0001;
  return (f(x+h)-f(x))/h;
}

function draw() {
  push();
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

  iteration = iterationSlider.value();

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
  text("Frequency", 20, 20);
  text("Zoom", 20, 60);


}

// function myCheckedEvent() {
//   if (this.checked()) {
//     console.log("Checking!");
//   } else {
//     console.log("Unchecking!");
//   }
// }
