let video;
let x = 0;

function setup(){
    createCanvas(800, 400);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(320, 240);
}

function draw(){
    video.loadPixels();
    // background(51);
    // image(video, 0, 0, width, height);

    let w = video.width;
    let h = video.height;
    copy(video, w/2, 0, 1, h, x, 0, 1, h);
    x = x + 1;
    if(x == width){
        x = 0;
    }
}