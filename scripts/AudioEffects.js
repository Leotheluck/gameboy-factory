// Audio effects

const ambientSound = new Audio('./audio/ambient.mp3')
const splash = new Audio('./audio/splash.mp3')
const conveyors = new Audio('./audio/conveyors.mp3')
const clickOpen = new Audio('./audio/click-open.mp3')
const clickClose = new Audio('./audio/click-close.mp3')

const SOUNDFX = {
    Effect: (sound, volume) => {
        sound.volume = volume
        sound.currentTime = 0
        sound.play()
    },
    Wave: (volume) => {
        splash.volume = volume
        splash.currentTime = 0
        splash.play()
    },
    Conveyors: (volume) => {
        conveyors.volume = volume
        conveyors.currentTime = 0
        conveyors.play()
    },
    Loop: (volume) => {
        ambientSound.loop = true
        ambientSound.volume = volume
        ambientSound.play()
    }
}