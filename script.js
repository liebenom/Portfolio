// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Light / dark mode toggle
const themeBtn = document.querySelector(".theme-toggle");
function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
  try { localStorage.setItem("theme", t); } catch (e) {}
}
themeBtn.setAttribute("aria-label",
  document.documentElement.getAttribute("data-theme") === "dark" ? "Switch to light mode" : "Switch to dark mode");
themeBtn.addEventListener("click", () => {
  setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.textContent = open ? "✕" : "☰";
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
  })
);

// Nav border on scroll
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
});

// Fade sections in as you scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Contact form (Formspree) — sends without leaving the page
const form = document.querySelector(".contact-form");
const status = document.querySelector(".form-status");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (form.action.includes("YOUR_FORM_ID")) {
    status.textContent = "Contact form isn't set up yet — add your Formspree form ID in index.html.";
    return;
  }
  status.textContent = "Sending…";
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      form.reset();
      status.textContent = "Thanks! Your message has been sent.";
    } else {
      status.textContent = "Something went wrong. Please try emailing me instead.";
    }
  } catch {
    status.textContent = "Network error. Please try again later.";
  }
});
