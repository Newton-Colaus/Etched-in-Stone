// Variable Declarations
const backToTopBtn2 = document.getElementById("backToTopBtn2");
const homeBtn = document.getElementById("homeBtn");
const gallBtn = document.getElementById("gallBtn");
const abtBtn = document.getElementById("abtBtn");
const contBtn = document.getElementById("contBtn");

// Event Listeners for Buttons
if(backToTopBtn2) {
    backToTopBtn2.addEventListener("click", () => {
        window.scrollTo({top:0, behavior: "smooth"});
    });
}
if(homeBtn) homeBtn.addEventListener("click", () => { window.location.href = "/"; });
// if(abtBtn) abtBtn.addEventListener("click", () => { window.location.href = "/#about"; });
if (abtBtn) {
    abtBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Stops any default jumping behavior
        
        if (document.getElementById("secondSec")) {
            // If we are already on the Home page, just scroll down smoothly
            document.getElementById("secondSec").scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // If we are on the Gallery/Services page, save a note to memory and redirect
            sessionStorage.setItem("scrollToAbout", "true");
            window.location.href = "/";
        }
    });
}

if (contBtn) {
    contBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Stops any default jumping behavior
        
        if (document.getElementById("fifthSec")) {
            // If we are already on the Home page, just scroll down smoothly
            document.getElementById("fifthSec").scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // If we are on the Gallery/Services page, save a note to memory and redirect
            sessionStorage.setItem("scrollToContact", "true");
            window.location.href = "/";
        }
    });
}
if(gallBtn) gallBtn.addEventListener("click", () => { window.location.href = "/gallery"; });
// if(contBtn) contBtn.addEventListener("click", () => { window.location.href = "/"; });


// =========================================
// PHASE 1: INSTANT PRELOADER (Runs immediately)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    
    const tl = gsap.timeline();
    
    tl.to(".preloader-img", {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        delay: 0.2, // Starts almost instantly
        ease: "power2.inOut"
    })
    .to(".curtain-left", {
        xPercent: -100,
        // THE FIX: Adds a shadow as it moves so you can see it against the white page
        boxShadow: "20px 0px 40px rgba(0,0,0,0.15)", 
        duration: 1.2,
        ease: "power4.inOut"
    }, "-=0.1")
    .to(".curtain-right", {
        xPercent: 100,
        boxShadow: "-20px 0px 40px rgba(0,0,0,0.15)", 
        duration: 1.2,
        ease: "power4.inOut"
    }, "<") // Syncs perfectly with the left curtain
    .set("#preloader", {
        display: "none"
    });

    // Initial Navbar Fade-in
    gsap.fromTo(".navBar", 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 1.2, delay: 0.8, ease: "power4.out" }
    );
});


// =========================================
// PHASE 2: SCROLL ANIMATIONS (Waits for heavy images)
// =========================================
window.addEventListener('load', function() {
    
    gsap.registerPlugin(ScrollTrigger);

    // 1. Animate every Service container dynamically
    gsap.utils.toArray(".serv").forEach((serv, index) => {
        const info = serv.querySelector(".servInfo");
        const img = serv.querySelector(".servImage");
        const bottomLeft = serv.querySelector(".bIleft");
        const bottomRight = serv.querySelector(".bIright");

        const servTl = gsap.timeline({
            scrollTrigger: {
                trigger: serv,
                start: "top 75%", 
                toggleActions: "play none none reverse" 
            }
        });

        const isEven = index % 2 === 0;
        const xOffset = isEven ? -100 : 100;

        servTl.fromTo(info, 
            { x: xOffset, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
        )
        .fromTo(img, 
            { x: -xOffset, opacity: 0, scale: 0.95 },
            { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" }, 
            "<0.2"
        ) 
        .fromTo([bottomLeft, bottomRight], 
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }, 
            "-=0.6"
        );
    });

    // 2. FADE-IN FOR DIVIDER IMAGES
    gsap.utils.toArray(".midServImage").forEach((img) => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 85%", 
                toggleActions: "play none none reverse"
            },
            y: 40,            
            opacity: 0,       
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // 3. Animate the Footer gracefully
    const footerTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#sixthSec",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    const footerElements = gsap.utils.toArray("#sixthSec > div:not(#copyright)");

    footerTl.fromTo(footerElements, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "back.out(1.2)" }
    )
    .fromTo("#copyright", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 
        "-=0.5"
    );

    ScrollTrigger.refresh();
});