let font;
let points;
let sampleFactorIncrease = 0.5;
let noiseIndex = 0;
let strings;
let keywords;
let bbox = 0;
let sourceSize = 80;

let superfastStr = "superfast";
let fontSize = 600;

function preload() {
  font = loadFont("assets/PPNeueBit-Bold.ttf");

}

let wrapper5;
const aspect = 1100 / 893;


function setup() {
  wrapper5 = document.getElementById("canvasWrapper5");
  
  let w = wrapper5.offsetWidth;
  let h = w / aspect;

  let c5 = createCanvas(w, h).parent(wrapper5);
  resizeToWrapper();
  c5.style("position", "absolute");
  c5.style("z-index", "50");
  // c5.style("opacity", "0.4");
  frameRate(7);
  textFont(font);
  textSize(100);
}

function draw() {
  background("#DDD827");
  noStroke();

  translate(-width / 18, height / 7);

  fontSize = width/3;
  let prevW;
  for (let m = 0; m < superfastStr.length; m++) {
    push();
    // textSize(fontSize);
    // bbox = font.textBounds(strings[m], 0, 0);
    // prevW = bbox.w;
    points = font.textToPoints(superfastStr[m], 0, 50, fontSize, {
      sampleFactor: sampleFactorIncrease,
      simplifyThreshold: 0,
    });

    translate((fontSize / 3) * m, m * width/9.5);

    for (let i = 0; i < points.length; i++) {
      push();
      let randomNum = random();
      translate(100, 0);
      fill(random(0, 180));
      let r = 10;
      rect(points[i].x, points[i].y, random(200), 6);
      if (random() < 0.1) {
        
        if (random() < 0.2) {
          rect(
            points[i].x + randomGaussian(200, 450),
            points[i].y,
            6,
            5
          );
        } else {
          rect(
          points[i].x + randomGaussian(200, 450),
          points[i].y,
          abs(random(6, 20)),
          5
        );
        }
      }
      pop();
    }
    // fontSize /= 2;
    pop();
  }
}


function windowResized() {
  resizeToWrapper();
}

function resizeToWrapper() {
  if (!wrapper5) return;

  let w = wrapper5.offsetWidth;
  let h = w / aspect;

  resizeCanvas(w, h);
}