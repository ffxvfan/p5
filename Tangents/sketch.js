function setup() {
  createCanvas(1000, 800);
}

function f(x) {
  return sin(3*x);
}

function fPrime(x) {

  return 3*cos(3*x);
}


function draw() {
  var pixelsPerUnit = 100.0;
  var xStepSize = 0.005;
  var xMin = -width / pixelsPerUnit / 2;
  var xMax = width / pixelsPerUnit / 2;
  var yMin = -height / pixelsPerUnit / 2;
  var yMax = height / pixelsPerUnit / 2;

  background(255);
  translate(width / 2, height / 2);
  scale(pixelsPerUnit, -pixelsPerUnit);

  strokeWeight(1.0 / pixelsPerUnit);

  fill(0);

  //draw axis
  stroke(0, 40);
  line(xMin, 0, xMax, 0);
  line(0, yMin, 0, yMax);

  //graph parabola
  // stroke(0);
  // noFill();
  // beginShape();
  // for(var x = xMin-xStepSize; x < xMax+2*xStepSize; x += xStepSize) {
  //   curveVertex(x, f(x));
  // }
  // endShape();

  //graph tangents
  stroke(0, 10);
  for(var x = xMin-xStepSize; x < xMax+2*xStepSize; x += xStepSize) {
    line(xMin, fPrime(x)*(xMin - x) + f(x), xMax, fPrime(x)*(xMax - x) + f(x));

  }

}
