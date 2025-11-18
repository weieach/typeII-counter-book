// //dropdown
// let goOnSketch = function (p) {
//   p.setup = function () {
//     let c = p.createCanvas(617, 500);
//     c.parent("canvasWrapper1");
//   };
//   p.draw = function () {
//     p.background(0);
//     // p.text(dropdown.val(), width/2, height/2);
//   };
// };

// new p5(goOnSketch);


function setup(){
}


function draw(){
    drawingContext.font = `700 13px stackHeadline`;

}

let goOnSketch = function (p) {
  // moved all your globals inside the instance
  let string1 = "Go on!";
  let string2 = "Get some rest!";
  let stackHeadline;
  let stackText;
  let string1Color = '#FF0000';
  let string2Color = '#2196F3';

  p.preload = function () {
    // make sure the font files are in the same folder as this JS
    stackHeadline = p.loadFont('assets/StackSansHeadline-VariableFont_wght.ttf');
    stackText = p.loadFont('assets/StackSansText-VariableFont_wght.ttf');
  };

  p.setup = function () {
      const parent = document.getElementById("canvasWrapper1");

    let w = parent.clientWidth;
    let h = parent.clientHeight;
    let c = p.createCanvas(w, h);
    c.parent("canvasWrapper1");
    p.frameRate(10);
  };

  p.draw = function () {
    p.background(245);

    // FIRST STRING
    p.fill(string1Color);
    p.textFont(stackHeadline);
    p.textSize(13); 
    p.textAlign(p.LEFT, p.TOP);

    for (let i = 0; i < 50; i++) {
      let posX = p.map(p.sin(p.frameCount * 0.02 * i), -1, 1, 0, p.width);

      p.push();
      p.translate(posX, (i * p.height) / 50);
      p.text(string1, 0, 0);
      p.pop();
    }

    // SECOND STRING
    p.fill(string2Color);
    for (let i = 0; i < 50; i++) {
      let posX = p.map(p.sin(p.frameCount * 0.02 * i), -1, 1, 0, p.width / 2);

      p.push();
      p.translate(-posX + p.width / 2, (i * p.height) / 50);
      p.text(string2, 0, 0);
      p.pop();
    }
  };

  
};

// create the instance
new p5(goOnSketch);
