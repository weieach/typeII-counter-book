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


let wrapper4;
const aspect = 1100 / 893;


function setup() {
  wrapper4 = document.getElementById("canvasWrapper4");
  
  let w = wrapper4.offsetWidth;
  let h = w/aspect;

  let c4 = createCanvas(w, h).parent(wrapper4);
  resizeToWrapper();

  c4.style("position", "absolute");
  c4.style("z-index", "0");
  pixelDensity(2);

textFont(font);

}

function draw() {
  scaleFactor = width*0.016;
      
  noStroke();
  background(255);

  
  //
  textAlign(CENTER);
   stringIndex = 0;

  let radius = width/6;
  let minSize = scaleFactor ;
  let maxSize = scaleFactor*1.8;

  for (let y = 0; y < width*0.09; y+= width*0.001) {
    // y+=1.2
    for (let x = 0; x < width*0.04; x+=width*0.001) {
      
      fill(lerpColor(fromCol, toCol, noise(colorIndex)));
      let px = x * (scaleFactor / 1.2);
      let py = y * (scaleFactor / 1.2);

      let d = dist(mouseX, mouseY, px, py);

      let textScale = minSize * pow(noise(x, y), 0.5)*1.5;
      if (d < radius) {
        textScale = map(d, 0, radius, maxSize, minSize * pow(noise(x, y), 0.5)*1.5);
      }
      textSize(textScale);
      text(string[stringIndex], x *(scaleFactor/1.2), y * scaleFactor/1.2);
      stringIndex++;
      if(stringIndex == string.length){
        stringIndex = 0;
      }
      colorIndex++;
    }
  }
}


function windowResized() {
  resizeToWrapper();
}

function resizeToWrapper() {
  if (!wrapper4) return;

  let w = wrapper4.offsetWidth;
  let h = w / aspect ;

  // let h = wrapper4.offsetHeight;
  // let w = h / aspect;


  resizeCanvas(w, h);
}