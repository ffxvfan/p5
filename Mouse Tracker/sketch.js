function setup() {
  createCanvas(800, 600);
  background(0);
}

function draw() {
  noStroke();
  fill(255, 255, 255, 10);
  ellipse(mouseX, mouseY, 200, 300);
}
