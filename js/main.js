const loader = document.querySelector('.preloader-div')
// window.addEventListener('load', function(){
//     loader.style.display = 'none' 
// }) 

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

const loaderTl = gsap.timeline({
    defaults: {duration:3, ease: 'power2.inOut'}
}) 
loaderTl.to(loader, {opacity: 0 })
loaderTl.to(loader, {visibility: 'hidden' })


// GSAP 
let controller
let slideScene 

function animateSlide(){
    controller = new ScrollMagic.Controller()
    const slides = document.querySelectorAll('.animate-parent')
    const nav = document.querySelector('header') 
    const footer = document.querySelector('footer') 
 

    slides.forEach((slide, index, slides) => {
        const revealContent = slide.querySelectorAll('.reveal-content')
        const revealImg = slide.querySelector('.reveal-img')
        const img = slide.querySelector('.work-img')

        const slideTl = gsap.timeline({
            defaults: {duration:1, delay: 1, ease: 'power2.inOut'}
        }) 
         
        
        slideTl.fromTo(revealContent, {x: '0%'}, {x: '200%'} )
        slideTl.fromTo(img, {scale: '0'}, {scale: '1'} ) 
        slideTl.fromTo(nav, {y: '-100%'}, {y: '0%'}, '-=1') 
        slideTl.fromTo(footer, {scale: '0'}, {scale: '1'},  '-=3')
        
        slideScene = new ScrollMagic.Scene({
            triggerElement : slide,
            triggerHook: 0.75,
            reverse: false
        })
        .setTween(slideTl)
        // .addIndicators({colorStart: 'white', colorTrigger: 'white', name : 'slide'})
        .addTo(controller)  
    })
}

animateSlide() 

function navToggle(e){
    if(!e.target.classList.contains('active')){
        e.target.classList.add('active')
        gsap.to('.line1', .5, {rotate: '45', y: 5, background: '#202022'})
        gsap.to('.line2', .5, {rotate: '-45', y: -5, width: '100%', background: '#202022'})
        gsap.to('.menu-popup', .5, {clipPath: 'circle(2500px at 100% -10%'})
        gsap.to(mouse, .5, {border: "1px solid #202022"})
        document.body.classList.add('hide-overflow')
    } else{
        e.target.classList.remove('active')
        gsap.to('.line1', .5, {rotate: '0', y: 0, background: '#d9d9d9'})
        gsap.to('.line2', .5, {rotate: '0', y: 0, width: '70%', background: '#d9d9d9'})
        gsap.to('.menu-popup', .5, {clipPath: 'circle(50px at 100% -10%'})
        gsap.to(mouse, .5, {border: "1px solid #d9d9d9"})
        document.body.classList.remove('hide-overflow')
    }
    

}

menuIcon.addEventListener('click', navToggle)
window.addEventListener('mousemove', cursor)
window.addEventListener('mouseover', activeCursor)