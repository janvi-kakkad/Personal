/**
 * Particle System
 * Ambient floating particles with pastel colors
 * Performance-optimized with requestAnimationFrame
 */

(function initParticleSystem() {
  "use strict";

  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const PARTICLE_COLORS = [
    "rgba(168, 230, 207, 0.4)",
    "rgba(255, 228, 160, 0.3)",
    "rgba(255, 183, 178, 0.25)",
    "rgba(195, 177, 225, 0.3)",
    "rgba(85, 239, 196, 0.2)",
  ];
  const MAX_PARTICLES = 60;
  const particles = [];
  let mouseX = -1000;
  let mouseY = -1000;
  let animationId;

  /**
   * Resizes canvas to match the viewport dimensions.
   */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /**
   * Creates a single particle with randomized properties.
   * @returns {Object} Particle object with position, velocity, and style.
   */
  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      velocityX: (Math.random() - 0.5) * 0.3,
      velocityY: -Math.random() * 0.4 - 0.1,
      radius: Math.random() * 2 + 0.5,
      color:
        PARTICLE_COLORS[
          Math.floor(Math.random() * PARTICLE_COLORS.length)
        ],
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    };
  }

  /**
   * Populates the particles array up to MAX_PARTICLES.
   */
  function initParticles() {
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(createParticle());
    }
  }

  /**
   * Updates each particle's position, applies mouse repulsion,
   * wraps particles when they leave the viewport, and pulsates
   * their opacity.
   * @param {number} time - Current timestamp from rAF.
   */
  function updateParticles(time) {
    const MOUSE_INFLUENCE_RADIUS = 120;

    for (const particle of particles) {
      /* Mouse repulsion effect */
      const distanceX = particle.x - mouseX;
      const distanceY = particle.y - mouseY;
      const distance = Math.sqrt(
        distanceX * distanceX + distanceY * distanceY
      );

      if (distance < MOUSE_INFLUENCE_RADIUS && distance > 0) {
        const force =
          (MOUSE_INFLUENCE_RADIUS - distance) /
          MOUSE_INFLUENCE_RADIUS;
        particle.x += (distanceX / distance) * force * 1.5;
        particle.y += (distanceY / distance) * force * 1.5;
      }

      /* Apply velocity */
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      /* Pulsating opacity */
      particle.opacity =
        0.3 +
        Math.sin(time * particle.pulseSpeed + particle.pulseOffset) *
          0.2;

      /* Wrap around viewport edges */
      if (particle.y < -10) {
        particle.y = canvas.height + 10;
        particle.x = Math.random() * canvas.width;
      }
      if (particle.x < -10) particle.x = canvas.width + 10;
      if (particle.x > canvas.width + 10) particle.x = -10;
    }
  }

  /**
   * Clears the canvas and redraws all particles.
   */
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
      ctx.beginPath();
      ctx.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  /**
   * Main animation loop — updates and draws every frame.
   * @param {number} time - Timestamp from requestAnimationFrame.
   */
  function animate(time) {
    updateParticles(time);
    drawParticles();
    animationId = requestAnimationFrame(animate);
  }

  /* ── Event Listeners ── */
  window.addEventListener("resize", resizeCanvas);

  document.addEventListener("mousemove", function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener("mouseleave", function handleMouseLeave() {
    mouseX = -1000;
    mouseY = -1000;
  });

  /* ── Initialize ── */
  resizeCanvas();
  initParticles();
  animate(0);
})();
