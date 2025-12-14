let font;
let points;
let sampleFactorIncrease = 0.5;
let noiseIndex = 0;
let strings;
let bbox = 0;
let sourceSize = 80;
let img;
let string = "superfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfast";
let stringIndex = 0;

let scaleFactor = 18;

let fromCol = "#E0DC29";
let toCol = "#8cbcd6";
let colorIndex = 0;


function preload() {
  font = loadFont("assets/PPNeueBit-Bold.ttf");
  // font = loadFont("StackSansText-VariableFont_wght.ttf");

}

let wrapper10;
const aspect = 1100 / 893;


function setup() {
  wrapper10 = document.getElementById("canvasWrapper10");
  let w = wrapper10.offsetWidth;
  let h = w / aspect;

  let c10 = createCanvas(w, h).parent(wrapper10);
  resizeToWrapper();
  c10.style("position", "absolute");
  c10.style("z-index", "0");
  pixelDensity(1);
  scaleFactor = width*0.016;

textFont(font);

}

function draw() {
      
  noStroke();
  background(255);

  
  //
  textAlign(CENTER);
   stringIndex = 0;
     angleMode(DEGREES)
   
   
  for (let y = 0; y < 100; y+=1.2) {
    push();
    translate(sin(frameCount*0.5) * width, 0);
    for (let x = 0; x < 50; x+=1.2) {
      
      fill(lerpColor(fromCol, toCol, noise(colorIndex)));
      textSize(scaleFactor);
      
      text(string[stringIndex], x *(scaleFactor/1.2), y * scaleFactor/1.2);
      stringIndex++;
      if(stringIndex == string.length){
        stringIndex = 0;
      }
      colorIndex++;
    }
    pop();
  }
}


function windowResized() {
  resizeToWrapper();
}

function resizeToWrapper() {
  if (!wrapper10) return;

  let w = wrapper10.offsetWidth;
  let h = w / aspect;

  resizeCanvas(w, h);
}