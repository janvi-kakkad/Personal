/**
 * Interactions Module
 * Cursor glow, confetti, toast notifications,
 * stars generation, and easter eggs.
 */

/* ══════════════════════════════════════════
   CURSOR GLOW
   ══════════════════════════════════════════ */
(function initCursorGlow() {
  "use strict";
  var glow = document.getElementById("cursorGlow");
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
  var existing = document.querySelector(".toast");
  if (existing) existing.remove();

  var toast = document.createElement("div");
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
   EASTER EGGS
   ══════════════════════════════════════════ */
(function initEasterEggs() {
  "use strict";

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
          "You really do love clicking your name, huh? 😂",
          3000
        );
        nameClickCount = 0;
      }
    });
  }
})();

/* ══════════════════════════════════════════
   GENERATE STARS FOR FINALE
   ══════════════════════════════════════════ */
(function generateFinaleStars() {
  "use strict";
  var container = document.getElementById("finaleStars");
  if (!container) return;

  var STAR_COUNT = 120;

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
    var size = (Math.random() * 3 + 1) + "px";
    star.style.width = size;
    star.style.height = size;
    container.appendChild(star);
  }
})();
