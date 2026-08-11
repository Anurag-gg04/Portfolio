document.documentElement.classList.add("js");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const boot = document.querySelector(".boot-screen");
const bootStatus = document.querySelector("#boot-status");
const bootMessages = [
  "LOADING ENCRYPTED MODULES...",
  "VERIFYING SECURITY PROFILE...",
  "ESTABLISHING SECURE CHANNEL...",
  "INTERFACE READY.",
];
bootMessages.forEach((message, index) =>
  window.setTimeout(
    () => (bootStatus.textContent = message),
    260 * (index + 1),
  ),
);
window.setTimeout(() => boot.classList.add("done"), reduceMotion ? 0 : 1420);

function updateClock() {
  document.querySelector("#clock").textContent = new Intl.DateTimeFormat(
    "en-GB",
    {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    },
  ).format(new Date());
}
updateClock();
window.setInterval(updateClock, 1000);

document.querySelectorAll(".project button").forEach((button) => {
  button.addEventListener("click", () => {
    const project = button.closest(".project");
    const isOpen = project.classList.contains("open");
    document.querySelectorAll(".project").forEach((item) => {
      item.classList.remove("open");
      item.querySelector("button").setAttribute("aria-expanded", "false");
      item.querySelector(".plus").textContent = "+";
    });
    if (!isOpen) {
      project.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      project.querySelector(".plus").textContent = "−";
    }
  });
});

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach(({ target, isIntersecting }) =>
      target.classList.toggle("is-visible", isIntersecting),
    ),
  { threshold: 0.14 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

document
  .querySelector("#copy-email")
  .addEventListener("click", async (event) => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText("tomaranurag724@gmail.com");
      button.innerHTML = "EMAIL COPIED — READY WHEN YOU ARE <span>↗</span>";
      window.setTimeout(
        () => (button.innerHTML = "TOMARANURAG724@GMAIL.COM <span>↗</span>"),
        1800,
      );
    } catch {
      window.location.href = "mailto:tomaranurag724@gmail.com";
    }
  });

if (reduceMotion)
  document
    .querySelectorAll(".reveal")
    .forEach((element) => element.classList.add("is-visible"));

const lines = [
  "scanning attack surface...",
  "checking secure build patterns...",
  "hashing credentials: SHA-256",
  "validating OWASP controls...",
  "monitoring system integrity...",
  "awaiting next build command...",
];
const terminalLine = document.querySelector("#terminal-line");
let command = 0;
function typeCommand() {
  const text = lines[command++ % lines.length];
  let cursor = 0;
  terminalLine.textContent = "";
  const typing = window.setInterval(() => {
    terminalLine.textContent += text[cursor++];
    if (cursor === text.length) window.clearInterval(typing);
  }, 26);
}
typeCommand();
window.setInterval(typeCommand, 3300);

if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  window.addEventListener("mousemove", ({ clientX, clientY }) => {
    dot.style.cssText = `left:${clientX}px;top:${clientY}px;opacity:1`;
    window.requestAnimationFrame(() => {
      ring.style.left = `${clientX}px`;
      ring.style.top = `${clientY}px`;
      ring.style.opacity = 1;
    });
  });
  document.querySelectorAll("a, button").forEach((target) => {
    target.addEventListener("mouseenter", () => ring.classList.add("active"));
    target.addEventListener("mouseleave", () =>
      ring.classList.remove("active"),
    );
  });
}

if (!reduceMotion) {
  const canvas = document.querySelector("#network");
  const context = canvas.getContext("2d");
  let points = [];
  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio, 2);
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const amount = Math.min(78, Math.max(28, Math.floor(innerWidth / 22)));
    points = Array.from({ length: amount }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      dx: (Math.random() - 0.5) * 0.33,
      dy: (Math.random() - 0.5) * 0.33,
      r: Math.random() * 1.3 + 0.35,
    }));
  }
  function drawNetwork() {
    context.clearRect(0, 0, innerWidth, innerHeight);
    for (let a = 0; a < points.length; a += 1) {
      const point = points[a];
      point.x += point.dx;
      point.y += point.dy;
      if (point.x < 0 || point.x > innerWidth) point.dx *= -1;
      if (point.y < 0 || point.y > innerHeight) point.dy *= -1;
      context.fillStyle = "#b6f75b";
      context.fillRect(point.x, point.y, point.r, point.r);
      for (let b = a + 1; b < points.length; b += 1) {
        const sibling = points[b];
        const x = point.x - sibling.x;
        const y = point.y - sibling.y;
        const distance = x * x + y * y;
        if (distance < 14500) {
          context.strokeStyle = `rgba(182,247,91,${0.11 * (1 - distance / 14500)})`;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(sibling.x, sibling.y);
          context.stroke();
        }
      }
    }
    window.requestAnimationFrame(drawNetwork);
  }
  resizeCanvas();
  drawNetwork();
  window.addEventListener("resize", resizeCanvas);
}

const scanButton = document.querySelector("#run-scan");
const scanState = document.querySelector("#scan-state");
const scanLog = document.querySelector("#scan-log");
const trustScore = document.querySelector("#trust-score");
const radar = document.querySelector(".radar");

if (scanButton) {
  scanButton.addEventListener("click", () => {
    if (scanButton.dataset.running) return;
    scanButton.dataset.running = "true";
    scanButton.querySelector("b").textContent = "SCANNING BUILD";
    scanState.textContent = "ANALYSING";
    scanLog.innerHTML = "";
    trustScore.textContent = "0";
    radar.classList.add("scanning");
    const events = [
      ["Collecting application surface...", ""],
      ["Checking credential storage pattern...", "pass"],
      ["Reviewing input-validation controls...", "pass"],
      ["Mapping dependency exposure...", "pass"],
      ["No critical signals detected.", "pass"],
    ];
    events.forEach(([message, type], index) =>
      window.setTimeout(() => {
        scanLog.insertAdjacentHTML(
          "beforeend",
          `<p class="${type}"><span>›</span> ${message}</p>`,
        );
        scanLog.scrollTop = scanLog.scrollHeight;
      }, index * 480),
    );
    let score = 0;
    const counter = window.setInterval(() => {
      score += 1;
      trustScore.textContent = score;
      if (score === 94) window.clearInterval(counter);
    }, 22);
    window.setTimeout(() => {
      scanState.textContent = "VERIFIED";
      scanButton.querySelector("b").textContent = "SCAN COMPLETE";
      scanButton.dataset.running = "";
      radar.classList.remove("scanning");
    }, 2600);
  });
}
