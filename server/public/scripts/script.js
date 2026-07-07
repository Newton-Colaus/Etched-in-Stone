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

abtBtn.addEventListener('click', () => {
    secondSec.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
});

servBtn.addEventListener('click', () => {
    hrsep.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
});

gallBtn.addEventListener('click', () => {
    fourthSec.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
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

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    preloader.classList.add('preloader-hidden');
    
    setTimeout(() => {
        preloader.remove();
    }, 500); 
});