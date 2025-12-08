let font;
let points;
let sampleFactorIncrease = 0.05;

function preload() {
  font = loadFont('assets/StackSansText-VariableFont_wght.ttf'); // Replace with your font path
}

function setup() {
  let c13 = createCanvas(550, 893);
  c12.parent(canvasWrapper12);
  c12.style("position", "absolute");
  c12.style("z-index", "100");
  // textFont(font)
  frameRate(7)
  

}

function draw() {
    background(0);
  noStroke();
  
  // textSize(200);
  points = font.textToPoints('Superfast, Super', 0, 100, width/5, {
    sampleFactor: sampleFactorIncrease,
    simplifyThreshold: 0
  });
  
  
  
  rectMode(CENTER);
  
  
  push();
  blendMode(DIFFERENCE);
  
  let gap = 10;
  let fontSize = width/90;
  let bbox = font.textBounds('superfast', 35, 53);
  for(let y = 0; y < height; y+=bbox.h){
    for(let x = 0; x < width; x+=bbox.w){
      let r = random(3);
      fill(random(200));
      rect(x+frameCount, y, r, r);
      textSize(fontSize);
      text("Superfast", x, y);
    }
  }
  
  for (let i = 0; i < points.length; i++) {
    translate(0, 1);
    fill(random(150, 255));
    let r = width/60;
    if(random()>0.5){
      r = width/80;
    }
    rect(points[i].x, points[i].y, r, r);
  }

  translate(0, -380);
  for (let i = 0; i < points.length; i++) {
    translate(0, 1);
    fill(random(150, 255));
    rect(points[i].x, points[i].y, width/20, width/50);
  }
  
  translate(0, -350);
  for (let i = 0; i < points.length; i++) {
    translate(0, 1);
    fill(255);
    let r = width/9;
    if(random()>0.5){
      r = random(width/30);
    }
    if(random()>0.3){
    rect(points[i].x, points[i].y, r, r/6);
    }
  }

  pop();
  
  
  
  rectMode(CORNER);
  blendMode(MULTIPLY);
  fill("#DDD827");
  rect(0, 0, width, height);

}