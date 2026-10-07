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

(function revealSpreadTogether() {
  const panel = document.querySelector(".main-panel");
  if (!panel || !panel.classList.contains("spread-pending")) return;

  const layers = panel.querySelectorAll(".canvas, img");
  if (!layers.length) return;

  let revealed = false;
  function reveal() {
    if (revealed) return;
    revealed = true;
    panel.classList.remove("spread-pending");
    panel.classList.add("spread-ready");
  }

  const waits = [];

  panel.querySelectorAll("img").forEach((img) => {
    if (img.complete && img.naturalWidth) return;
    const decode = img.decode ? img.decode() : Promise.resolve();
    waits.push(decode.catch(() => {}));
  });

  panel.querySelectorAll("video").forEach((video) => {
    if (video.readyState >= 2) return;
    waits.push(
      new Promise((resolve) => {
        video.addEventListener("loadeddata", resolve, { once: true });
        video.addEventListener("error", resolve, { once: true });
      })
    );
  });

  const hasSketch = [...document.scripts].some((script) =>
    /^\d+-/.test(script.getAttribute("src") || "")
  );
  const holder = panel.querySelector(".canvas");

  if (hasSketch && holder && !holder.querySelector("canvas")) {
    waits.push(
      new Promise((resolve) => {
        const finish = () => {
          requestAnimationFrame(() => requestAnimationFrame(resolve));
        };
        const observer = new MutationObserver(() => {
          if (holder.querySelector("canvas")) {
            observer.disconnect();
            finish();
          }
        });
        observer.observe(holder, { childList: true, subtree: true });
      })
    );
  }

  Promise.all(waits).then(reveal);
  setTimeout(reveal, 5000);
})();



