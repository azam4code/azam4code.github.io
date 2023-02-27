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

function animateSlide(){
    controller = new ScrollMagic.Controller()
    const slides = document.querySelectorAll('.animate-parent')
    const nav = document.querySelector('header') 
    const footer = document.querySelector('footer')
    const arrow = document.querySelector('.contact__icon')

    slides.forEach(slide => {
        const revealContent = slide.querySelectorAll('.reveal-content')
        const revealImg = slide.querySelector('.reveal-img')
        const img = slide.querySelector('.work-img')

        const slideTl = gsap.timeline({
            defaults: {duration:1, ease: 'power2.inOut'}
        })
        slideTl.fromTo(nav, {y: '-100%'}, {y: '0%'})
        slideTl.fromTo(revealContent, {x: '0%'}, {x: '100%'}) 
        slideTl.fromTo(revealImg, {x: '0%'}, {x: '100%'}) 
        slideTl.fromTo(img, {scale: '0'}, {scale: '1'}, '-=1') 
        slideTl.fromTo(arrow, {opacity: '0'}, {opacity: '1'}) 
        slideTl.fromTo(footer, {opacity: '0'}, {opacity: '1'} , '-=1')
        
        slideScene = new ScrollMagic.Scene({
            triggerElement : slide,
            triggerHook: 0.5 ,
            reverse: false
        })
        .setTween(slideTl)
        .addIndicators({colorStart: 'white', colorTrigger: 'white', name : 'slide'})
        .addTo(controller)
    })
}

animateSlide()

function navToggle(e){

}

menuIcon.addEventListener('click', navToggle)
window.addEventListener('mousemove', cursor)
window.addEventListener('mouseover', activeCursor)