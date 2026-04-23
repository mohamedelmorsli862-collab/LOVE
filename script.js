const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const replayBtn = document.getElementById("replayBtn");
const questionScreen = document.getElementById("questionScreen");
const celebrationScreen = document.getElementById("celebrationScreen");
const mainTitle = document.getElementById("mainTitle");
const subText = document.getElementById("subText");
const speechBubble = document.getElementById("speechBubble");
const eyebrowText = document.getElementById("eyebrowText");
const loveLine = document.getElementById("loveLine");
const confettiLayer = document.getElementById("confettiLayer");

const pleadingStates = [
  {
    eyebrow: "Question 2",
    bubble: "ze3ma ze3ma?!",
    title: "Rah anskhaaff!! Takdi?",
    sub: "Mashi hadi hiya l'ijaba li kanstana... ana baghi AH!",
  },
  {
    eyebrow: "Question 3",
    bubble: "fakri mzyan!",
    title: "3awdi fekri chwia...",
    sub: "Ana deja drt lplan dyalna kaml f rassi.",
  },
  {
    eyebrow: "Question 4",
    bubble: "ma t9olich la",
    title: "Hadi akher forsa...",
    sub: "Kliki AH w nbdaw chapter zwin.",
  },
  {
    eyebrow: "Question 5",
    bubble: "safi rab7ti",
    title: "Ana ghant3ada b dik LA...",
    sub: "Daba z3ma mazal bagha tcherdiha 3lia?",
  },
];

const finalLines = [
  "\uD83D\uDC97 \uD83D\uDC95 \uD83D\uDC97 \uD83D\uDC96 \uD83D\uDC97",
  "\uD83D\uDC97 \uD83D\uDC9E \uD83D\uDC98 \uD83D\uDC95 \uD83D\uDC97",
  "\u2764 nti lbest surprise \u2764",
];

let noCount = 0;
let confettiTimer = null;

function updateQuestionState() {
  const state = pleadingStates[Math.min(noCount - 1, pleadingStates.length - 1)];
  eyebrowText.textContent = state.eyebrow;
  speechBubble.textContent = state.bubble;
  speechBubble.classList.remove("hidden");
  mainTitle.textContent = state.title;
  subText.textContent = state.sub;

  // Only grow the YES button
  const yesScale = 1 + Math.min(noCount * 0.15, 1.35);
  yesBtn.style.transform = `scale(${yesScale})`;
}

function createConfettiBurst() {
  const colors = ["#f166a5", "#ffd166", "#ff85b2", "##b8f2e6", "#f4978e"];

  for (let i = 0; i < 28; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${3.2 + Math.random() * 1.8}s`;
    piece.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
    piece.style.setProperty("--spin", `${260 + Math.random() * 420}deg`);
    confettiLayer.appendChild(piece);

    window.setTimeout(() => {
      piece.remove();
    }, 5200);
  }
}

function startCelebration() {
  questionScreen.classList.remove("is-active");
  celebrationScreen.classList.add("is-active");
  loveLine.textContent = finalLines[Math.floor(Math.random() * finalLines.length)];

  createConfettiBurst();
  if (confettiTimer) {
    window.clearInterval(confettiTimer);
  }
  confettiTimer = window.setInterval(createConfettiBurst, 1600);
}

function resetExperience() {
  noCount = 0;
  if (confettiTimer) {
    window.clearInterval(confettiTimer);
    confettiTimer = null;
  }

  questionScreen.classList.add("is-active");
  celebrationScreen.classList.remove("is-active");
  eyebrowText.textContent = "Question 1";
  speechBubble.textContent = "ze3ma ze3ma?!";
  speechBubble.classList.add("hidden");
  mainTitle.textContent = "Wach Katbghinii?";
  subText.textContent = "Jawbini b sra7a... ana msta3d lkolchi.";
  confettiLayer.replaceChildren();

  yesBtn.style.transform = "";
}

yesBtn.addEventListener("click", startCelebration);

noBtn.addEventListener("click", () => {
  noCount += 1;

  if (noCount >= 10) {
    startCelebration();
    return;
  }

  updateQuestionState();
});

replayBtn.addEventListener("click", resetExperience);
