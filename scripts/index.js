// Initializing the THREE.js scene

const scene = new THREE.Scene()

const fogColor = 0x9dd6fa
const fogNear = 35
const fogFar = 70
scene.fog = new THREE.Fog(fogColor, fogNear, fogFar)

scene.background = new THREE.Color(0x9dd6fa)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 250)
camera.position.z = 8
camera.position.y = 5
camera.rotation.x = THREE.Math.degToRad(-25)

const canvas = document.querySelector('.game')

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize( canvas.offsetWidth, canvas.offsetHeight )
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const controls = new THREE.OrbitControls( camera, renderer.domElement )
controls.minPolarAngle = THREE.Math.degToRad(30)
controls.maxPolarAngle = THREE.Math.degToRad(75)
controls.enablePan = false
controls.enableZoom = true
controls.maxDistance = 15
controls.minDistance = 6

// Variables used

let factorySpeed = 2500

let activeClaw = 0

let isBoat = false

let activeBoat = null

let activeContainers = 0

let containerColors = [0x62B6CB, 0x698F3F, 0x6D326D, 0xFF6978, 0xBCAB79, 0xB9D2B1, 0xDD6031, 0x9A348E, 0xD11149, 0xE6C229, 0x23395B]

let boatMax = 14

//

document.querySelector(".toggle-audio").addEventListener('click', () => {
    document.querySelector(".toggle-audio").style.display = "none"
    SOUNDFX.Loop(0.25)
})

document.querySelector(".info-button").addEventListener('click', () => {
    document.querySelector(".information-box").style.display = "flex"
    document.querySelector(".black-background").style.display = "block"
    SOUNDFX.Effect(clickOpen, 0.5)
})

document.querySelector(".information-box .exit").addEventListener('click', () => {
    document.querySelector(".information-box").style.display = "none"
    document.querySelector(".black-background").style.display = "none"
    SOUNDFX.Effect(clickClose, 0.5)
})

// Spawning the first boat

GAME.SpawnBoat()

// Spawning the boats later on

setInterval(() => {
    GAME.SpawnBoat()
}, factorySpeed * 25)

// Color palette

const palette = {
    conveyor: 0xcccccc,
    belt: 0x2e2e2e,
    metal: 0xdddddd,
    emissive: 0xe6b91b,
    light: 0xffffff
} 

// Building the sea

const sea = BUILD.Sea(1, 0x3587A4, 0x2D898B, 0, -6, 120, 40)
ANIMATION.Waves(sea, 40)

// Factory base, including pillars

const factoryBase = BUILD.FactoryBase(1, 0x373737, 0x606060, -1.625, -1, 0)

// Conveyors built

const conveyor1 = BUILD.Conveyor(6.5, 0.8, 1.5, palette.conveyor, -4.75, 5, false)
const conveyor2 = BUILD.Conveyor(5.5, 0.8, 1.5, palette.conveyor, -2.25, 1.5, true)
const conveyor3 = BUILD.Conveyor(2, 0.8, 1.5, palette.conveyor, -0.5, -0.5, false)
const conveyor4 = BUILD.Conveyor(5.5, 0.8, 1.5, palette.conveyor, 1.25, 1.5, true)
const conveyor5 = BUILD.Conveyor(6, 0.8, 1.5, palette.conveyor, 3.5, 5, false)
const conveyor6 = BUILD.Conveyor(10.5, 0.8, 1.5, palette.conveyor, 5.75, -1, true)
const conveyor7 = BUILD.Conveyor(6, 0.8, 1.5, palette.conveyor, 2, -5.5, false)

// Belts for conveyors

const belt1 = BUILD.Belt(5, 0.025, 1.25, palette.belt, -5.5, 5, false)
const belt2 = BUILD.Belt(4, 0.025, 1.25, palette.belt, -2.25, 2.25, true)
const belt3 = BUILD.Belt(2, 0.025, 1.25, palette.belt, -0.5, -0.5, false)
const belt4 = BUILD.Belt(4, 0.025, 1.25, palette.belt, 1.25, 2.25, true)
const belt5 = BUILD.Belt(3, 0.025, 1.25, palette.belt, 3.5, 5, false)
const belt6 = BUILD.Belt(9, 0.025, 1.25, palette.belt, 5.75, -0.25, true)
const belt7 = BUILD.Belt(6, 0.025, 1.25, palette.belt, 2, -5.5, false)

// Pushers on the conveyors

const pusher1 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, -8, 5, 5, 1)
const pusher2 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, -2.25, 4.25, 4, 0)
const pusher3 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, -1.5, -0.5, 2, 1)
const pusher4 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, 1.25, 0.25, 4, 2)
const pusher5 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, 2, 5, 3, 1)
const pusher6 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, 5.75, 4.25, 9, 0)
const pusher7 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, 5, -5.5, 6, 3)

// For animation purposes

const compensatePusher1 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, -7, 5, 4, 1)
const compensatePusher2 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, -2.25, 3.25, 3, 0)
const compensatePusher3 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, -0.5, -0.5, 1, 1)
const compensatePusher4 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, 1.25, 1.25, 3, 2)
const compensatePusher5 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, 3, 5, 2, 1)
const compensatePusher6 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, 5.75, 3.25, 8, 0)
const compensatePusher7 = BUILD.Pusher(0.1, 0.1, 1.25, palette.metal, palette.emissive, 4, -5.5, 5, 3)

