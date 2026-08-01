const backToTopBtn2 = document.getElementById("backToTopBtn2");
const homeBtn = document.getElementById("homeBtn");
const gallBtn = document.getElementById("gallBtn");
const abtBtn = document.getElementById("abtBtn");
const contBtn = document.getElementById("contBtn");

const navBar = document.getElementById("navBar");
const navBarLogo = document.getElementById("navBarLogo");
const navBarButtons = [homeBtn, gallBtn, contBtn, abtBtn]


window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    preloader.classList.add('preloader-hidden');
    
    setTimeout(() => {
        preloader.remove();
    }, 500); 
});

backToTopBtn2.addEventListener("click", () => {
  window.scrollTo({top:0, behavior: "smooth"});
});

// servBtn.addEventListener("click", () => {
//     window.location.href = "/services";
// });

homeBtn.addEventListener("click", () => {
    window.location.href = "/";
});

abtBtn.addEventListener("click", () => {
    window.location.href = "/";
});

gallBtn.addEventListener("click", () => {
    window.location.href = "/gallery";
});

contBtn.addEventListener("click", () => {
    window.location.href = "/";
});


// window.addEventListener("scroll", () => {
//   if(window.scrollY > 50){
//     navBar.classList.add("navBarScrolled");
//     navBarLogo.classList.add("navBarLogoScrolled");
//     for(i = 0; i < navBarButtons.length; i++){
//       navBarButtons[i].classList.add("navBarButtonScrolled");
//     };
//   } else {
//     navBar.classList.remove("navBarScrolled");
//     navBarLogo.classList.remove("navBarLogoScrolled");
//     for(i = 0; i < navBarButtons.length; i++){
//       navBarButtons[i].classList.remove("navBarButtonScrolled");
//     };
//   }
// });