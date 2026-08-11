document.documentElement.classList.add("js");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const loader = document.querySelector(".loader");
setTimeout(() => loader.classList.add("done"), reduceMotion ? 0 : 1050);

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
menuButton.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
  menuButton.querySelector("span").textContent = open ? "−" : "+";
});
menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector("span").textContent = "+";
  }),
);

document.querySelectorAll(".case button").forEach((button) =>
  button.addEventListener("click", () => {
    const card = button.closest(".case");
    const wasOpen = card.classList.contains("active");
    document.querySelectorAll(".case").forEach((item) => {
      item.classList.remove("active");
      item.querySelector("button").setAttribute("aria-expanded", "false");
      item.querySelector("button>i").textContent = "+";
    });
    if (!wasOpen) {
      card.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      button.querySelector("i").textContent = "−";
    }
  }),
);

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }),
  { threshold: 0.12 },
);
document
  .querySelectorAll(".section")
  .forEach((section) => observer.observe(section));
if (reduceMotion)
  document
    .querySelectorAll(".section")
    .forEach((section) => section.classList.add("visible"));

const scanButton = document.querySelector("#scan-button"),
  state = document.querySelector("#console-state"),
  log = document.querySelector("#console-log"),
  score = document.querySelector("#score"),
  radar = document.querySelector(".radar");
scanButton.addEventListener("click", () => {
  if (scanButton.disabled) return;
  scanButton.disabled = true;
  scanButton.innerHTML = "<span>◌</span> REVIEWING BUILD";
  state.textContent = "ANALYSING";
  log.innerHTML = "";
  score.textContent = "0";
  radar.classList.add("scanning");
  const messages = [
    "Mapping product requirements...",
    "Reviewing application structure...",
    "Checking user-flow clarity...",
    "Measuring maintainability signals...",
    "Build review complete: ready to iterate.",
  ];
  messages.forEach((message, index) =>
    setTimeout(
      () => log.insertAdjacentHTML("beforeend", `<p><b>›</b> ${message}</p>`),
      index * 430,
    ),
  );
  let value = 0;
  const meter = setInterval(() => {
    score.textContent = ++value;
    if (value === 94) clearInterval(meter);
  }, 18);
  setTimeout(() => {
    state.textContent = "COMPLETE";
    scanButton.innerHTML = "<span>✓</span> REVIEW COMPLETE / RUN AGAIN";
    scanButton.disabled = false;
    radar.classList.remove("scanning");
  }, 2400);
});
