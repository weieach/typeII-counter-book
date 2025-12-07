let string1 = "Get some rest!";
let string2 = "GO ON!";
let stackHeadline;
let stackText;
let string1Color = '#6598b6';
// let string2Color = '#E06244';

let string2Color = '#DDD827';
let c3 = '#243e4f';
let font;

let count = 3;
let increaseRate = 0.05;

function preload(){
  font = loadFont("assets/PPNeueBit-Bold.ttf");
  stackText = loadFont("assets/StackSansText-VariableFont_wght.ttf");
}

function setup() {
  let c7 = createCanvas(1100, 893);
  c7.parent("canvasWrapper7");
  c7.style("position", "absolute");
  c7.style("z-index", "50");
  c7.style("font-weight", "700");

  
  frameRate(24);
}

function draw() {
  background(255);
  textFont(font);
  // textSize(width/45);
  textSize(width/80);
  fill(string1Color);
  
  print(count)
  count+= increaseRate;
  count = round(count * 100)/100;
  if(count == 12 || count == 3){
     increaseRate *= -1;
  }
  for(let i = 0; i < 100; i++){
    let posX = map(sin(count*0.02*i), -1, 1, 0, width);
    
    push();
    // translate(posX, i*height/50)
    translate(posX, i*height/95)
    text(string1, 0, 0);
    let bbox = font.textBounds(string1, 50, 50);
    // fill('red')
    // rect(0, 0, bbox.w, bbox.h)
    pop();
  }
  noStroke()
  
  fill(string2Color);
  let bbox = font.textBounds(string2, 0, 0);
  for(let i = 0; i < 100; i++){
    
    let posX = map(sin(count*0.02*i), -1, 1, 0, width/2);
    // rect(-posX+width/2, i*height/54, bbox.w, bbox.w);
    push();
    // stroke("#8bbbd6")
    strokeWeight(1);
    
    translate(-posX+width/2, i*height/95)
    if(i == 10 || i == 11 || i == 12 || i == 13){
      textFont("stackText700");
      textSize(width/80);
      translate(0, height/200 * (i-9));
      
      fill("#308CCB")
    }
    
    if(i == 70 || i == 71 || i == 72 || i == 73){
      textFont("stackText700");
      textSize(width/80);
      translate(0, height/200 * (i-69));
      
      fill("#308CCB")
    }
    
    if(i == 10){
       text("All hail King Neptune and his", 0, 0);
    } 
    else if(i == 11){
      text("water breathers", 0, 0);
    }else if(i == 12){
      text("No snail thing too quick", 0, 0);
    }else if(i == 13){
      text("for his water feeders", 0, 0);
     }else if(i == 14 || i == 15){
    } else if(i == 70){
       text("Don't waste time with your net", 0, 0);
    } 
    else if(i == 71){
      text("Our net worth is set, ", 0, 0);
    }else if(i == 72){
      text("ready, go, many know", 0, 0);
    }else if(i == 73){
      text("others, what?", 0, 0);
      }else if(i == 74 || i == 75){
    }else {
          fill(string2Color)
    // translate(-posX+width/2, i*height/50)
    
    text(string2, 0, 0);
    }
    

    pop();
  }
  // captureOnFrame(12);
  // captureOnFrame(7);
}


