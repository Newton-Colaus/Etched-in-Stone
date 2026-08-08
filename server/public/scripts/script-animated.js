// Register the GSAP Plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// =========================================
// DOM ELEMENTS & GLOBALS
// =========================================
const heroSection = document.getElementById("firstSec");
const nextBgDiv = document.getElementById("nextBg");

const abtBtn = document.getElementById("abtBtn");
const servBtn = document.getElementById("servBtn");
const gallBtn = document.getElementById("gallBtn");
const contBtn = document.getElementById("contBtn");
const contBtn2 = document.getElementById("contBtn2");

const navBar = document.getElementById("navBar");
const navBarLogo = document.getElementById("navBarLogo");
const navBarButtons = [servBtn, gallBtn, contBtn, abtBtn];

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navSec2 = document.querySelector(".navSec2");

// =========================================
// HERO IMAGE LOOP (COLOR SWIPE)
// =========================================
const bgImages = [
    "https://q8w2ldusbcmjarkb.public.blob.vercel-storage.com/images/pavement.png",
    "https://q8w2ldusbcmjarkb.public.blob.vercel-storage.com/images/driveway.png",
    "https://q8w2ldusbcmjarkb.public.blob.vercel-storage.com/images/pool.png"
];
let currentImgIndex = 0;

function startHeroLoop() {
    const swipeTl = gsap.timeline({ delay: 4 }); 
    const nextImgIndex = (currentImgIndex + 1) % bgImages.length;
    const currentBgDiv = document.getElementById("currentBg");
    
    nextBgDiv.style.backgroundImage = `url(${bgImages[nextImgIndex]})`;

    // 1. Slow zoom on currentBg while waiting for the swipe to trigger (4 seconds)
    gsap.to(currentBgDiv, {
        scale: "+=0.03",
        duration: 4,
        ease: "none"
    });

    // Set initial state for incoming background image
    gsap.set(nextBgDiv, { 
        opacity: 1, 
        scale: 1, // Starts fresh and gentle
        clipPath: "polygon(0px 0px, 0px 0px, 0px 100%, 0px 100%)",
        zIndex: 1 
    });

    gsap.set(".color-swipe", { 
        clipPath: "none", 
        width: "80vw",    
        height: "100%",
        position: "absolute",
        top: 0,
        left: "-80vw",    
        // background: "linear-gradient(to right, rgba(210, 81, 0,0) 0%, rgba(0, 39, 102,0.7) 70%, rgba(0, 39, 102,1) 100%)",
        background: "linear-gradient(to right, rgba(210, 81, 0,0) 0%, rgba(181, 179, 179, 0.7) 70%, rgb(172, 168, 168) 100%)",
        opacity: 1, 
        zIndex: 2         
    });

    const wipeProxy = { progress: 0 };

    // 2. Incoming image starts zooming in slowly the moment the swipe loads/starts (1.8s)
    swipeTl.to(nextBgDiv, {
        scale: 1.05,
        duration: 1.8,        
        ease: "power1.out"
    }, 0);

    // Keep currentBg zooming smoothly during the swipe as well
    swipeTl.to(currentBgDiv, {
        scale: "+=0.015",
        duration: 1.8,
        ease: "none"
    }, 0);

    // 3. Color Swipe Transition
    swipeTl.to(wipeProxy, {
        progress: 100,
        duration: 1.8,        
        ease: "power3.inOut", 
        onUpdate: () => {
            const totalW = heroSection.offsetWidth;
            const trailW = totalW * 0.8; 
            const currentLeadingEdge = (wipeProxy.progress / 100) * (totalW + trailW);

            gsap.set(".color-swipe", { x: currentLeadingEdge });

            const clipX = Math.min(currentLeadingEdge, totalW);
            nextBgDiv.style.clipPath = `polygon(0px 0px, ${clipX}px 0px, ${clipX}px 100%, 0px 100%)`;
        },
        onComplete: () => {
            // Capture the exact scale nextBg reached so there is zero abrupt reset/jump
            const finalScale = gsap.getProperty(nextBgDiv, "scale");

            currentBgDiv.style.backgroundImage = `url(${bgImages[nextImgIndex]})`;
            gsap.set(currentBgDiv, { scale: finalScale }); // Seamless scale handover

            gsap.set([nextBgDiv, ".color-swipe"], { opacity: 0 });
            currentImgIndex = nextImgIndex;
            startHeroLoop();
        }
    }, 0); 
}

// =========================================
// UI INTERACTIONS (Nav & Mobile Menu)
// =========================================
if (hamburgerBtn && navSec2) {
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("active");
        navSec2.classList.toggle("active");
        
        if (navSec2.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    navBarButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navSec2.classList.remove("active");
                document.body.style.overflow = ""; 
            });
        }
    });
}

window.addEventListener("scroll", () => {
  // Existing Navbar Scroll Logic
  if(window.scrollY > 50){
    navBar.classList.add("navBarScrolled");
    navBarLogo.classList.add("navBarLogoScrolled");
    navBarButtons.forEach(btn => { if(btn) btn.classList.add("navBarButtonScrolled"); });
  } else {
    navBar.classList.remove("navBarScrolled");
    navBarLogo.classList.remove("navBarLogoScrolled");
    navBarButtons.forEach(btn => { if(btn) btn.classList.remove("navBarButtonScrolled"); });
  }

  // NEW: Back to Top Button Logic
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
      if (window.scrollY > 400) { // Shows up after scrolling 400px down
          backToTopBtn.classList.add("show");
      } else {
          backToTopBtn.classList.remove("show");
      }
  }
});

