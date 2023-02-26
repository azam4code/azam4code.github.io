const swiper = new Swiper('.swiper', { 
    loop: true, 
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})
 
const mouse = document.querySelector('.cursor')
const mouseTxt = mouse.querySelector('span')
const menuIcon = document.querySelector('.menu-icon')

function cursor(e) {
    mouse.style.top = e.pageY + 'px'
    mouse.style.left = e.pageX + 'px'
}

function activeCursor(e) {
    const item = e.target
    if (item.id === 'logo' || item.classList.contains('menu-icon')) {
        mouse.classList.add('nav-active')
        document.querySelector('#logo').color = '#000' 
    } else {
        mouse.classList.remove('nav-active')
    }
    if (item.classList.contains('btn')) {
        mouse.classList.add('btn-active')
        mouseTxt.innerText = 'Tap'
    } else {
        mouse.classList.remove('btn-active')
        mouseTxt.innerText = ''
    }
    if (item.classList.contains('extra')) {
        mouse.classList.add('img-active') 
    } else {
        mouse.classList.remove('img-active') 
    }
    
}

// GSAP 
let controller
let slideScene


function navToggle(e){

}

menuIcon.addEventListener('click', navToggle)
window.addEventListener('mousemove', cursor)
window.addEventListener('mouseover', activeCursor)