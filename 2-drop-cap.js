let font;
let points;
let pointsX = [];
let pointsY = [];
let sampleFactorIncrease = 0.5;
let noiseIndex = 0;
let strings;
let keywords;
let bbox = 0;
let sourceSize = 80;

let superfastStr = "superfast";
let fontSize = 600;
let yellowColor = "#DDD827";
let lightBlue = "#8cbcd8";
let darkGreen = "#386e55";

function preload() {
  font = loadFont("assets/PPNeueBit-Bold.ttf");
}

function setup() {
  let c2 = createCanvas(136, 187);
  c2.parent("canvasWrapper2");
  c2.style("position", "absolute");
  c2.style("z-index", "100");
  textFont(font);
  textSize(100);

  push();

  

  fontSize = width * 8;
  textSize(fontSize);
  points = font.textToPoints(superfastStr, -width/2.68, height/1.24, fontSize, {
    sampleFactor: sampleFactorIncrease,
    simplifyThreshold: 0,
  });

  for (let i = 0; i < points.length; i++) {
    pointsX[i] = points[i].x;
    pointsY[i] = points[i].y;
  }
}

function draw() {
  background(yellowColor);
  translate(width/30, height/1.5);
    scale(0.4);
  
  for (let i = 0; i < points.length; i++) {
      push();
      
      translate(0, -height /10);
      fill(random(0, 180));
      let r = width *3 / 93.4;
      if (i > 4) {
        r = width*3/2;
      }

      if (random() < 0.3) {
        stroke("#386e55");
        strokeWeight(0.8);
      } else if (random() > 0.6) {
        stroke("#386e55");
        strokeWeight(1.8);
      } else {
        noStroke();
      }

      let w = random(r);
    let standardSize = width/ 22.66;
      rect(points[i].x, points[i].y, standardSize, standardSize);
      fill(yellowColor);
      rect(points[i].x, points[i].y+1, r/standardSize, standardSize);
      pop();
  }

}
