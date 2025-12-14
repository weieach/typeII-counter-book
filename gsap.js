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

  let navbar = document.querySelector("header");

  navbar.innerHTML = `<div>
      <h1>
        <a href="index.html" class="index-h1">
          <i>Superfast!</i> Our Fatigued Body and Society</a>
      </h1>
      <p class="tooltip mobile-alert "><i class="ph-fill ph-laptop"></i>For the full interactive experience, please switch to a desktop screen.</p>
      <img src="assets/cover.png" class="static-thumbnail" alt="cover-static-thumbnail">
      <nav>
        ${Array.from(
          { length: 15 },
          (_, i) => `<a href="sp${i + 1}.html">${i + 1}</a>`
        ).join("")}
      </nav>
    </div>`;

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

  // get current file name (e.g. "sp3.html")

  let currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Handle index.html
  if (currentPage === "index.html") {
    document.querySelector(".index-h1")?.classList.add("active");
  }

  // extract number from "spX.html"
  let match = currentPage?.match(/^sp(\d+)\.html$/);
  let currentSpreadNum = Number.parseInt(match ? match[1] : null, 10);

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      anchor.setAttribute("href", "sp" + anchor.textContent + ".html");
      currentSpreadNum = anchor.textContent;
      // console.log(anchor.innerHTML);
    });

    if (anchor.textContent == currentSpreadNum) {
      anchor.classList.add("active");
    }
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

  let handles = document.querySelectorAll(".handle");
  let rightHandle = document.querySelector(".right-handle");
  let leftHandle = document.querySelector(".left-handle");

  handles.forEach((handle) => {
    handle.addEventListener("mouseenter", () => {
      gsap.to(handle, {
        scale: 1.4,
        duration: 0.3,
        color: "#FFD700",
        ease: "power1.inOut",
      });
    });

    handle.addEventListener("mouseleave", () => {
      gsap.to(handle, {
        scale: 1,
        color: "#F1F8FF",
        duration: 0.3,
      });
    });
  });

  let nextSpreadNum = Number.parseInt(currentSpreadNum + 1, 10);

  rightHandle.addEventListener("click", () => {
    if (currentPage === "index.html") {
      nextSpreadNum = 1;
    } else {
      nextSpreadNum = Number.parseInt(currentSpreadNum + 1, 10);
    }
    rightHandle.setAttribute("href", "sp" + nextSpreadNum + ".html");
  });

  leftHandle.addEventListener("click", () => {
    if (currentPage === "index.html") {
      nextSpreadNum = 1;
    } else {
      nextSpreadNum = Number.parseInt(currentSpreadNum - 1, 10);
    }
    leftHandle.setAttribute("href", "sp" + nextSpreadNum + ".html");
  });


});
