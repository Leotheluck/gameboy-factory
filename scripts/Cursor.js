// Simple JS cursor

const mouseCursor = document.querySelector('.cursor')

const cursor = (event) => {
    mouseCursor.style.top = event.pageY + "px"
    mouseCursor.style.left = event.pageX + "px"
}

document.addEventListener('mousemove', cursor)

document.querySelector(".info-button").addEventListener('mouseover', () => {
    mouseCursor.classList.add('cursor-on-object')
})

document.querySelector(".info-button").addEventListener('mouseleave', () => {
    mouseCursor.classList.remove('cursor-on-object')
})

document.querySelector(".information-box .exit").addEventListener('mouseover', () => {
    mouseCursor.classList.add('cursor-on-object')
})

document.querySelector(".information-box .exit").addEventListener('mouseleave', () => {
    mouseCursor.classList.remove('cursor-on-object')
})