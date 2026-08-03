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
if(abtBtn) abtBtn.addEventListener("click", () => { window.location.href = "/"; });
if(gallBtn) gallBtn.addEventListener("click", () => { window.location.href = "/gallery"; });
if(contBtn) contBtn.addEventListener("click", () => { window.location.href = "/"; });

// --- MAIN GSAP ANIMATIONS ---
window.addEventListener('load', function() {
    
    // Register Plugin AFTER window loads to prevent undefined errors
    gsap.registerPlugin(ScrollTrigger);
    
    // 1. PRELOADER ANIMATION
    const tl = gsap.timeline();
    
    tl.to(".preloader-img", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: 0.4,
        ease: "power2.inOut"
    })
    .to(".curtain-left", {
        x: "-100%",
        duration: 1.2,
        ease: "power4.inOut"
    }, "-=0.1")
    .to(".curtain-right", {
        x: "100%",
        duration: 1.2,
        ease: "power4.inOut"
    }, "-=1.2")
    .set("#preloader", {
        display: "none"
    });

    // Initial Navbar Fade-in (Using fromTo to strictly enforce y: 0)
    gsap.fromTo(".navBar", 
        { opacity: 0, y: 0 }, 
        { opacity: 1, y: 0, duration: 1.2, delay: 1.2, ease: "power4.out" }
    );

    // 2. SCROLL ANIMATIONS (Excludes .shapes AND .midServImage)
    
    // Animate every Service container dynamically
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

        // Alternate slide-in directions based on odd/even index
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

    // Animate the Footer gracefully
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

    // Force recalculation after setup to ensure mobile triggers map correctly
    ScrollTrigger.refresh();
});