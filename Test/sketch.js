//draw a plane with width 50 and height 50

var mouseSensitivity = 0.01;
function setup() {
  createCanvas(200, 200, WEBGL);
}

function draw() {
  background(200);
  rotateX(mouseY * mouseSensitivity);
  rotateY(mouseX * mouseSensitivity);

  // push();
  // translate(0,0,25);
  // plane(50, 50);
  // pop();
  // rotateZ(PI/2);
  // translate(0,0,25);
  // plane(50, 50);
  var EDGE_LENGTH = 50;
  // for(var i = 0; i < 4; i++)  {
  //     push();
  //     rotateX(PI/2);
  //     translate(0, 0, edge/2);
  //     fill(0, 0, i*25);
  //     plane(edge, edge);
  //     pop();
  //     rotateZ(PI/2);
  //   }
  // translate(0,0,-millis() / 10);
  rotateX(-PI/2);
  translate(0, 0, EDGE_LENGTH/2);
  plane(EDGE_LENGTH, EDGE_LENGTH);
}
