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
      <nav>
        ${Array.from(
          { length: 15 },
          (_, i) => `<a href="sp${i + 1}.html">${i + 1}</a>`
        ).join("")}
        <span class="page-steps">
          <a class="page-step page-step-prev" aria-label="Previous spread"><span class="pixel-tri pixel-tri-left"></span></a>
          <a class="page-step page-step-next" aria-label="Next spread"><span class="pixel-tri pixel-tri-right"></span></a>
        </span>
      </nav>
    </div>`;

  let anchors = document.querySelectorAll("nav a:not(.page-step)");
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

  let logo = document.querySelector("header h1");
  let tip = document.querySelector(".tooltip");
  let brand = null;

  if (logo && tip) {
    brand = document.createElement("div");
    brand.className = "brand-row";
    logo.parentElement.insertBefore(brand, logo);
    brand.append(logo, tip);
  }

  function placeTip() {
    if (!tip || !brand) return;
    let nav = document.querySelector("nav");
    let panel = document.querySelector(".main-panel");

    if (tip.parentElement !== brand) brand.append(tip);
    tip.classList.remove("tooltip-above-book");

    let twoRows = false;
    if (nav) {
      let brandBox = brand.getBoundingClientRect();
      let navBox = nav.getBoundingClientRect();
      twoRows = navBox.top > brandBox.bottom - 2;
    }

    if (twoRows && panel) {
      panel.append(tip);
      tip.classList.add("tooltip-above-book");
    }
  }

  placeTip();
  window.addEventListener("resize", placeTip);

  let toolTips = document.querySelectorAll(".tooltip");

  toolTips.forEach((toolTip) => {
    toolTip.addEventListener("click", () => {
      document.querySelector(".tooltip p").style.display = "none";
      toolTip.style.width = "fit-content";
    })
  })

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

  let isCover = currentPage === "index.html";
  let prevStep = document.querySelector(".page-step-prev");
  let nextStep = document.querySelector(".page-step-next");
  let mainEl = document.querySelector("main");
  let panel = document.querySelector(".main-panel");
  let edgePrev = null;
  let edgeNext = null;

  if (mainEl && panel) {
    let turnHintKey = "superfast-edge-turn";
    let showTurnHint = true;
    try {
      showTurnHint = localStorage.getItem(turnHintKey) !== "1";
    } catch (e) {
      showTurnHint = true;
    }

    function edgeMarkup(direction) {
      return `<span class="edge-cue"><span class="edge-mark"><span class="pixel-tri pixel-tri-${direction}"></span></span></span>`;
    }

    function syncEdgeHint(edge, book) {
      if (!showTurnHint) return;
      let mark = edge.querySelector(".edge-mark");
      if (!mark) return;
      let hint = mark.querySelector(".edge-hint");
      if (!hint) {
        hint = document.createElement("span");
        hint.className = "edge-hint";
        hint.textContent = edge.dataset.hint || "";
        mark.append(hint);
      }
      let box = hint.getBoundingClientRect();
      let gap = 8;
      let clearOfBook = edge.classList.contains("edge-turn-next")
        ? box.left >= book.right + gap
        : box.right <= book.left - gap;
      let onScreen = box.left >= gap && box.right <= window.innerWidth - gap && box.width > 8;
      if (clearOfBook && onScreen) hint.classList.add("is-shown");
      else hint.remove();
    }

    function markTurnUsed(event) {
      if (event.currentTarget.classList.contains("is-disabled")) return;
      try {
        localStorage.setItem(turnHintKey, "1");
      } catch (e) {}
    }

    edgePrev = document.createElement("a");
    edgePrev.className = "edge-turn edge-turn-prev";
    edgePrev.setAttribute("aria-label", "Previous spread");
    edgePrev.innerHTML = edgeMarkup("left");
    edgePrev.dataset.hint = "Go to prev page";
    edgeNext = document.createElement("a");
    edgeNext.className = "edge-turn edge-turn-next";
    edgeNext.setAttribute("aria-label", "Next spread");
    edgeNext.innerHTML = edgeMarkup("right");
    edgeNext.dataset.hint = "Go to next page";
    edgePrev.addEventListener("click", markTurnUsed);
    edgeNext.addEventListener("click", markTurnUsed);
    mainEl.append(edgePrev, edgeNext);

    function placeEdges() {
      let mainBox = mainEl.getBoundingClientRect();
      let book = panel.getBoundingClientRect();
      let top = book.top - mainBox.top;
      let prevW = Math.max(0, book.left - mainBox.left);
      let nextW = Math.max(0, mainBox.right - book.right);
      edgePrev.style.top = top + "px";
      edgeNext.style.top = top + "px";
      edgePrev.style.height = book.height + "px";
      edgeNext.style.height = book.height + "px";
      edgePrev.style.width = prevW + "px";
      edgeNext.style.width = nextW + "px";
      syncEdgeHint(edgePrev, book);
      syncEdgeHint(edgeNext, book);
    }

    placeEdges();
    window.addEventListener("resize", placeEdges);
    if (window.ResizeObserver) {
      let edgesObserver = new ResizeObserver(placeEdges);
      edgesObserver.observe(panel);
      edgesObserver.observe(mainEl);
    }
  }

  function setStep(el, href) {
    if (!el) return;
    if (href) {
      el.href = href;
      el.classList.remove("is-disabled");
      el.removeAttribute("aria-disabled");
    } else {
      el.removeAttribute("href");
      el.classList.add("is-disabled");
      el.setAttribute("aria-disabled", "true");
    }
  }

  let prevHref = null;
  let nextHref = null;

  if (isCover) {
    nextHref = "sp1.html";
  } else if (currentSpreadNum >= 1 && currentSpreadNum <= 15) {
    prevHref = currentSpreadNum === 1 ? "index.html" : "sp" + (currentSpreadNum - 1) + ".html";
    nextHref = currentSpreadNum < 15 ? "sp" + (currentSpreadNum + 1) + ".html" : null;
  }

  setStep(prevStep, prevHref);
  setStep(nextStep, nextHref);
  setStep(edgePrev, prevHref);
  setStep(edgeNext, nextHref);

  if (nextHref) {
    let prefetch = document.createElement("link");
    prefetch.rel = "prefetch";
    prefetch.href = nextHref;
    document.head.append(prefetch);
  }
});
