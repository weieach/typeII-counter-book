let particles = [];

let video;
let vScale = 16;

let slider;

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.r = random(4, 32);
    }

    update(){
        this.x += random(-10, 10);
        this.y += random(-10, 10);

        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);

    }

    show(){
        noStroke();
        let px = Math.floor(this.x / vScale);
        let py = Math.floor(this.y / vScale);
        let clr = video.get(px, py);
        fill(clr[0], clr[1], clr[2], slider.value());
        textSize(this.r);
        // circle(this.x, this.y, 24);
        text("a",this.x, this.y );
    }
}

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  background(51);
  video.hide();
  slider = createSlider(0, 255, 127);
  for(let i = 0; i < 100; i++){
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
//   image(video, 0, 0, width, height);
  video.loadPixels();
    for(let i = 0; i < particles.length; i++){
        
        particles[i].update();
        particles[i].show();
    }
}


