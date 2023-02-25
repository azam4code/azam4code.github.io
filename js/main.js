const swiper = new Swiper('.swiper', {

    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})
let mouse = document.querySelector('.cursor')
let mouseTxt = mouse.querySelector('span')

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
}

window.addEventListener('mousemove', cursor)
window.addEventListener('mouseover', activeCursor)