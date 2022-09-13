import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
// animate menu items
const menuItems = document.querySelectorAll('.logo-img, .menu-item, .top-social-section')
const textTimeLine = gsap.timeline()
window.addEventListener('load', () => {
    gsap.from(menuItems, 
        {
            opacity:0,
            y:-50,
            scale: 0,
            rotateX: 180,
            stagger: 0.1,
            duration: 1.5,
            ease: 'elastic.out(1,0.3)'
        }
    )
})

// animate all the sections
const sections = document.querySelectorAll('section')
for (const section of sections) {
    gsap.from(section.querySelectorAll('.content > *'), 
        {
            scrollTrigger: {
                trigger: section,
                start: 'top center',
            },
            opacity:0,
            y: 100,
            scale: 0.75,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out'
        }
    )
}

// animate drop down menu
const dropDownMenu = document.querySelector('.drop-down-menu')
const dropDownMenuItems = dropDownMenu.querySelectorAll('.drop-down-item')
let dropDownMenuAnim
document.querySelector('.drop-down').addEventListener('mouseenter', () => {
    if(window.innerWidth <= 400) return
    dropDownMenuAnim = gsap.fromTo(dropDownMenuItems,
        {
            opacity: 0,
            y: -20,
        },
        {
            opacity: 1,
            y: 0,
            onStart: () => {dropDownMenu.style.visibility = 'visible'},
            onReverseComplete: () => {dropDownMenu.style.visibility = 'hidden'},
            stagger: 0.1,
            duration: 0.5
        }
    ) 
})
document.querySelector('.drop-down').addEventListener('mouseleave', () => {
    if(window.innerWidth <= 400) return
    dropDownMenuAnim.reverse()
})

// animate social drop down menu
const socialContainer = document.querySelector('.social-items')
const socialItems = socialContainer.querySelectorAll('.social-item')
let socialAnimation
document.querySelector('.top-social-section').addEventListener('mouseenter', (e) => {
    if(window.innerWidth <= 400) return
    socialAnimation = gsap.fromTo(socialItems,
        {
            y: -35
        },
        {
            opacity: 1,
            y: 0,
            onStart: () => {socialContainer.style.visibility = 'visible'},
            onReverseComplete: () => {socialContainer.style.visibility = 'hidden'},
            stagger: 0.05,
            duration: 0.1,
            ease: 'power1.out'
        }
    )
})
document.querySelector('.top-social-section').addEventListener('mouseleave', () => {
    if(window.innerWidth <= 400) return
    socialAnimation.reverse()
})
for (let item of socialItems) {
    let anim
    item.addEventListener('mouseenter', (e) => {
        anim = gsap.fromTo(item, 
            {
                scale: 1
            },
            {
                scale:1.25, 
                duration: 0.25,
                ease: 'power1.out'
            }
        )
    })
    item.addEventListener('mouseleave', () => {
        anim.reverse()
    })
}

document.querySelector('.burger').addEventListener('click', (e) => {
    const menu = document.querySelector('nav > .menu-container')
    if (menu.style.transform != 'translateX(0px)'){
        menu.style.transform = 'translateX(0)'
        gsap.fromTo('.menu-item,.drop-down-item,.social-item',
            {
                opacity:0
            }, 
            {
                opacity:1,
                stagger: 0.1,
                duration: 0.25
            }
        )
        document.querySelector('.burger').classList.add('toggle')
    }
    else{
        document.querySelector('.burger').classList.remove('toggle')
        menu.style.transform = 'translateX(100%)'
    }
})

window.addEventListener('resize', (e)=>{
    if(e.target.innerWidth  <= 400){
        dropDownMenu.style.visibility = 'visible'
        socialContainer.style.visibility = 'visible'
    }
    else {
        document.querySelector('.burger').classList.remove('toggle')
        dropDownMenu.style.visibility = 'hidden'
        socialContainer.style.visibility = 'hidden'
        if (document.querySelector('nav > .menu-container').style.transform)
            document.querySelector('nav > .menu-container').style.transform = ''
    }
})