// ELEMENT REFERENCES
let sky = document.getElementById("sky");
let cloudsFront = document.getElementById("cloudsFront");
let cloudsMidFront = document.getElementById("cloudsMidFront");
let cloudsMidBack = document.getElementById("cloudsMidBack");
let cloudsBack = document.getElementById("cloudsBack");
let hillFront = document.getElementById("hillFront");
let hillBack = document.getElementById("hillBack");
let bushes = document.getElementById("bushes");
let people = document.getElementById("people");
let buildings = document.getElementById("buildings");
let ground = document.getElementById("ground");
let titleText = document.getElementById("titleText");
let parallax = document.querySelector(".parallax");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  let parallaxHeight = parallax.offsetHeight;
  let offset = Math.min(scrollY, parallaxHeight);

  // SKY
  sky.style.transform = `translateY(${offset * 0.05}px)`;

  // CLOUDS
  cloudsBack.style.transform = `translateY(${Math.sin(offset * 0.01) * 4}px)`;
  cloudsMidBack.style.transform = `translateY(${Math.sin(offset * 0.012) * 5}px)`;
  cloudsMidFront.style.transform = `translateY(${Math.sin(offset * 0.014) * 6}px)`;
  cloudsFront.style.transform = `translateY(${Math.sin(offset * 0.016) * 7}px)`;

  // HILLS
  hillBack.style.transform = `translateY(${offset * 0.2}px)`;
  hillFront.style.transform = `translateY(${offset * 0.25}px)`;

  // PEOPLE
  let peopleRise = Math.sin(offset * 0.02) * 1.4;
  let peopleSway = Math.sin(offset * 0.03) * 1.5;
  people.style.transform = `translate(${peopleSway}px, ${peopleRise}px) scale(1.25)`;

  // BUILDINGS
  let buildingRise = Math.sin(offset * 0.01) * 2;
  buildings.style.transform = `translateY(${buildingRise}px) scale(1.06)`;

  // BUSHES
  let bushSway = Math.sin(offset * 0.02) * 1.5;
  bushes.style.transform = `translate(${bushSway}px, ${offset * 0.3}px)`;

  // GROUND
  let groundDrift = Math.sin(offset * 0.008) * 2; 
  ground.style.transform = `translateY(${groundDrift}px) scaleY(0.9) scaleX(1.2)`;

  // TITLE
  titleText.style.transform = `translateY(${offset * 0.6}px)`;
  let fadeStart = 150;
  let fadeEnd = 300;
  let opacity = 1;
  if(scrollY > fadeStart){
    opacity = 1 - Math.min((scrollY - fadeStart)/(fadeEnd - fadeStart), 1);
  }
  titleText.style.opacity = opacity;
});

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  const res = await fetch("https://boycott-backend-production.up.railway.app/signup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password})
  });

  const data = await res.json();
  if (data.success) {
    alert("Account created! Your user ID: " + data.user_id);
    // Store user_id after successful signup
    localStorage.setItem("user_id", data.user_id);
  } else {
    alert(data.error);
  }
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const res = await fetch("https://boycott-backend-production.up.railway.app/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password})
  });

  const data = await res.json();
  if (data.success) {
    alert("Welcome, " + data.username);
    // Store user_id after successful login
    localStorage.setItem("user_id", data.user_id);
  } else {
    alert(data.error);
  }
});

