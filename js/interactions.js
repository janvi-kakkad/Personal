/**
 * Interactions Module
 * Easter eggs, Open-When cards, cursor glow, confetti,
 * toasts, counter animations, and keyboard shortcuts.
 */

/* ══════════════════════════════════════════
   CURSOR GLOW
   ══════════════════════════════════════════ */
(function initCursorGlow() {
  "use strict";
  const glow = document.getElementById("cursorGlow");
  if (!glow || window.innerWidth < 768) return;

  document.addEventListener("mousemove", function (e) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
})();

/* ══════════════════════════════════════════
   TOAST NOTIFICATIONS
   ══════════════════════════════════════════ */

/**
 * Displays a temporary toast notification.
 * @param {string} emoji - Emoji to show.
 * @param {string} message - Toast message text.
 * @param {number} duration - How long to show (ms).
 */
function showToast(emoji, message, duration) {
  duration = duration || 3000;
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML =
    '<span class="toast-emoji">' +
    emoji +
    "</span> " +
    message;
  document.body.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("hide");
    setTimeout(function () {
      toast.remove();
    }, 400);
  }, duration);
}

/* ══════════════════════════════════════════
   CONFETTI EXPLOSION
   ══════════════════════════════════════════ */

/**
 * Creates a burst of confetti pieces from a position.
 * @param {number} originX - X coordinate origin.
 * @param {number} originY - Y coordinate origin.
 */
function spawnConfetti(originX, originY) {
  var CONFETTI_COLORS = [
    "#a8e6cf",
    "#ffe4a0",
    "#ffb7b2",
    "#c3b1e1",
    "#f8a5c2",
    "#55efc4",
  ];
  var PIECE_COUNT = 40;

  for (var i = 0; i < PIECE_COUNT; i++) {
    var piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = originX + "px";
    piece.style.top = originY + "px";
    piece.style.background =
      CONFETTI_COLORS[
        Math.floor(Math.random() * CONFETTI_COLORS.length)
      ];
    piece.style.width = Math.random() * 8 + 4 + "px";
    piece.style.height = Math.random() * 8 + 4 + "px";
    piece.style.borderRadius =
      Math.random() > 0.5 ? "50%" : "2px";

    var angle = (Math.PI * 2 * i) / PIECE_COUNT;
    var velocity = Math.random() * 300 + 150;
    var targetX = Math.cos(angle) * velocity;
    var targetY = Math.sin(angle) * velocity - 200;

    piece.style.transition =
      "transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)," +
      " opacity 1.5s ease";
    document.body.appendChild(piece);

    requestAnimationFrame(function (p, tx, ty) {
      return function () {
        p.style.transform =
          "translate(" + tx + "px, " + ty + "px) rotate(720deg)";
        p.style.opacity = "0";
      };
    }(piece, targetX, targetY));

    setTimeout(
      function (p) {
        return function () {
          p.remove();
        };
      }(piece),
      1600
    );
  }
}

/* ══════════════════════════════════════════
   OPEN-WHEN CARDS
   ══════════════════════════════════════════ */
(function initOpenWhenCards() {
  "use strict";
  var cards = document.querySelectorAll(".open-when-card");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      var wasOpen = card.classList.contains("open");

      /* Close all cards first */
      cards.forEach(function (c) {
        c.classList.remove("open");
        var hint = c.querySelector(".open-when-hint");
        if (hint) hint.textContent = "[ click to open ]";
      });

      /* Toggle the clicked card */
      if (!wasOpen) {
        card.classList.add("open");
        var hint = card.querySelector(".open-when-hint");
        if (hint) hint.textContent = "[ click to close ]";
      }
    });
  });
})();

/* ══════════════════════════════════════════
   ANIMATED COUNTERS
   ══════════════════════════════════════════ */

/**
 * Animates a number from 0 to target over a given duration.
 * @param {HTMLElement} element - Element to update.
 * @param {number} target - Target number to count to.
 * @param {number} duration - Animation duration in ms.
 */
function animateCounter(element, target, duration) {
  duration = duration || 2000;
  var start = 0;
  var startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min(
      (timestamp - startTime) / duration,
      1
    );

    /* Ease out cubic for smooth deceleration */
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.floor(eased * target);
    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(step);
}

/* ══════════════════════════════════════════
   EASTER EGGS
   ══════════════════════════════════════════ */
(function initEasterEggs() {
  "use strict";

  /* ── Konami Code ── */
  var KONAMI = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ];
  var konamiIndex = 0;

  document.addEventListener("keydown", function (e) {
    if (e.key === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        showToast(
          "🏆",
          "Achievement Unlocked: Bhundeshwar Secret Mode!",
          4000
        );
        spawnConfetti(window.innerWidth / 2, window.innerHeight / 2);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  /* ── Press 'R' for Rupli ── */
  document.addEventListener("keydown", function (e) {
    if (e.key === "r" || e.key === "R") {
      if (
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
      ) {
        showToast(
          "👸",
          "Rupli mari queen che!",
          3000
        );
      }
    }
  });

  /* ── Click on hero name for confetti ── */
  var heroName = document.getElementById("heroName");
  if (heroName) {
    var nameClickCount = 0;
    heroName.style.cursor = "pointer";
    heroName.addEventListener("click", function (e) {
      nameClickCount++;
      spawnConfetti(e.clientX, e.clientY);

      if (nameClickCount === 3) {
        showToast(
          "💚",
          "You really do love clicking his name, huh? 😂",
          3000
        );
        nameClickCount = 0;
      }
    });
  }

  /* ── Nickname pill clicks ── */
  var pills = document.querySelectorAll(".nickname-pill");
  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      showToast(
        "😂",
        "'" + pill.textContent + "' — a masterpiece of naming.",
        2500
      );
    });
  });
})();

/* ══════════════════════════════════════════
   GENERATE STARS FOR FINALE
   ══════════════════════════════════════════ */
(function generateFinaleStars() {
  "use strict";
  var container = document.getElementById("finaleStars");
  if (!container) return;

  var STAR_COUNT = 100;

  for (var i = 0; i < STAR_COUNT; i++) {
    var star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty(
      "--duration",
      (Math.random() * 4 + 2) + "s"
    );
    star.style.setProperty(
      "--delay",
      (Math.random() * 5) + "s"
    );
    star.style.width = (Math.random() * 3 + 1) + "px";
    star.style.height = star.style.width;
    container.appendChild(star);
  }
})();

/* ══════════════════════════════════════════
   AUDIO CONTROLLER
   ══════════════════════════════════════════ */
(function initAudioController() {
  "use strict";
  var toggle = document.getElementById("audioToggle");
  var audio = document.getElementById("bgMusic");
  if (!toggle || !audio) return;

  var isPlaying = false;

  toggle.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
      toggle.classList.remove("playing");
    } else {
      audio.play().catch(function () {
        showToast(
          "🎵",
          "Add a music file to assets/music.mp3 to enable music!",
          3000
        );
      });
      toggle.classList.add("playing");
    }
    isPlaying = !isPlaying;
  });
})();
