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

function setup() {
  let c4 = createCanvas(622, 893);
  c4.parent(canvasWrapper4);
  c4.style("position", "absolute");
  c4.style("z-index", "0");
  pixelDensity(1);

textFont(font);

}

function draw() {
      
  noStroke();
  background(255);

  
  //
  textAlign(CENTER);
   stringIndex = 0;

  let radius = width/6;
  let minSize = scaleFactor / 1.2;
  let maxSize = scaleFactor*1.6;

  for (let y = 0; y < 100; y+=1.2) {
    for (let x = 0; x < 50; x+=1.2) {
      
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
