var cube;
var EDGE_LENGTH = 50;
var mouseSensitivity = 0.01;

function setup() {
  createCanvas(500, 500, WEBGL);
  cube = new RubixCube();

  cube.rotate("R");


}

function draw() {
  background(200);
  rotateX((mouseY-height/2) * mouseSensitivity);
  rotateY((mouseX-width/2) * mouseSensitivity);
  cube.draw();





}

class RubixCube {

  constructor() {
    this.nameToFaces = {};
    this.cubicles = [];
    var faceNames = ["u", "d", "l", "r", "f", "b", ""];
    for (var i = 0; i < faceNames.length; i++) {
      var faceName = faceNames[i];
      this.nameToFaces[faceNames[i]] = new Face(faceName);
    }

    var upToDown = ["u", "", "d"],
      leftToRight = ["l", "", "r"],
      frontToBack = ["f", "", "b"];


    for (var ud = 0; ud < upToDown.length; ud++) {
      for (var lr = 0; lr < leftToRight.length; lr++) {
        for (var fb = 0; fb < frontToBack.length; fb++) {
          var name = upToDown[ud] + leftToRight[lr] + frontToBack[fb];
          var cubicle = new Cubicle(name, lr - 1, ud - 1, 1 - fb);
          this.nameToFaces[upToDown[ud]].addCubicle(cubicle);
          this.nameToFaces[leftToRight[lr]].addCubicle(cubicle);
          this.nameToFaces[frontToBack[fb]].addCubicle(cubicle);
          if (name.length > 0) {
            this.cubicles.push(cubicle);
          }
        }
      }
    }
    delete this.nameToFaces[""];

  }

  draw() {
    for (var i = 0; i < this.cubicles.length; i++) {
      this.cubicles[i].draw();
    }

  }

  rotate(faceName)  {
    this.nameToFaces[faceName.toLowerCase()].rotate();
  }




}

class Face {

  constructor(faceName) {
    this.face = faceName;
    this.corners = [];
    this.edges = [];

  }

  addCubicle(cubicle) {
    var nameLength = cubicle.name.length;
    if (nameLength == 1) {
      this.center = cubicle;
    } else if (nameLength == 2) {
      this.edges.push(cubicle);
    } else if (nameLength == 3) {
      this.corners.push(cubicle);
    }
  }

  rotate()  {

    // //currently switching R (right face corners)
    // var temp = new Cubicle(this.corners[0].name, this.corners[0].x, this.corners[0].y, this.corners[0].z);
    // this.corners[0].cubie = this.corners[1].cubie;
    // this.corners[1].cubie = this.corners[2].cubie;
    // this.corners[2].cubie = this.corners[3].cubie;
    // this.corners[3].cubie = temp.cubie;

  }

}

class Cubicle {

  constructor(name, x, y, z) {
    this.name = name;
    this.cubie = new Cubie(name);

    this.x = x;
    this.y = y;
    this.z = z;

  }

  draw() {
    push();
    translate(this.x * EDGE_LENGTH, this.y * EDGE_LENGTH, this.z * EDGE_LENGTH);
    this.cubie.draw();


    pop();
  }



}

class Cubie {

  constructor(name) {
    this.name = name;


  }

  draw() {
    //box(40);
    var alpha = 255;
    for (var i = 0; i < this.name.length; i++) {
      push();
      switch (this.name.charAt(i)) {
        case "u":
          rotateX(-PI / 2);
          translate(0, 0, EDGE_LENGTH / 2);
          fill(255, alpha);
          break;
        case "d":
          rotateX(PI / 2);
          translate(0, 0, EDGE_LENGTH / 2);
          fill(255, 255, 0, alpha); //yellow
          break;
        case "l":
          rotateY(PI / 2);
          translate(0, 0, -EDGE_LENGTH / 2);
          fill(255, 165, 0, alpha); //orange
          break;
        case "r":
          rotateY(-PI / 2);
          translate(0, 0, -EDGE_LENGTH / 2);
          fill(255, 0, 0, alpha); //red
          break;
        case "f":
        translate(0, 0, EDGE_LENGTH / 2);
          //rotateY(PI/2);
          fill(0, 0, 255, alpha); //blue
          break;
        case "b":
        translate(0, 0, -EDGE_LENGTH / 2);
          //rotateX(PI/2);
          fill(0, 255, 0, alpha); //green
          break;
      }
      var sideScalar = 0.9;
      plane(EDGE_LENGTH*sideScalar, EDGE_LENGTH*sideScalar);

      pop();
    }


  }


}

// class Cube  {
//
//   constructor(x, y, z)  {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//   }
//
//   draw()  {
//     push();
//     translate(this.x, this.y, this.z);
//
//     for(var i = 0; i < 4; i++)  {
//       push();
//       rotateX(PI/2);
//       translate(0, 0, edge/2);
//       fill(0, 0, i*25);
//       plane(edge, edge);
//       pop();
//       rotateZ(PI/2);
//     }
//
//     translate(0, 0, edge/2);
//     fill(255, 0, 0);
//     plane(edge, edge);
//     translate(0, 0, -edge);
//     fill(0, 255, 0);
//     plane(edge, edge);
//     pop();
//   }
//
// }
