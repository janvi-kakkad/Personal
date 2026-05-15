/**
 * Main Application
 * Orchestrates loading sequence, scroll animations,
 * and parallax effects.
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ══════════════════════════════════════
     LOADING SCREEN SEQUENCE
     ══════════════════════════════════════ */
  var loadingScreen = document.getElementById("loadingScreen");
  var loadingTitle = document.getElementById("loadingTitle");
  var loadingBar = document.getElementById("loadingBar");
  var loadingReady = document.getElementById("loadingReady");
  var steps = document.querySelectorAll(".loading-step");

  var TITLE_TEXT =
    "Initializing Bhundeshwar's Birthday Protocol...";
  var charIndex = 0;

  /**
   * Typewriter effect for the loading title.
   * Reveals one character at a time.
   */
  function typeTitle() {
    if (charIndex < TITLE_TEXT.length) {
      loadingTitle.textContent += TITLE_TEXT[charIndex];
      charIndex++;
      setTimeout(typeTitle, 40);
    } else {
      startLoadingSteps();
    }
  }

  /**
   * Sequentially reveals each loading step with
   * a progress bar animation.
   */
  function startLoadingSteps() {
    var stepIndex = 0;
    var totalSteps = steps.length;

    function showNextStep() {
      if (stepIndex >= totalSteps) {
        finishLoading();
        return;
      }

      var step = steps[stepIndex];
      step.classList.add("active");

      var progress = ((stepIndex + 1) / totalSteps) * 100;
      loadingBar.style.width = progress + "%";

      setTimeout(function () {
        step.classList.add("done");
        stepIndex++;
        setTimeout(showNextStep, 300);
      }, 600);
    }

    setTimeout(showNextStep, 500);
  }

  /**
   * Shows the "Ready" text and dismisses the loading screen
   * after a brief pause.
   */
  function finishLoading() {
    loadingReady.classList.add("show");

    setTimeout(function () {
      loadingScreen.classList.add("hidden");
      document.body.style.overflow = "auto";
    }, 1200);
  }

  /* Prevent scrolling during loading */
  document.body.style.overflow = "hidden";
  setTimeout(typeTitle, 800);

  /* ══════════════════════════════════════
     SCROLL-TRIGGERED REVEAL ANIMATIONS
     ══════════════════════════════════════ */

  /**
   * IntersectionObserver callback that adds 'visible' class
   * when an element enters the viewport.
   */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  /* Observe all revealable elements */
  var revealSelectors = [
    ".reveal",
    ".reveal-left",
    ".reveal-right",
    ".reveal-scale",
    ".stagger-children",
  ];

  revealSelectors.forEach(function (selector) {
    document
      .querySelectorAll(selector)
      .forEach(function (el) {
        revealObserver.observe(el);
      });
  });

  /* ══════════════════════════════════════
     PARALLAX ON HERO SECTION
     ══════════════════════════════════════ */
  var heroContent = document.querySelector(".hero-content");

  window.addEventListener("scroll", function () {
    if (!heroContent) return;
    var scrollY = window.scrollY;
    var heroHeight = window.innerHeight;

    if (scrollY < heroHeight) {
      var parallaxOffset = scrollY * 0.3;
      var opacity = 1 - scrollY / heroHeight;
      heroContent.style.transform =
        "translateY(" + parallaxOffset + "px)";
      heroContent.style.opacity = Math.max(opacity, 0);
    }
  });

  /* ══════════════════════════════════════
     SMOOTH SCROLL FOR INTERNAL LINKS
     ══════════════════════════════════════ */
  document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.querySelector(
          this.getAttribute("href")
        );
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
});
