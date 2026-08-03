gsap.registerPlugin(ScrollTrigger);

// =========================================
// 1. PRELOADER ANIMATION
// =========================================
window.addEventListener("load", () => {
    const tl = gsap.timeline();
    tl.to("#preloader img", { opacity: 0, y: -30, duration: 0.6, ease: "power2.inOut" })
      .to("#preloader", {
          yPercent: -100, 
          duration: 1.2,
          ease: "power4.inOut", 
          onComplete: () => { document.getElementById("preloader").style.display = "none"; }
      });
});

// =========================================
// 2. GALLERY HEADER SPLIT-TEXT ANIMATION
// =========================================
gsap.utils.toArray(".reveal-text").forEach((header) => {
    const lines = header.querySelectorAll(".reveal-line");
    gsap.from(lines, {
        yPercent: 100, 
        opacity: 0,
        duration: 1,
        stagger: 0.15, 
        ease: "power4.out",
        delay: 0.8 // Delays slightly to let the preloader lift first
    });
});

// =========================================
// 3. STAGGERED ROW SCROLL REVEALS
// =========================================
gsap.utils.toArray(".gallery-row").forEach((row) => {
    gsap.from(row.children, {
        scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all" // Automatically removes GSAP inline styles once finished
    });
});

// =========================================
// 4. NAVBAR SCROLL LOGIC
// =========================================
// window.addEventListener("scroll", () => {
//     const navBar = document.getElementById("navBar");
//     const logo = document.getElementById("navBarLogo");
//     const buttons = document.querySelectorAll(".navSec2 button");

//     if (window.scrollY > 50) {
//         navBar.classList.add("navBarScrolled");
//         if (logo) logo.classList.add("navBarLogoScrolled");
//         buttons.forEach(btn => btn.classList.add("navBarButtonScrolled"));
//     } else {
//         navBar.classList.remove("navBarScrolled");
//         if (logo) logo.classList.remove("navBarLogoScrolled");
//         buttons.forEach(btn => btn.classList.remove("navBarButtonScrolled"));
//     }
// });

// =========================================
// 5. BACK TO TOP BUTTON
// =========================================
const backToTopBtn = document.getElementById("backToTopBtn2");
if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo(0, 0); 
    });
}

const homeBtn = document.getElementById("homeBtn");
const servBtn = document.getElementById("servBtn");
const abtBtn = document.getElementById("abtBtn");
const contBtn = document.getElementById("contBtn");
// const contBtn2 = document.getElementById("contBtn2");

homeBtn.addEventListener("click", () => {
    window.location.href = "/";
});

servBtn.addEventListener("click", () => {
  window.location.href = "/services";
});

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
// contBtn2.addEventListener('click', () => {
//     fifthSec.scrollIntoView({ 
//       behavior: 'smooth', 
//       block: 'start'
//     });
// });