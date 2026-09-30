const FORTUNES = [
  "A great opportunity is closer than you think.",
  "Your creativity will solve a problem others gave up on.",
  "Someone is about to say yes to something you've been hoping for.",
  "The risk you've been avoiding is worth taking this week.",
  "A small act of kindness returns to you tenfold.",
  "You will find something you weren't even looking for.",
  "The next conversation you have matters more than you think.",
  "Patience pays off — literally — very soon.",
  "An old idea deserves a second look today.",
  "You are luckier than the odds suggest.",
  "A stranger's advice will stick with you longer than expected.",
  "Today's mistake is tomorrow's funny story.",
  "The thing you're overthinking will resolve itself simply.",
];

const COLORS = [
  { name: "Crimson", hex: "#dc143c" },
  { name: "Turquoise", hex: "#40e0d0" },
  { name: "Gold", hex: "#ffd700" },
  { name: "Violet", hex: "#8a2be2" },
  { name: "Coral", hex: "#ff7f50" },
  { name: "Emerald", hex: "#2ecc71" },
  { name: "Sky Blue", hex: "#3498db" },
  { name: "Magenta", hex: "#ff00ff" },
];

const btn = document.getElementById("luckyBtn");
const result = document.getElementById("result");
const fortuneEl = document.getElementById("fortune");
const numberEl = document.getElementById("number");
const colorEl = document.getElementById("color");
const swatchEl = document.getElementById("swatch");
const percentEl = document.getElementById("percent");

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

btn.addEventListener("click", () => {
  fortuneEl.textContent = randomFrom(FORTUNES);
  numberEl.textContent = 1 + Math.floor(Math.random() * 99);

  const color = randomFrom(COLORS);
  colorEl.textContent = color.name;
  swatchEl.style.background = color.hex;

  percentEl.textContent = `${1 + Math.floor(Math.random() * 100)}%`;

  result.classList.remove("hidden");
  launchConfetti();
});

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let particles = [];
let animId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
  const colors = ["#ffd166", "#ff7b7b", "#40e0d0", "#8a2be2", "#2ecc71"];
  particles = Array.from({ length: 120 }, () => ({
    x: canvas.width / 2,
    y: canvas.height / 3,
    vx: (Math.random() - 0.5) * 12,
    vy: Math.random() * -10 - 4,
    size: Math.random() * 6 + 4,
    color: randomFrom(colors),
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 10,
    life: 100,
  }));

  if (!animId) animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.35;
    p.rotation += p.spin;
    p.life -= 1.2;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(p.life / 100, 0);
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  });

  particles = particles.filter((p) => p.life > 0);

  if (particles.length > 0) {
    animId = requestAnimationFrame(animate);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animId = null;
  }
}