// =========================================
// BUTTON ROUTING
// =========================================
if (abtBtn) abtBtn.addEventListener('click', () => { document.getElementById("secondSec").scrollIntoView({ behavior: 'smooth', block: 'start' }); });
if (servBtn) servBtn.addEventListener("click", () => { window.location.href = "/services"; });
if (gallBtn) gallBtn.addEventListener('click', () => { window.location.href = "/gallery"; });
if (contBtn) contBtn.addEventListener('click', () => { document.getElementById("fifthSec").scrollIntoView({ behavior: 'smooth', block: 'start' }); });
if (contBtn2) contBtn2.addEventListener('click', () => { document.getElementById("fifthSec").scrollIntoView({ behavior: 'smooth', block: 'start' }); });

const backToTop = document.getElementById("backToTopBtn");
if (backToTop) backToTop.addEventListener("click", () => { window.scrollTo(0, 0); });

// =========================================
// MASTER BOOT SEQUENCE & GSAP ANIMATIONS
// =========================================
window.addEventListener("load", () => {
    document.fonts.ready.then(() => {

        // 1. MAIN LOAD TIMELINE (Preloader & Hero)
        const mainTl = gsap.timeline();

        mainTl.to("#preloader > *", { opacity: 0, y: -30, duration: 0.6, ease: "power2.inOut" })
        .to("#preloader", { yPercent: -100, duration: 1.2, ease: "power4.inOut", onComplete: () => { 
            const preloader = document.getElementById("preloader");
            if (preloader) preloader.style.display = "none"; 
        }})
        .fromTo("#currentBg", { scale: 1.2 }, { scale: 1, duration: 2.5, ease: "power2.out" }, "-=0.8")
        .from(".navBar", { yPercent: -100, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "transform" }, "-=2")
        .from(["#hlC1", "#hlC2"], { y: 80, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out" }, "-=1.5")
        .from("#contBtn2", { scale: 0.5, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=1")
        .call(() => { if (typeof startHeroLoop === 'function') startHeroLoop(); }); 

        gsap.from(".scrollDownIco", { y: -20, opacity: 0, duration: 1, yoyo: true, repeat: -1, ease: "power1.inOut", delay: 2 });
        gsap.to(".scrollDownIco img", { y: 15, repeat: -1, yoyo: true, duration: 1, ease: "power1.inOut" });

        // 2. SCROLL-TRIGGERED ANIMATIONS
        
        // --- ABOUT SECTION ---
        const secondSec = document.getElementById("secondSec");
        if (secondSec) {
            const aboutPara = document.querySelector(".div75 > div:nth-child(2) p");
            let splitAbout = aboutPara ? new SplitText(aboutPara, { type: "lines" }) : null;

            const aboutTl = gsap.timeline({ scrollTrigger: { trigger: secondSec, start: "top 75%" }});
            aboutTl.fromTo(".div25 img", { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power4.inOut" })
            .from(".div75 h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.9");
            
            if (splitAbout && splitAbout.lines) aboutTl.from(splitAbout.lines, { x: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.7");
            aboutTl.from(".secondSecQuote", { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.5");
        }

        // --- SERVICES CONTAINER ---
        gsap.from(".services", { scrollTrigger: { trigger: ".servicesContainer", start: "top 75%" }, y: 100, opacity: 0, duration: 0.8, stagger: 0.3, ease: "power2.out" });

        const serviceBlocks = gsap.utils.toArray('.services');
        serviceBlocks.forEach((service, index) => {
            const img = service.querySelector('.serviceImage img');
            const heading = service.querySelector('.servicesHeading');
            const info = service.querySelector('.serviceInfo');
            let splitInfo = info ? new SplitText(info, { type: "lines" }) : null;
            
            const serviceTl = gsap.timeline({ scrollTrigger: { trigger: service, start: "top 80%", toggleActions: "play none none none" }});
            if (img) {
                const isImageOnRight = (index % 2 !== 0); 
                const startClip = isImageOnRight ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
                serviceTl.fromTo(img, { clipPath: startClip }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power4.inOut" });
            }
            if (heading) serviceTl.from(heading, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.9");
            if (splitInfo && splitInfo.lines) serviceTl.from(splitInfo.lines, { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.7");
        });

        // --- CONTACT SECTION ---
        const contactTl = gsap.timeline({ scrollTrigger: { trigger: "#fifthSec", start: "top 75%" }});
        contactTl.from(".fifthSecHeader span", { y: -30, opacity: 0, duration: 0.6 })
                 .from(".fifthSecFormImg", { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
                 .from(".fifthSecContactForm", { x: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
                 .from(".fifthSecCFormInp", { x: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4");

        // --- FOOTER SECTION ---
        gsap.from(".sixthSecLinks, .sixthSecLinks1, .sixthSecLinks2, .sixthSecLogo", { scrollTrigger: { trigger: "#sixthSec", start: "top 90%" }, y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" });

        // 3. FORCE GSAP REFRESH (Locks in geometry after fonts load)
        ScrollTrigger.refresh();

        // 4. HANDLE CROSS-PAGE SCROLLING
        if (sessionStorage.getItem("scrollToAbout") === "true") {
            sessionStorage.removeItem("scrollToAbout");
            setTimeout(() => {
                const section = document.getElementById("secondSec");
                if (section) window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
            }, 1200);
        }

        if (sessionStorage.getItem("scrollToContact") === "true") {
            sessionStorage.removeItem("scrollToContact");
            setTimeout(() => {
                const section = document.getElementById("fifthSec");
                if (section) window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
            }, 1200);
        }
    });
});