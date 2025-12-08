document.fonts.ready.then(() => {
  gsap.registerPlugin(SplitText);


  let title = SplitText.create(".index-h1", {
    type: "words",
    charsClass: "words",
  });

  

  gsap.from(title.words, {
    y: 10,
    autoAlpha: 0,
    stagger: 0.1,
  });

  let anchors = document.querySelectorAll("nav a");
  let activeAnchor = document.querySelector(".active");

  gsap.from(activeAnchor, {
    y: -10,
    autoAlpha: 0,
    duration: 0.3,
  });

  anchors.forEach((anchor) => {
    anchor.addEventListener("mouseenter", () => {
      gsap.from(anchor, {
        y: 10,
        autoAlpha: 0,
        duration: 0.3,
      });
    });

    anchor.addEventListener("mouseleave", () => {
      gsap.to(anchor, {
        y: 0,
        autoAlpha: 1,
        duration: 0.3,
      });
    });
  });

  

  let titleH1 = document.querySelector("h1");

  let titleH1Text = SplitText.create(titleH1, {
    type: "words",
    charsClass: "words",
  });
  titleH1.addEventListener("mouseenter", () => {
    gsap.from(titleH1Text.words, {
      y: 5,
      autoAlpha: 0.5,
      duration: 0.3,
    });
  });

  titleH1.addEventListener("mouseleave", () => {
    gsap.to(titleH1Text.words, {
      y: 0,
      autoAlpha: 1,
      duration: 0.3,
    });
  });
});
