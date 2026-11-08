const progress = document.getElementById("progress");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const meter = document.querySelector(".meter-fill");
const meterObserver = new IntersectionObserver(entries => {
  if (entries.some(entry => entry.isIntersecting)) {
    meter.style.width = "100%";
    meterObserver.disconnect();
  }
}, { threshold: 0.5 });
meterObserver.observe(document.querySelector(".stat-band"));

const barrierContent = {
  time: {
    icon: "◷",
    title: "TIME & RESPONSIBILITIES",
    text: "Work, school, caring responsibilities and busy routines can leave people with less time or energy to be active. This shows how lifestyle and circumstances can shape participation.",
    source: "CONNECTED TO: PUBMED SYSTEMATIC REVIEW (2017)"
  },
  cost: {
    icon: "£",
    title: "COST & INCOME",
    text: "Gym memberships, sports clubs, equipment and travel can cost money. Free activities may be available, but income can still affect the choices and facilities people can realistically access.",
    source: "CONNECTED TO: WHO (2024) + OXFORD RESEARCH (2024)"
  },
  access: {
    icon: "↗",
    title: "TRANSPORT & FACILITIES",
    text: "People may live far from safe parks, leisure centres or sports facilities, or have limited transport. Wanting to exercise does not guarantee that suitable places are easy to reach.",
    source: "CONNECTED TO: PUBMED SYSTEMATIC REVIEW (2017)"
  },
  social: {
    icon: "◎",
    title: "SUPPORT & MOTIVATION",
    text: "Enjoyment, confidence, encouragement and social support can influence participation. Motivation is relevant, but it operates alongside practical circumstances rather than replacing them.",
    source: "CONNECTED TO: PUBMED SYSTEMATIC REVIEW (2017)"
  }
};
document.querySelectorAll(".barrier-item").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".barrier-item").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const item = barrierContent[button.dataset.barrier];
    document.getElementById("barrierIcon").textContent = item.icon;
    document.getElementById("barrierTitle").textContent = item.title;
    document.getElementById("barrierText").textContent = item.text;
    document.getElementById("barrierSource").textContent = item.source;
  });
});
