const carousel = document.querySelectorAll('.carousel img')
// carousel
let carouselImageIndex = 0
const changeCarousel = () => {
  carousel[carouselImageIndex].classList.toggle('active')
  if (carouselImageIndex >= carousel.length - 1) {
    carouselImageIndex = 0
  } else {
    carouselImageIndex++
  }
  carousel[carouselImageIndex].classList.toggle('active')
}
setInterval(() => {
  changeCarousel();
}, 3000)

// toggling mus player
const musicPlayerSection = document.querySelector('.music-player-section')

let clickCount= 1;

musicPlayerSection.addEventListener('click', (e) => {
  console.log(e.target)
  if (clickCount >=2 && e.target.classList.contains('controls') == true) {
    musicPlayerSection.classList.add('active')
    clickCount =1;
    return;
  }
    clickCount++
  setTimeout(() => {
    clickCount = 1
  }, 250)

})
//////////////// back from music player
const backFromMusicPlayer = document.querySelector('.music-player-section .back-btn')

backFromMusicPlayer.addEventListener('click', () => {
  musicPlayerSection.classList.remove('active')
  volumeBtn.classList.remove('active')
   volumeBtn.classList.remove('active')
  volumeSlider.classList.remove('active')
})

//////////////// access/back playlist
const playlistSection = document.querySelector('.playlist-section')
const navBtn = document.querySelector('.music-player-section .nav-btn')
const backBtn = document.querySelector('.playlist-section .back-btn')

navBtn.addEventListener('click', () => {
  playlistSection.classList.add('active')
  volumeBtn.classList.remove('active')
  volumeSlider.classList.remove('active')
})

backBtn.addEventListener('click', () => {
  console.log('click')
  playlistSection.classList.remove('active')
   volumeBtn.classList.remove('active')
  volumeSlider.classList.remove('active')
})
//////////////// navigation done
/// music
let currentMusic = 0;

const music = document.querySelector('#audio-source')

const seekBar = document.querySelector('.music-seek-bar')
const songName = document.querySelector('.current-song-name')
const songArtist = document.querySelector('.current-artist-name')
const coverImage = document.querySelector('.current-cover-img')
const currentMusicTime = document.querySelector('.current-time')
const durationTime = document.querySelector('.duration')


const queue = document.querySelectorAll('.queue')
// select all btns
const forwardBtn = document.querySelector('i.fa-forward')
const backwardBtn = document.querySelector('i.fa-backward')
const playBtn = document.querySelector('i.fa-play')
const pauseBtn = document.querySelector('i.fa-pause')

const repeatBtn = document.querySelector('span.fa-redo')
const volumeBtn = document.querySelector('span.fa-volume-up')

const volumeSlider = document.querySelector('.volume-slider')

const allBtns = document.querySelectorAll('button')
////////////////// ADD LISTENERS
// PLAY BTN CLICK
playBtn.addEventListener('click', () => {
  music.play();
  playBtn.classList.remove('active')
  pauseBtn.classList.add('active')
   volumeBtn.classList.remove('active')
  volumeSlider.classList.remove('active')
})
// PAUSE BTN CLICK
pauseBtn.addEventListener('click', () => {
  music.pause();
  pauseBtn.classList.remove('active')
  playBtn.classList.add('active')
   volumeBtn.classList.remove('active')
  volumeSlider.classList.remove('active')
  
})
// function for setting up music
const setMusic = (i) => {
  seekBar.value = 0
  let song = songs[i]
  currentMusic = i

  music.src = song.path

  songName.innerHTML = song.name;
  songArtist.innerHTML = song.artist;
  coverImage.src = song.cover;
  // duration
  setTimeout(() => {
    seekBar.max = music.duration
    durationTime.innerHTML = formatTime(music.duration)
  }, 300);
  currentMusicTime.innerHTML = '00 : 00'

  queue.forEach(item => item.classList.remove('active'))
  queue[currentMusic].classList.add('active')
}

// format duration
const formatTime = (time) => {
  let min = Math.floor(time/60);
  if (min < 10) {
    min = `0` + min;
  }
  let sec = Math.floor(time % 60) 
  if (sec < 10) {
    sec = `0` + sec;
  }

  return `${min} : ${sec}`
}
// SEEKBAR events
setInterval(() => {
  seekBar.value = music.currentTime;
  currentMusicTime.innerHTML = formatTime(music.currentTime)
  if(Math.floor(music.currentTime) == Math.floor(music.duration)) {
    if (repeatBtn.classList.contains('active')) {
      setMusic(currentMusic)
      playBtn.click()
      // check
      if (musicPlayerSection.classList.contains('active')) {
        return
      } else {
        musicPlayerSection.classList.remove('active')
      }
      
    } else {
      forwardBtn.click()
      // check 
      if (musicPlayerSection.classList.contains('active')) {
        return
      } else {
        musicPlayerSection.classList.remove('active')
      }
    }
  }
}, 500);

seekBar.addEventListener('change', () => {
  music.currentTime = seekBar.value
})
// forward BTN
forwardBtn.addEventListener('click', () => {
  if (currentMusic >= songs.length -1) {
    currentMusic = 0
  } else {
    currentMusic++   
  }
  setMusic(currentMusic) 
  playBtn.click()
  ///
  volumeBtn.classList.remove('active')
  volumeSlider.classList.remove('active')
})
// backward BTN
backwardBtn.addEventListener('click', () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1
  } else {
    currentMusic-- 
  }
  setMusic(currentMusic) 
  playBtn.click()
  ///
   volumeBtn.classList.remove('active')
  volumeSlider.classList.remove('active')
})
// repeat Btn 
repeatBtn.addEventListener('click', () => {
  repeatBtn.classList.toggle('active')
   volumeBtn.classList.remove('active')
  volumeSlider.classList.remove('active')
})
// volume section
volumeBtn.addEventListener('click', () => {
  volumeBtn.classList.toggle('active')
  volumeSlider.classList.toggle('active')
})

volumeSlider.addEventListener('input', () => {
  music.volume = volumeSlider.value
})
// queue
queue.forEach((item, number) => {
  item.addEventListener('click', () => {
    console.log(number)
    setMusic(number)
    playBtn.click()
  })
})
setMusic(0)


// 
