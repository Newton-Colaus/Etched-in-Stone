// Register the ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

// =========================================
// 1. INITIAL LOAD & HERO TIMELINE
// =========================================
const tl = gsap.timeline();

// =========================================
// HERO IMAGE LOOP (COLOR SWIPE & CROSSFADE)
// =========================================
const heroSection = document.getElementById("firstSec");
const nextBgDiv = document.getElementById("nextBg"); // Our new image layer

const bgImages = [
    "/static/images/background/driveway.jpg",
    "https://images.unsplash.com/photo-1612477431581-7d0c5eeb2093?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1634979642325-8d7a87f3d6a4?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];
let currentImgIndex = 0;

function startHeroLoop() {
    // Wait 4 seconds between each transition
    const swipeTl = gsap.timeline({ delay: 4 }); 
    const nextImgIndex = (currentImgIndex + 1) % bgImages.length;
    
    // Prep the invisible background layer with the upcoming image
    nextBgDiv.style.backgroundImage = `url(${bgImages[nextImgIndex]})`;

    // 1. FAST swipe in from bottom-left (Starts at 0 seconds)
    swipeTl.to(".color-swipe", {
        clipPath: "circle(150% at 0% 100%)", 
        duration: 1, 
        ease: "power2.in" // Accelerates into the wipe
    }, 0) 
    
    // 2. Fade the image in right as the green peaks (Starts at 0.4 seconds)
    .to(nextBgDiv, {
        opacity: 1,
        duration: 0.7,
        ease: "none"
    }, 0.7) 
    
    // 3. FAST swipe out to top-right (Starts EXACTLY at 0.7s, right when Step 1 finishes)
    .to(".color-swipe", {
        clipPath: "circle(0% at 100% 0%)", 
        duration: 1,
        ease: "power2.out", // Decelerates out of the wipe
        onComplete: () => {
            // Apply the new image to the main section background
            heroSection.style.backgroundImage = `url(${bgImages[nextImgIndex]})`;
            // Instantly hide the staging layer and reset the green curtain
            gsap.set(nextBgDiv, { opacity: 0 });
            gsap.set(".color-swipe", { clipPath: "circle(0% at 0% 100%)" });
            
            // Update the index and start the loop all over again
            currentImgIndex = nextImgIndex;
            startHeroLoop();
        }
    }, 1); 
}

const abtBtn = document.getElementById("abtBtn");
const servBtn = document.getElementById("servBtn");
const gallBtn = document.getElementById("gallBtn");
const contBtn = document.getElementById("contBtn");

const navBar = document.getElementById("navBar");
const navBarLogo = document.getElementById("navBarLogo");
const navBarButtons = [servBtn, gallBtn, contBtn, abtBtn]

window.addEventListener("scroll", () => {
  if(window.scrollY > 50){
    navBar.classList.add("navBarScrolled");
    navBarLogo.classList.add("navBarLogoScrolled");
    for(i = 0; i < navBarButtons.length; i++){
      navBarButtons[i].classList.add("navBarButtonScrolled");
    };
  } else {
    navBar.classList.remove("navBarScrolled");
    navBarLogo.classList.remove("navBarLogoScrolled");
    for(i = 0; i < navBarButtons.length; i++){
      navBarButtons[i].classList.remove("navBarButtonScrolled");
    };
  }
});


// window.addEventListener("load", () => {
//     // MAIN LOAD TIMELINE
//     const tl = gsap.timeline();

//     // 1. Fade out the inner content of the preloader first (logo/spinner)
//     tl.to("#preloader > *", {
//         opacity: 0,
//         y: -30, 
//         duration: 0.6,
//         ease: "power2.inOut"
//     })
//     // 2. Slide the entire preloader background UP and away
//     .to("#preloader", {
//         yPercent: -100, 
//         duration: 1.2,
//         ease: "power4.inOut", 
//         onComplete: () => { 
//             // Remove from DOM flow so it doesn't block clicks
//             document.getElementById("preloader").style.display = "none"; 
//         }
//     })
//     // 3. Hero Section background zooms out smoothly
//     .fromTo("#firstSec", 
//         { backgroundSize: "120%" }, 
//         { backgroundSize: "100%", duration: 2.5, ease: "power2.out" }, 
//         "-=0.8" // Overlaps so the zoom is happening as the curtain rises
//     )
//     // 4. Slide Navbar Down
//     .from(".navBar", { 
//         yPercent: -100, 
//         opacity: 0, 
//         duration: 0.8, 
//         ease: "power3.out",
//         clearProps: "transform"
//     }, "-=2")
//     // 5. Reveal Main Hero Text smoothly
//     .from(["#hlC1", "#hlC2"], { 
//         y: 80, 
//         opacity: 0, 
//         duration: 1, 
//         stagger: 0.2, 
//         ease: "power4.out" 
//     }, "-=1.5")
//     // 6. Pop in the Contact/Action Button
//     .from("#contBtn2", { 
//         scale: 0.5, 
//         opacity: 0, 
//         duration: 0.6, 
//         ease: "back.out(1.7)" 
//     }, "-=1")
//     // 7. Start the continuous color swipe image loop
//     .call(startHeroLoop); 

//     // STANDALONE INFINITE ANIMATION
//     // Kept separate so the infinite loop doesn't pause the main timeline
//     gsap.from(".scrollDownIco", { 
//         y: -20, 
//         opacity: 0, 
//         duration: 1, 
//         yoyo: true, 
//         repeat: -1,
//         ease: "power1.inOut",
//         delay: 2 // Starts bouncing a couple of seconds after page load
//     });
// });

if (sessionStorage.getItem("scrollToAbout") === "true") {
    
    // 1. Immediately wipe the note from memory so it doesn't fire again on normal refreshes
    sessionStorage.removeItem("scrollToAbout");
    
    // 2. Wait exactly 1.5 seconds for the preloader to disappear
    setTimeout(() => {
        const aboutSection = document.getElementById("secondSec");
        
        if (aboutSection) {
            // Force GSAP to lock in its spacing math before we scroll
            ScrollTrigger.refresh();
            
            // Calculate the exact distance from the top, minus 80px for your fixed Navbar
            const yOffset = aboutSection.getBoundingClientRect().top + window.scrollY - 80;
            
            window.scrollTo({
                top: yOffset,
                behavior: "smooth"
            });
        }
    }, 1500); 
}


if (sessionStorage.getItem("scrollToContact") === "true") {
    
    // 1. Immediately wipe the note from memory so it doesn't fire again on normal refreshes
    sessionStorage.removeItem("scrollToContact");
    
    // 2. Wait exactly 1.5 seconds for the preloader to disappear
    setTimeout(() => {
        const aboutSection = document.getElementById("fifthSec");
        
        if (aboutSection) {
            // Force GSAP to lock in its spacing math before we scroll
            ScrollTrigger.refresh();
            
            // Calculate the exact distance from the top, minus 80px for your fixed Navbar
            const yOffset = aboutSection.getBoundingClientRect().top + window.scrollY - 80;
            
            window.scrollTo({
                top: yOffset,
                behavior: "smooth"
            });
        }
    }, 1500); 
}

// =========================================
// 2. SCROLL ANIMATIONS (ScrollTrigger)
// =========================================

// --- ABOUT SECTION (#secondSec) ---
// Wait for all custom fonts to finish downloading and rendering
// =========================================
// MASTER BOOT SEQUENCE (Waits for Images AND Fonts)
// =========================================
window.addEventListener("load", () => {
    document.fonts.ready.then(() => {
        
        // 1. EVERYTHING IS READY - HIDE PRELOADER
        const preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.classList.add("preloader-hidden");
            
            // Remove it from the DOM flow after the CSS fade finishes (0.5s)
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }

        // 2. INITIALIZE GSAP ANIMATIONS & SPLITTEXT
        // --- ABOUT SECTION (#secondSec) ---
        const secondSec = document.getElementById("secondSec");
        if (secondSec) {
            const aboutPara = document.querySelector(".div75 > div:nth-child(2) p");
            const splitAbout = new SplitText(aboutPara, { type: "lines" });

            const aboutTl = gsap.timeline({
                scrollTrigger: { trigger: secondSec, start: "top 75%" }
            });

            aboutTl.fromTo(".div25 img", 
                   { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, 
                   { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power4.inOut" } 
            )
            .from(".div75 h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.9")
            .from(splitAbout.lines, { x: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.7")
            .from(".secondSecQuote", { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.5");
        }

        // --- SERVICES CONTAINER ANIMATIONS ---
        const serviceBlocks = gsap.utils.toArray('.services');
        serviceBlocks.forEach((service, index) => {
            const img = service.querySelector('.serviceImage img');
            const heading = service.querySelector('.servicesHeading');
            const info = service.querySelector('.serviceInfo');
            
            let splitInfo;
            if (info) splitInfo = new SplitText(info, { type: "lines" });
            
            const serviceTl = gsap.timeline({
                scrollTrigger: { trigger: service, start: "top 80%", toggleActions: "play none none none" }
            });

            if (img) {
                const isImageOnRight = (index % 2 !== 0); 
                const startClip = isImageOnRight ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
                serviceTl.fromTo(img, { clipPath: startClip }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power4.inOut" });
            }
            
            if (heading) serviceTl.from(heading, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.9");
            if (info && splitInfo.lines) serviceTl.from(splitInfo.lines, { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.7");
        });

        // 3. FORCE GSAP TO RECALCULATE POSITIONS (Crucial after font loading)
        ScrollTrigger.refresh();

        // 4. HANDLE CROSS-PAGE SCROLLING
        // Wait just slightly longer than the preloader fade to ensure a smooth jump
        const targetSectionId = sessionStorage.getItem("scrollToSection");
        if (targetSectionId) {
            sessionStorage.removeItem("scrollToSection");
            setTimeout(() => {
                const section = document.getElementById(targetSectionId);
                if (section) {
                    const yOffset = section.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: yOffset, behavior: "smooth" });
                }
            }, 600); // Triggers right after the 500ms preloader fade finishes
        }
        
    });
});

// Stagger the service items sliding up
gsap.from(".services", {
    scrollTrigger: { trigger: ".servicesContainer", start: "top 75%" },
    y: 100, opacity: 0, duration: 0.8, stagger: 0.3, ease: "power2.out"
});

// --- GALLERY SECTION (#fourthSec) ---
gsap.from(".fourthSecImages img", {
    scrollTrigger: { trigger: "#fourthSec", start: "top 70%" },
    scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
});

// --- CONTACT SECTION (#fifthSec) ---
const contactTl = gsap.timeline({
    scrollTrigger: { trigger: "#fifthSec", start: "top 75%" }
});

contactTl.from(".fifthSecHeader span", { y: -30, opacity: 0, duration: 0.6 })
         .from(".fifthSecFormImg", { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
         .from(".fifthSecContactForm", { x: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
         .from(".fifthSecCFormInp", { x: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4");

// --- FOOTER SECTION (#sixthSec) ---
gsap.from(".sixthSecLinks, .sixthSecLinks1, .sixthSecLinks2, .sixthSecLogo", {
    scrollTrigger: { trigger: "#sixthSec", start: "top 90%" },
    y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out"
});

// =========================================
// 3. FLOATING SHAPES DECORATION
// =========================================
// Make all decorative shapes continuously float to feel "alive"
// gsap.to(".shapes", {
//     y: 15,
//     rotation: 2,
//     duration: 3,
//     yoyo: true,
//     repeat: -1,
//     ease: "sine.inOut",
//     stagger: 0.5 // Offset their floating so they don't move exactly together
// });

// =========================================
// 4. BACK TO TOP BUTTON LOGIC
// =========================================
const backToTop = document.getElementById("backToTopBtn");
backToTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
});



abtBtn.addEventListener('click', () => {
    secondSec.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
});

servBtn.addEventListener("click", () => {
  window.location.href = "/services";
});

gallBtn.addEventListener('click', () => {
  window.location.href = "/gallery";
});

contBtn.addEventListener('click', () => {
    fifthSec.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
});

contBtn2.addEventListener('click', () => {
    fifthSec.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
});

// Bouncing Scroll Down Indicator
gsap.to(".scrollDownIco img", { y: 15, repeat: -1, yoyo: true, duration: 1, ease: "power1.inOut" });