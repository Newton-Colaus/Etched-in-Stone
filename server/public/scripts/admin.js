const fileInput = document.getElementById('galleryImage');
const imgPreview = document.getElementById('imgPreview');

fileInput.addEventListener('change', function() {
  const file = this.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.addEventListener('load', function() {
      imgPreview.setAttribute('src', this.result);
    });
    
    reader.readAsDataURL(file);
  }
});


// public/js/gallery-actions.js

document.addEventListener('DOMContentLoaded', () => {
  // Select all interactive delete buttons in the DOM
  const deleteButtons = document.querySelectorAll('.deleteBtn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      // Prevent standard browser button default triggers
      event.preventDefault();

      // 1. Extract the MongoDB document string identification key
      const itemId = this.getAttribute('data-id');
      
      if (!itemId) {
        console.error('Action aborted: Element is missing a valid data-id attribute.');
        return;
      }

      // 2. Present an explicit safety warning confirmation confirmation modal
      const confirmDelete = confirm('Are you sure you want to permanently delete this item?');
      
      if (confirmDelete) {
        // 3. Build a virtual structural form element to execute the POST data payload transmission
        const form = document.createElement('form');
        form.method = 'POST';
        
        // Dynamically compute the path route based on the base endpoint URL path
        const currentPath = window.location.pathname;
        const targetRoute = currentPath.startsWith('/gallery') ? '/gallery' : '/gallery';
        
        form.action = `${targetRoute}/delete/${itemId}`;

        // Inject form node to document tree context framework and dispatch execution trigger
        document.body.appendChild(form);
        form.submit();
      }
    });
  });
});


const homeBtn = document.getElementById("homeBtn");

const cont2btn = document.getElementById("contBtn");


homeBtn.addEventListener("click", () => {
    window.location.href = "/";
});

abtBtn.addEventListener("click", () => {
    window.location.href = "/";
});

gallBtn.addEventListener("click", () => {
    window.location.href = "/gallery";
});

cont2Btn.addEventListener("click", () => {
    window.location.href = "/";
});