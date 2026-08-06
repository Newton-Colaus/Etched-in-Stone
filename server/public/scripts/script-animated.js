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
    const swipeTl = gsap.timeline({ delay: 4 }); 
    const nextImgIndex = (currentImgIndex + 1) % bgImages.length;
    
    // Prep the staging layer with the upcoming image
    nextBgDiv.style.backgroundImage = `url(${bgImages[nextImgIndex]})`;

    // 1. SETUP IMAGE LAYER (Starts hidden with 0px width)
    gsap.set(nextBgDiv, { 
        opacity: 1, 
        clipPath: "polygon(0px 0px, 0px 0px, 0px 100%, 0px 100%)",
        zIndex: 1 
    });

    // 2. SETUP THE FADED COLOR TRAIL
    // We convert the color-swipe into a moving gradient block instead of a clip-path
    gsap.set(".color-swipe", { 
        clipPath: "none", 
        width: "80vw",    // The length of the trail! (40% of the screen)
        height: "100%",
        position: "absolute",
        top: 0,
        left: "-80vw",    // Start completely hidden off-screen to the left
        
        // 🎨 GRADIENT BUILD-UP: Fades from transparent on the left, to solid on the right.
        // Replace '255, 255, 255' with the RGB values of your brand color!
        background: "linear-gradient(to right, rgba(210, 81, 0,0) 0%, rgba(210, 81, 0,0.7) 70%, rgba(210, 81, 0,1) 100%)",
        
        opacity: 1, 
        zIndex: 2         // Sits directly ON TOP of the image edge to hide the hard line
    });

    // 3. THE PROXY ANIMATION
    // This perfectly syncs the faded color trail with the image reveal
    const wipeProxy = { progress: 0 };

    swipeTl.to(wipeProxy, {
        progress: 100,
        duration: 1.8,        // Slightly longer duration smooths out the motion
        ease: "power3.inOut", // power3 has a much silkier, smoother curve than power2
        onUpdate: () => {
            // Calculate dynamic pixel dimensions so it remains perfectly responsive
            const totalW = heroSection.offsetWidth;
            const trailW = totalW * 0.8; // Matches the 40vw width set above

            // Calculate the exact pixel position of the leading edge
            const currentLeadingEdge = (wipeProxy.progress / 100) * (totalW + trailW);

            // Move the faded color trail smoothly across the screen
            gsap.set(".color-swipe", { x: currentLeadingEdge });

            // Move the image reveal EXACTLY with the solid edge of the color trail.
            // Math.min clamps it so the polygon doesn't break once it clears the screen.
            const clipX = Math.min(currentLeadingEdge, totalW);
            nextBgDiv.style.clipPath = `polygon(0px 0px, ${clipX}px 0px, ${clipX}px 100%, 0px 100%)`;
        },
        onComplete: () => {
            // Apply the new image to the main background
            heroSection.style.backgroundImage = `url(${bgImages[nextImgIndex]})`;
            
            // Hide everything to prep for the next cycle
            gsap.set([nextBgDiv, ".color-swipe"], { opacity: 0 });
            
            currentImgIndex = nextImgIndex;
            startHeroLoop();
        }
    }); 
}

const abtBtn = document.getElementById("abtBtn");
const servBtn = document.getElementById("servBtn");
const gallBtn = document.getElementById("gallBtn");
const contBtn = document.getElementById("contBtn");

const navBar = document.getElementById("navBar");
const navBarLogo = document.getElementById("navBarLogo");
const navBarButtons = [servBtn, gallBtn, contBtn, abtBtn]

// =========================================
// MOBILE HAMBURGER MENU LOGIC
// =========================================
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navSec2 = document.querySelector(".navSec2");

