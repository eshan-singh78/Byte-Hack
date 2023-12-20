// public/scripts.js

const fonts = [
    "'Silkscreen', monospace",
    "'Inconsolata', monospace",
    "'Bebas Neue', sans-serif",
    "'Pacifico', cursive",
    "'Rubik Doodle Shadow', sans-serif",
    "'Rubik Broken Fax', sans-serif",
    "'Rubik Doodle Triangles', sans-serif"
  ];
  
  const colors = ['#009900', '#ffffff', '#9933ff', '#0099ff']; 
  
  const byteHackText = document.querySelector('.byte-hack');
  
  function getRandomFont() {
    return fonts[Math.floor(Math.random() * fonts.length)];
  }
  
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  function changeFontAndColor() {
    const randomFont = getRandomFont();
    const randomColor = getRandomColor();
  
    byteHackText.style.fontFamily = randomFont;
    byteHackText.style.color = randomColor;
  }
  

  setInterval(changeFontAndColor, 1000); 
  



const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

let fontSize = 16;
let columns = canvas.width / fontSize;
let drops = [];


for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function drawMatrix() {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; 
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = characters[Math.floor(Math.random() * charactersLength)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);


    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }


    drops[i]++;
  }
}

function animateMatrix() {
  drawMatrix();
  requestAnimationFrame(animateMatrix);
}

animateMatrix();


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = canvas.width / fontSize;
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
});





function startCountdown() {
    const countdownDate = new Date('2024-01-01T00:00:00Z'); 
    countdownDate.setUTCHours(countdownDate.getUTCHours() + 5.5);
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
  
      if (distance < 0) {
        clearInterval(interval);

        document.querySelector('.timer').innerHTML = 'Countdown expired!';
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  

      document.getElementById('days').textContent = formatTime(days);
      document.getElementById('hours').textContent = formatTime(hours);
      document.getElementById('minutes').textContent = formatTime(minutes);
      document.getElementById('seconds').textContent = formatTime(seconds);
    }, 1000);
  }
  

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }
  

  window.onload = startCountdown;