// Workboxes

const workBox1 = BUILD.WorkBox(1.5, 2, 1.5, palette.metal, palette.emissive, -2.25, 5, 0)
const workBox2 = BUILD.WorkBox(1.5, 2, 1.5, palette.metal, palette.emissive, -2.25, -0.5, 0)
const workBox3 = BUILD.WorkBox(1.5, 2, 1.5, palette.metal, palette.emissive, 1.25, -0.5, 0)
const workBox4 = BUILD.WorkBox(1.5, 2, 1.5, palette.metal, palette.emissive, 1.25, 5, 0)
const workBox5 = BUILD.WorkBox(1.5, 2, 1.5, palette.metal, palette.emissive, 5.75, 5, 0)
const workBox6 = BUILD.WorkBox(1.5, 2, 1.5, palette.metal, palette.emissive, 5.75, -5.5, 0)

// Little robots generated

const worker1 = BUILD.Worker(1, palette.metal, palette.emissive, -2.25, 0.4, 6, 0)
const worker2 = BUILD.Worker(1, palette.metal, palette.emissive, -3.25, 0.4, -0.5, 3)
const worker3 = BUILD.Worker(1, palette.metal, palette.emissive, 1.25, 0.4, -1.5, 2)
const worker4 = BUILD.Worker(1, palette.metal, palette.emissive, 0.25, 0.4, 5, 3)
const worker5 = BUILD.Worker(1, palette.metal, palette.emissive, 5.75, 0.4, 6, 0)
const worker6 = BUILD.Worker(1, palette.metal, palette.emissive, 6.75, 0.4, -5.5, 1)

// Ambient lightning

const ambientLight = new THREE.AmbientLight(0xffffff, 0.85)
scene.add(ambientLight)

// Factory Machine, generating the gameboys

const factoryMachine1 = BUILD.FactoryMachine(1, 0x6b6b81, -8, 0.4, 5)

// Randomly generates gameboys

setInterval(() => {
    if (Math.random() < 0.50) {
        GAME.SpawnGameboy()
    }
}, factorySpeed)

// Crane

const crane = BUILD.Crane(1, 0x606060, -1.55, 0.8, -5.5)

// Animation for pushers

ANIMATION.Pusher(pusher1, 1)
ANIMATION.Pusher(pusher2, 0)
ANIMATION.Pusher(pusher3, 1)
ANIMATION.Pusher(pusher4, 2)
ANIMATION.Pusher(pusher5, 1)
ANIMATION.Pusher(pusher6, 0)
ANIMATION.Pusher(pusher7, 3)

ANIMATION.CompensatePusher(compensatePusher1, 1)
ANIMATION.CompensatePusher(compensatePusher2, 0)
ANIMATION.CompensatePusher(compensatePusher3, 1)
ANIMATION.CompensatePusher(compensatePusher4, 2)
ANIMATION.CompensatePusher(compensatePusher5, 1)
ANIMATION.CompensatePusher(compensatePusher6, 0)
ANIMATION.CompensatePusher(compensatePusher7, 3)

ANIMATION.FactoryDoor(factoryMachine1.children[5])

// More animations

setInterval(() => {
    ANIMATION.Pusher(pusher1, 1)
    ANIMATION.Pusher(pusher2, 0)
    ANIMATION.Pusher(pusher3, 1)
    ANIMATION.Pusher(pusher4, 2)
    ANIMATION.Pusher(pusher5, 1)
    ANIMATION.Pusher(pusher6, 0)
    ANIMATION.Pusher(pusher7, 3)

    ANIMATION.CompensatePusher(compensatePusher1, 1)
    ANIMATION.CompensatePusher(compensatePusher2, 0)
    ANIMATION.CompensatePusher(compensatePusher3, 1)
    ANIMATION.CompensatePusher(compensatePusher4, 2)
    ANIMATION.CompensatePusher(compensatePusher5, 1)
    ANIMATION.CompensatePusher(compensatePusher6, 0)
    ANIMATION.CompensatePusher(compensatePusher7, 3)

    ANIMATION.FactoryDoor(factoryMachine1.children[5])

    ANIMATION.RotateCrane(crane)
}, factorySpeed)

// Lights for the scene

const light1 = BUILD.Light(palette.light, 0.8, 18, -3, 8, -3)
const light2 = BUILD.Light(palette.light, 0.8, 18, 3, 8, 3)
const light3 = BUILD.Light(palette.light, 0.8, 18, 10, 0, -10)
const light4 = BUILD.Light(palette.light, 0.8, 18, -10, 0, 10)

// Animate function, 24 FPS chosen to avoid lag problems

const animate = (time) => {
    setTimeout(animate, 1000 / 24)
    //requestAnimationFrame(animate)

    TWEEN.update(time)

    renderer.render(scene, camera)
}

animate()

// Allows to resize window

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    //render()
}

window.addEventListener('resize', onWindowResize)