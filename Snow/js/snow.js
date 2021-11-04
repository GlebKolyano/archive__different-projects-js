const number = document.querySelector('#number')

let letSnow = setInterval(() => createSnowFlake(), number.value) 

number.addEventListener('change', () => {
  clearInterval(letSnow)
  letSnow = setInterval(() => createSnowFlake(), number.value)
})




function createSnowFlake() {
  const snowFlake = document.createElement('i')
  // add classes
  snowFlake.classList.add('fas')
  snowFlake.classList.add('fa-snowflake')
  // random POSITION / TIME / OPACITY / SIZE
  snowFlake.style.left = Math.random() * window.innerWidth + 'px'  
  snowFlake.style.animationDuration = (Math.random() * (30 - 25) + 25) + 's'
  snowFlake.style.opacity = Math.random()
  snowFlake.style.fontSize = Math.floor(Math.random() * (20 - 10) + 12) + 'px' 


  document.body.appendChild(snowFlake)
  setTimeout(() => {
    snowFlake.remove();
  }, 30000)
}

