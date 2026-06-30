const frostingChoices = ["Pink Strawberry", "Yummy Chocolate", "Sweet Vanilla", "Purple Blueberry", "Green Matcha"];
const sprinkleChoices = ["Rainbow Stars", "Chocolate Chips", "Pink Hearts", "Tiny Bubbles", "No Sprinkles"];
const wrapperChoices = ["Pastel Blue", "Baby Pink", "Sunny Yellow", "Magic Purple", "Mint Green"];
const cherryChoices = ["Yes!", "No"];

const frostingColors = {
  "Pink Strawberry": "#ffb7d5",
  "Yummy Chocolate": "#7f4f24",
  "Sweet Vanilla": "#fffaf0",
  "Purple Blueberry": "#cdb4db",
  "Green Matcha": "#c7f9cc"
};

const wrapperColors = {
  "Pastel Blue": "#a2d2ff",
  "Baby Pink": "#ffc8dd",
  "Sunny Yellow": "#fdf0d5",
  "Magic Purple": "#b8c0ff",
  "Mint Green": "#b9fbc0"
};

const cupcake = document.getElementById("cupcake");
const frosting = document.getElementById("frosting");
const wrapper = document.getElementById("wrapper");
const cherry = document.getElementById("cherry");
const cherryStem = document.getElementById("cherryStem");
const sprinklesBox = document.getElementById("sprinkles");

const frostingText = document.getElementById("frostingText");
const sprinklesText = document.getElementById("sprinklesText");
const wrapperText = document.getElementById("wrapperText");
const cherryText = document.getElementById("cherryText");

const mixButton = document.getElementById("mixButton");

function pickRandom(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function playPopSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Make the sound slide up in pitch (like a bubble!)
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
    
    // Make the volume fade out quickly
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (err) {
    // Sound might be blocked by browser before first click
  }
}

function burstConfetti() {
  const box = document.querySelector(".cupcake-box");
  const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#ff8fa3", "#c8b6ff"];
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "8px";
    particle.style.height = "8px";
    particle.style.borderRadius = "50%";
    particle.style.backgroundColor = pickRandom(colors);
    particle.style.left = "50%";
    particle.style.top = "50%";
    particle.style.transform = "translate(-50%, -50%)";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "10";
    box.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 80;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - 20;

    particle.animate([
      { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
      { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`, opacity: 0 }
    ], {
      duration: 600 + Math.random() * 400,
      easing: "ease-out",
      fill: "forwards"
    });

    // Remove particle from page when done
    setTimeout(() => particle.remove(), 1000);
  }
}

function makeSprinkles(type) {
  sprinklesBox.innerHTML = ""; // Clear old sprinkles
  if (type === "No Sprinkles") return;

  const colors = ["#ff4d6d", "#ffb7d5", "#ffd166", "#06d6a0", "#118ab2", "#c8b6ff"];

  // Add 10 random sprinkles
  for (let i = 0; i < 10; i++) {
    const sprinkle = document.createElement("div");
    sprinkle.className = "sprinkle";

    // Set sprinkle position inside the frosting
    sprinkle.style.top = Math.floor(Math.random() * 45) + 20 + "px";
    sprinkle.style.left = Math.floor(Math.random() * 90) + 10 + "px";
    sprinkle.style.transform = "rotate(" + Math.floor(Math.random() * 180) + "deg)";

    // Style sprinkle shape and color
    if (type === "Rainbow Stars") {
      sprinkle.classList.add("star");
    } else if (type === "Pink Hearts") {
      sprinkle.classList.add("heart");
    } else if (type === "Chocolate Chips") {
      sprinkle.style.backgroundColor = "#5e503f";
    } else if (type === "Tiny Bubbles") {
      sprinkle.style.backgroundColor = "#fff";
      sprinkle.style.width = "6px";
      sprinkle.style.height = "6px";
      sprinkle.style.borderRadius = "50%";
    }

    if (!sprinkle.classList.contains("star") && !sprinkle.classList.contains("heart") && type !== "Chocolate Chips") {
      sprinkle.style.backgroundColor = pickRandom(colors);
    }

    sprinklesBox.appendChild(sprinkle);
  }
}

function generateCupcake() {
  const frostingChoice = pickRandom(frostingChoices);
  const sprinkleChoice = pickRandom(sprinkleChoices);
  const wrapperChoice = pickRandom(wrapperChoices);
  const cherryChoice = pickRandom(cherryChoices);

  frostingText.textContent = frostingChoice;
  sprinklesText.textContent = sprinkleChoice;
  wrapperText.textContent = wrapperChoice;
  cherryText.textContent = cherryChoice;

  frosting.style.backgroundColor = frostingColors[frostingChoice];
  wrapper.style.backgroundColor = wrapperColors[wrapperChoice];

  if (cherryChoice === "Yes!") {
    cherry.classList.remove("hidden");
    cherryStem.classList.remove("hidden");
  } else {
    cherry.classList.add("hidden");
    cherryStem.classList.add("hidden");
  }

  makeSprinkles(sprinkleChoice);

  cupcake.classList.remove("bounce");
  void cupcake.offsetWidth; // This is a magic trick to restart the animation
  cupcake.classList.add("bounce");

  // 🔊 F. Play effects
  playPopSound();
  burstConfetti();
}

// 👆 9. Run the generator when the button is clicked! 👆
mixButton.addEventListener("click", generateCupcake);

// 🧁 10. Run once on page load to show a cupcake immediately! 🧁
generateCupcake();