if (hamburgerBtn && navSec2) {
    // Toggle menu on click
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("active");
        navSec2.classList.toggle("active");
        
        // Prevent body scrolling when menu is open
        if (navSec2.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    // Close menu automatically when any navigation button is clicked
    navBarButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            hamburgerBtn.classList.remove("active");
            navSec2.classList.remove("active");
            document.body.style.overflow = ""; // Restore scrolling
        });
    });
}

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
// =========================================
// MASTER BOOT SEQUENCE & ANIMATIONS
// =========================================
window.addEventListener("load", () => {
    document.fonts.ready.then(() => {

        // 1. MAIN LOAD TIMELINE (Preloader & Hero Reveal)
        const mainTl = gsap.timeline();

        // Fade out the inner content of the preloader first (logo/spinner)
        mainTl.to("#preloader > *", {
            opacity: 0,
            y: -30, 
            duration: 0.6,
            ease: "power2.inOut"
        })
        // Slide the entire preloader background UP and away
        .to("#preloader", {
            yPercent: -100, 
            duration: 1.2,
            ease: "power4.inOut", 
            onComplete: () => { 
                // Remove from DOM flow so it doesn't block clicks
                const preloader = document.getElementById("preloader");
                if (preloader) preloader.style.display = "none"; 
            }
        })
        // Hero Section background zooms out smoothly
        .fromTo("#firstSec", 
            { backgroundSize: "120%" }, 
            { backgroundSize: "100%", duration: 2.5, ease: "power2.out" }, 
            "-=0.8" // Overlaps so the zoom is happening as the curtain rises
        )
        // Slide Navbar Down
        .from(".navBar", { 
            yPercent: -100, 
            opacity: 0, 
            duration: 0.8, 
            ease: "power3.out",
            clearProps: "transform" // Removes GSAP styling so responsive CSS works correctly
        }, "-=2")
        // Reveal Main Hero Text smoothly
        .from(["#hlC1", "#hlC2"], { 
            y: 80, 
            opacity: 0, 
            duration: 1, 
            stagger: 0.2, 
            ease: "power4.out" 
        }, "-=1.5")
        // Pop in the Contact/Action Button
        .from("#contBtn2", { 
            scale: 0.5, 
            opacity: 0, 
            duration: 0.6, 
            ease: "back.out(1.7)" 
        }, "-=1")
        // Start the continuous image loop safely
        .call(() => {
            if (typeof startHeroLoop === 'function') startHeroLoop();
        }); 

        // 2. STANDALONE INFINITE ANIMATION
        // Kept separate so the infinite loop doesn't pause or block the main timeline
        gsap.from(".scrollDownIco", { 
            y: -20, 
            opacity: 0, 
            duration: 1, 
            yoyo: true, 
            repeat: -1,
            ease: "power1.inOut",
            delay: 2 // Starts bouncing a couple of seconds after page load
        });

        // 3. SCROLL-TRIGGERED ANIMATIONS
        // --- ABOUT SECTION (#secondSec) ---
        const secondSec = document.getElementById("secondSec");
        if (secondSec) {
            const aboutPara = document.querySelector(".div75 > div:nth-child(2) p");
            let splitAbout;
            
            // Safety check to prevent SplitText fatal errors
            if (aboutPara) {
                splitAbout = new SplitText(aboutPara, { type: "lines" });
            }

            const aboutTl = gsap.timeline({
                scrollTrigger: { trigger: secondSec, start: "top 75%" }
            });

            aboutTl.fromTo(".div25 img", 
                   { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, 
                   { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power4.inOut" } 
            )
            .from(".div75 h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.9");
            
            if (splitAbout && splitAbout.lines) {
                aboutTl.from(splitAbout.lines, { x: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.7");
            }
            
            aboutTl.from(".secondSecQuote", { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.5");
        }

        // --- SERVICES CONTAINER ANIMATIONS ---
        const serviceBlocks = gsap.utils.toArray('.services');
        serviceBlocks.forEach((service, index) => {
            const img = service.querySelector('.serviceImage img');
            const heading = service.querySelector('.servicesHeading');
            const info = service.querySelector('.serviceInfo');
            
            let splitInfo;
            if (info) {
                splitInfo = new SplitText(info, { type: "lines" });
            }
            
            const serviceTl = gsap.timeline({
                scrollTrigger: { trigger: service, start: "top 80%", toggleActions: "play none none none" }
            });

            if (img) {
                // Dynamically alternate wipe direction based on layout structure
                const isImageOnRight = (index % 2 !== 0); 
                const startClip = isImageOnRight ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
                
                serviceTl.fromTo(img, 
                    { clipPath: startClip }, 
                    { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power4.inOut" }
                );
            }
            
            if (heading) {
                serviceTl.from(heading, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.9");
            }
            if (info && splitInfo && splitInfo.lines) {
                serviceTl.from(splitInfo.lines, { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.7");
            }
        });

        // 4. FORCE GSAP TO RECALCULATE POSITIONS 
        // Crucial step: Updates triggers after custom fonts alter the geometry of the page
        ScrollTrigger.refresh();

        // 5. HANDLE CROSS-PAGE SCROLLING
        const targetSectionId = sessionStorage.getItem("scrollToSection");
        if (targetSectionId) {
            sessionStorage.removeItem("scrollToSection");
            setTimeout(() => {
                const section = document.getElementById(targetSectionId);
                if (section) {
                    const yOffset = section.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: yOffset, behavior: "smooth" });
                }
            }, 1200); // Delayed to wait for the 1.2s preloader curtain animation to completely finish
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