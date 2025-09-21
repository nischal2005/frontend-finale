
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');

const loginBtn = document.getElementById('login')

registerBtn.addEventListener('click', () =>{
    container.classList.add("active");
});

loginBtn.addEventListener('click', () =>{
    container.classList.remove("active"); 
})

const audio = document.getElementById('background-music');
const toggleButton = document.getElementById('music-toggle');
const icon = document.getElementById('music-icon');

toggleButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(err => console.log("Audio play error:", err));
    icon.classList.replace('fa-volume-up', 'fa-volume-off'); // icon changes to "off"
  } else {
    audio.pause();
    icon.classList.replace('fa-volume-off', 'fa-volume-up'); // icon changes to "up"
  }
});
