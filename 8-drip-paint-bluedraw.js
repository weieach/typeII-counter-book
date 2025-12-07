let font;
let points;
let sampleFactorIncrease = 0.5;
let noiseIndex = 0;
let strings;
let keywords;
let bbox = 0;
let sourceSize = 80;

let img;

let string = "Gotta have it SUPERFAST";
let stringIndex = 0;
let strSize;

let scaleFactor = 10;
let colorIndex = 0;

let pressCount = 0;
let walkerCount = 0;
let walker;


function preload() {
  font = loadFont("assets/PPNeueBit-Bold.ttf");

}

function setup() {
  let c8 = createCanvas(555, 893);
  c8.parent("canvasWrapper8");
  c8.style("position", "absolute");
  c8.style("right", "312px");
  c8.style("z-index", "50");
  pixelDensity(2);

  // background("#243e4f");
  background(255);
  background("#2A8257");
  frameRate(20);
walker = new Walker();
walker = new Walker();
  
}




function draw() {
  
  
  strSize = height / 15;
  textSize(strSize);
  textFont(font);
  
  translate(0, 50);

  if(frameCount > 20){
    walker.step();
  walker.show();

  if(frameCount %30 == 0){
    walker = new Walker();
  }
  }
  
  
}

function mouseDragged() {
  
  
  fill('#cce7eb');
  stroke("#3F99D9");
  fill("#3F99D9");
  text(string[pressCount], mouseX, mouseY);
  
  if(pressCount == string.length - 1){
    pressCount = 0;
  } else {
    pressCount++;
  }
}



class Walker {
  constructor(){
    this.x = random(width);
    this.y = height/4 + randomGaussian(0, height/2);
  }
  
  show(){
    // stroke(0);
    fill("#3F99D9");
    text(string[walkerCount], this.x, this.y);
  }

  step(){
    let xstep = random(-5,5);
    let randomMax = 30; 
    if(random() < 0.2){
      randomMax = 70; 
    } else if (random() > 0.8){
      randomMax = 10; 
    }
    if(random()<0.2){
      randomMax += 20; 
    }
    let ystep = random(0,randomMax);
    this.x += xstep;
    this.y += ystep;
    
    if(walkerCount == string.length - 1){
    walkerCount = 0;
  } else {
    walkerCount++;
  }
  }
}