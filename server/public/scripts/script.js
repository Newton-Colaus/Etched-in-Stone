const abtBtn = document.getElementById("abtBtn");
const servBtn = document.getElementById("servBtn");
const gallBtn = document.getElementById("gallBtn");
const contBtn = document.getElementById("contBtn");
const contBtn2 = document.getElementById("contBtn2");
const hrsep = document.getElementById("hrsep");

const secondSec = document.getElementById("secondSec");
const thirdSec = document.getElementById("thirdSec");
const fourthSec = document.getElementById("fourthSec");
const fifthSec = document.getElementById("fifthSec");

const serviceSec = document.getElementById("serviceSec");

const backToTopBtn = document.getElementById("backToTopBtn");


window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    preloader.classList.add('preloader-hidden');
    
    setTimeout(() => {
        preloader.remove();
    }, 500); 
});

abtBtn.addEventListener('click', () => {
    secondSec.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
});

// servBtn.addEventListener('click', () => {
//     hrsep.scrollIntoView({ 
//       behavior: 'smooth', 
//       block: 'start'
//     });
// });

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

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({top:0, behavior: "smooth"});
});


