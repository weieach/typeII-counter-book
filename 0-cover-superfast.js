let font;
let points;
let sampleFactorIncrease = 0.5;
let noiseIndex = 0;
let strings;
let keywords;
let bbox = 0;
let sourceSize = 80;

let bgStr = "I";

let superfastStr = "superfast";
let fontSize = 600;
let yellowColor = "#DDD827";
let lightBlue = "#8cbcd8";
let darkGreen = "#386e55";

function preload() {
  font = loadFont("assets/PPNeueBit-Bold.ttf");
}

function setup() {
  let c0 = createCanvas(934/1.7, 600);
  c0.parent("canvasWrapper0");
  c0.style("position", "absolute");
  c0.style("z-index", "100");
  c0.style("bottom", "00px");
  c0.style("right", "315px");
  textFont(font);
  textSize(100);
  background(yellowColor);
  noStroke();
    frameRate(10);


}

function draw() {
    push();

  translate(-width / 8, 0);


  background(yellowColor);
  translate(0, width/2.8);
  fontSize = width / 1.4;
  textSize(fontSize);
  for (let m = 0; m < superfastStr.length; m++) {
    push();

    let trackingFac = 3.5;
    if (m < 3) {
      if (m == 0) {
        translate((m * width) / trackingFac, 0);
      } else {
        translate((m * width) / trackingFac, 0);
      }
    } else if (m < 6) {
      translate(((m - 3) * width) / trackingFac, width / 3);
    } else {
      translate(((m - 6) * width) / trackingFac, (width * 3.24) / 5);
    }

    points = font.textToPoints(superfastStr[m], 0, 50, fontSize, {
      sampleFactor: sampleFactorIncrease,
      simplifyThreshold: 0,
    });

    for (let i = 0; i < points.length; i++) {
      push();
      let randomNum = random();
      translate(100, -60);
      fill(random(0, 180));
      let r = width / 93.4;
      if (i > 4) {
        r = width/2;
      }

      if (random() < 0.3) {
        stroke("#386e55");
        strokeWeight(0.5);
      } else if (random() > 0.6) {
        stroke("#386e55");
        strokeWeight(1.3);
      } else {
        noStroke();
      }

      let w = random(r);
      rect(points[i].x, points[i].y, w, 6);
      fill(yellowColor);
      rect(points[i].x, points[i].y + 1, w, 6);
      pop();
    }

    pop();
  }
  pop();
}
