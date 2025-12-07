let font;
let points;
let sampleFactorIncrease = 0.5;
let noiseIndex = 0;
let strings;
let keywords;
let bbox = 0;
let sourceSize = 80;

let pg;

let string = "That is to say, [fatigue] is a little mysterious, often opening us up to the possibilities of staring at the ceiling or the sky, daydreaming, slowing down, refusing to participate.";
let stringIndex = 0;
let superfastStr = "superffast";
let strSize;

let fontSize = 800;
let yellowColor = "#DDD827";
let lightBlue = "#8cbcd8";
let darkGreen = "#386e55";

let scaleFactor = 10;
let colorIndex = 0;

let pressCount = 0;

// let bg = '#a295c8';
let fg = '#d2232a';

function preload() {
  font = loadFont("assets/PPNeueBit-Bold.ttf");

}

function setup() {
let c3 = createCanvas(1100, 893);
  pg = createGraphics(1100 * 0.288*2, 1100*0.162*2);
  c3.parent(canvasWrapper3);
  c3.style("position", "absolute");
  c3.style("z-index", "75");
  pixelDensity(2);

//   background(255);
  frameRate(10);

    textFont(font);
  textSize(100);
  
  noStroke();

  pg.noStroke();
}




function draw() {
    
    pg.background(yellowColor);
  pg.push();

  pg.translate(-pg.width / 3, -pg.height*1.1);

  fontSize = pg.width/1.2;
  pg.textSize(fontSize);

  for (let m = 0; m < superfastStr.length; m++) {
    pg.push();

    let trackingFac = 3;
    if (m < 3) {
      pg.translate((m * pg.width) / trackingFac, 0);
    } else if (m < 6) {
      pg.translate(((m - 3) * pg.width) / trackingFac, pg.height / 5)
    } else {
      pg.translate(((m - 6) * pg.width) / trackingFac, (pg.height * 2));
    }
    
    if(m ==6) {
      pg.translate(width/16, 0);
    }

    points = font.textToPoints(superfastStr[m], 0, 50, fontSize, {
      sampleFactor: sampleFactorIncrease,
      simplifyThreshold: 0,
    });

    for (let i = 0; i < points.length; i++) {
      pg.push();
      pg.translate(100, -60);

      pg.fill(random(0, 180));
      let r = (i > 4) ? 400 : 10;

      if (random() < 0.3) {
        pg.stroke(darkGreen);
        pg.strokeWeight(width/700);
      } else if (random() > 0.6) {
        pg.stroke(darkGreen);
        pg.strokeWeight(width/600);
      } else {
        pg.noStroke();
      }

      let w = random(r);
      pg.rect(points[i].x, points[i].y, w, 4);
      pg.fill(yellowColor);
      pg.rect(points[i].x, points[i].y + 1, w, 4);
      pg.pop();
    }

    pg.pop();
  }

  pg.pop();

//   pg.resize(1100 * 0.288, 1100*0.162);
  
  imageMode(CORNER);
  image(pg, 393, 392, 1100 * 0.288, 1100*0.162);


  strSize = height / 20;
  textFont(font);
  textSize(strSize);
  
}

function mouseDragged() {
  // let op = int(map(mouseY, 0, height, 0, 255));
  // fill(fg);
  fill('#ddd927');
  text(string[pressCount], mouseX, mouseY);
  
  if(pressCount == string.length - 1){
    pressCount = 0;
  } else {
    pressCount++;
  }
}

