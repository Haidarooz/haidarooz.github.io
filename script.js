const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

$("#year").textContent = new Date().getFullYear();

/* ---------- Swap text with a slide (used by hero role + services number) ---------- */
function swapText(span, text) {
  if ((span._target ?? span.textContent) === text) return;
  span._target = text;
  if (reduced) { span.textContent = text; return; }
  if (span._busy) return; // the pending swap will pick up the latest _target
  span._busy = true;
  span.classList.add("out");
  setTimeout(() => {
    span._busy = false;
    span.textContent = span._target;
    span.classList.remove("out");
    span.classList.add("in");
    span.offsetHeight; // reflow
    span.classList.remove("in");
  }, 300);
}

/* ---------- Hero rotating role ---------- */
const role = $(".hero__role");
if (role) {
  const roles = role.dataset.roles.split("|");
  let i = 0;
  if (!reduced) setInterval(() => swapText($("span", role), roles[(i = (i + 1) % roles.length)]), 2400);
}

/* ---------- Nav: sliding indicator + scrollspy + mobile menu ---------- */
const nav = $(".nav");
const links = $$(".nav__pill a");
const indicator = $(".nav__indicator");
const targets = links.map((a) => $(a.getAttribute("href")));

function moveIndicator(a) {
  indicator.style.width = `${a.offsetWidth}px`;
  indicator.style.transform = `translateX(${a.offsetLeft}px)`;
}
function setActive(idx) {
  links.forEach((a, i) => a.classList.toggle("is-active", i === idx));
  moveIndicator(links[idx]);
}
function spy() {
  let idx = 0;
  targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= innerHeight * 0.35) idx = i; });
  // contributions section belongs to "Projects"
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) idx = links.length - 1;
  setActive(idx);
}
addEventListener("scroll", spy, { passive: true });
addEventListener("resize", spy);
document.fonts?.ready.then(spy);
spy();

$(".nav__burger").addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  $(".nav__burger").setAttribute("aria-expanded", open);
});
links.forEach((a) => a.addEventListener("click", () => nav.classList.remove("is-open")));

/* ---------- Flip cards ---------- */
$$(".flip").forEach((card) =>
  card.addEventListener("click", () =>
    card.setAttribute("aria-pressed", card.getAttribute("aria-pressed") !== "true")
  )
);

/* ---------- Services: sticky number follows the article in view ---------- */
const svcNum = $(".services__num span");
const svcName = $(".services__name");
const svcIO = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    swapText(svcNum, en.target.dataset.num);
    svcName.textContent = en.target.dataset.title;
  });
}, { rootMargin: "-45% 0px -45% 0px" });
$$(".svc").forEach((s) => svcIO.observe(s));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
}), { threshold: 0.12 });
$$(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 70}ms`;
  io.observe(el);
});
