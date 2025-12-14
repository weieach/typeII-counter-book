let video;
// let scaleFactor = 16;

let stringText = "superfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfastsuperfast"

let font;
let points;
let sampleFactorIncrease = 0.5;
let noiseIndex = 0;
let strings;
let bbox = 0;
let sourceSize = 80;
let img;
let string = "superfast";
let stringIndex = 0;

let scaleFactor = 20;

let fromCol = "#E0DC29";
// let toCol = "#8070E9";
let toCol = "#8cbcd6";
let colorIndex = 0;

function preload(){
    font = loadFont("assets/PPNeueBit-Bold.ttf");
}

// let canvasWrapper = document.getElementById("canvasWrapper1");

let wrapper1;
const aspect = 450 / 500;


function setup() {
  wrapper1 = document.getElementById("canvasWrapper1");
  
  let w = wrapper1.offsetWidth * 0.409;
  let h = w/aspect;

  let c1 = createCanvas(w, h).parent(wrapper1);
  resizeToWrapper();


  // let c1 = createCanvas(450, 500);

  c1.style("position", "absolute");
  c1.style("left", "40vw");
  c1.style("top", "22vh");
	pixelDensity(2);
  textFont(font);
	video = createCapture(VIDEO);
	video.size(width/scaleFactor, height/scaleFactor);}
  

function draw() {
  background(255);
  stringIndex = 0;
  video.loadPixels();
  loadPixels();
  for(let y = 0; y < video.height; y++){
    for(let x = 0; x < video.width; x++){
      let index = (x + y * video.width)*4;
      let r = video.pixels[index+0];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];
      
      let bright = (r + g + b) / 3;
      let w = map(bright, 0, 255, scaleFactor/2, scaleFactor*1.6);

      
      fill(lerpColor(fromCol, toCol, noise(colorIndex)));
      textSize(w);
      text(stringText[stringIndex], x *(scaleFactor/1.2), y * scaleFactor/1.2);
      stringIndex++;
      if(stringIndex == string.length){
        stringIndex = 0;
      }
      colorIndex++;
    }
  }
  video.hide();
  // updatePixels();
}


function windowResized() {
  resizeToWrapper();
}

function resizeToWrapper() {
  if (!wrapper1) return;

  let w = wrapper1.offsetWidth * 0.409;
  let h = w / aspect ;

  // let h = wrapper4.offsetHeight;
  // let w = h / aspect;


  resizeCanvas(w, h);
}