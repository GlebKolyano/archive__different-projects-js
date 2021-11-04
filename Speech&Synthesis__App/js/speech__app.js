// API
const synth = window.speechSynthesis


// Variables
const speechBtn = document.querySelector('.speech-button')
const speechForm = document.querySelector('form')
const speechText = document.getElementById('input')
const speechRate = document.getElementById('rate')
const speechPitch = document.getElementById('pitch')
const speechSelect = document.getElementById('select')
const pitchValue = document.getElementById('pitch-value')
const rateValue = document.getElementById('rate-value')
const body = document.querySelector('body')
console.log(speechPitch.value)
// Voices array
let voices = []

const getVoices = () => {
  voices = synth.getVoices()
  
  voices.forEach(voice => {
    // create option element
    const option = document.createElement('option')
    option.textContent = voice.name + '('+ voice.lang+')'

    option.setAttribute('data-lang', voice.lang)
    option.setAttribute('data-name', voice.name)
    speechSelect.appendChild(option)

  })
}

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
  // background animation
  




  // check if speaking
  if(synth.speaking) {
    console.error('Already speaking...')
    return
  }

  if(speechText.value !== '') {
    // get speak text
    const speakText = new SpeechSynthesisUtterance(speechText.value)
    // speak end
    speakText.onend = event => {
      console.log('Done speaking...')
    }
    // speak error
    speakText.onerror = event => {
      console.error('Something went wrong...')
    }
    // Selected voice
    const selectedVoice = speechSelect.selectedOptions[0].getAttribute('data-name')
    

    // 
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice
      }
    })
    // pitch and rate
    speakText.rate = speechRate.value
    speakText.pitch = speechPitch.value

    // speak
    synth.speak(speakText)
    body.style.background = 'black url(/Speech&Synthesis__App/img/rokid_wave_sound_fantasy.gif) bottom / 600px no-repeat'
  
  }
}
// listeners


// text form
speechForm.addEventListener('submit', event => {
  event.preventDefault()
  speak()
  speechText.blur()
})
// rate value change
speechPitch.addEventListener('change', e => {
  pitchValue.textContent = speechPitch.value})
speechRate.addEventListener('change', e => {
  rateValue.textContent = speechRate.value
})

// voice select change
