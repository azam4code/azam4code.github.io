// Loader Animation
const loader = document.querySelector('.preloader')
const loaderTl = gsap.timeline({
  defaults: { duration: 3, ease: 'power3.inOut' }
})

// Fading out the loader element
loaderTl.to(loader, { opacity: 0 })
loaderTl.to(loader, { visibility: 'hidden' })

// Swiper slider configuration
const swiper = new Swiper('.swiper', {
  loop: true,

  // Navigation arrow configuration
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})

// Cursor elements
const mouse = document.querySelector('.cursor')
const mouseTxt = mouse.querySelector('span')
const menuIcon = document.querySelector('.menu-icon')

// Function to move the cursor based on mouse movement
function cursor(e) {
  mouse.style.top = e.pageY + 'px'
  mouse.style.left = e.pageX + 'px'
}

// Function to update the active state of the cursor based on the target element
function activeCursor(e) {
  const item = e.target

  if (item.id === 'logo' || item.classList.contains('menu-icon')) {
    // Adding nav-active class to the cursor and changing logo color
    mouse.classList.add('nav-active')
    document.querySelector('#logo').color = '#000'
  } else {
    mouse.classList.remove('nav-active')
  }

  if (item.classList.contains('btn')) {
    // Adding btn-active class to the cursor and changing text to Tap
    mouse.classList.add('btn-active')
    mouseTxt.innerText = 'Tap'
  } else {
    mouse.classList.remove('btn-active')
    mouseTxt.innerText = ''
  }

  if (item.classList.contains('extra')) {
    // Adding img-active class to the cursor
    mouse.classList.add('img-active')
  } else {
    mouse.classList.remove('img-active')
  }
}

// Selecting elements to be animated with GSAP
const slides = document.querySelectorAll('.animate-parent')
const nav = document.querySelector('header')
const footer = document.querySelector('footer')

let controller
let slideScene

// Function to animate the selected elements
function animateSlide() {
  controller = new ScrollMagic.Controller()

  slides.forEach((slide) => {
    const revealContent = slide.querySelectorAll('.reveal-content')
    const revealImg = slide.querySelector('.reveal-img')
    const img = slide.querySelector('.work-img')

    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: 'power2.inOut' }
    })

    // Animating slide elements
    slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%' }, '-=1')
    slideTl.fromTo(img, { scale: '0' }, { scale: '1' })
    slideTl.fromTo(revealContent, { x: '0%' }, { x: '110%' })
    slideTl.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=1')
    slideTl.fromTo(footer, { scale: '0' }, { scale: '1' }, '-=3')

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.75,
      reverse: false
    })
      .setTween(slideTl)
      // .addIndicators({colorStart: 'white', colorTrigger: 'white', name : 'slide'})
      .addTo(controller)
  })
}

animateSlide()


// Function to handle navigation toggling
function navToggle(e) {
  if (!e.target.classList.contains('active')) {
    // Adding active class and animating menu open state
    e.target.classList.add('active')
    nav.classList.add('active')
    gsap.to('.line1', 0.5, { background: '#202022' })
    gsap.to('.line2', 0.5, { width: '100%', background: '#202022' })
    gsap.to('.menu-popup', 0.5, { clipPath: 'circle(2500px at 100% -10%' })
    gsap.to(mouse, 0.5, { border: '1px solid #202022' })
    document.body.classList.add('hide-overflow')
  } else {
    // Removing active class and animating menu close state
    e.target.classList.remove('active')
    nav.classList.remove('active')
    gsap.to('.line1', 0.5, { background: '#d9d9d9' })
    gsap.to('.line2', 0.5, { width: '70%', background: '#d9d9d9' })
    gsap.to('.menu-popup', 0.5, { clipPath: 'circle(50px at 100% -10%' })
    gsap.to(mouse, 0.5, { border: '1px solid #d9d9d9' })
    document.body.classList.remove('hide-overflow')
  }

  // Checking if media query condition is true and updating DOM accordingly
  const mediaQuery = window.matchMedia('(max-width: 450px)')
  if (mediaQuery.matches && menuIcon.classList.contains('active')) {
    const d = (document.querySelector('.line2').style.transform =
      'rotate(-45deg) translateY(-2px) !important')
  }
}

// Event listener for navigation toggle
menuIcon.addEventListener('click', navToggle)

// Event listeners for cursor movement and active state updates
window.addEventListener('mousemove', cursor)
window.addEventListener('mouseover', activeCursor)
