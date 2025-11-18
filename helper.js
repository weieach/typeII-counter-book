function keyPressed(){
  if(key === 's' || key === 'S'){
    save('mySketch'+frameCount+'.png');
    console.log("saved");
    //dont use caps lock
  }
}

function captureOnFrame(frameNum){
  if(frameCount == frameNum){
    save('sketchOnFrame'+frameNum+'.png');
  }
}