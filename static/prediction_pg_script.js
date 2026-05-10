document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileInput");
  const uploadSection = document.getElementById("uploadSection");
  const selectedFile = document.getElementById("selectedFile");
  const fileNameDisplay = document.getElementById("fileName");
  const submitBtn = document.getElementById("submitBtn");
  const loading = document.getElementById("loading");
  const resultSection = document.getElementById("resultSection");
  const browseBtn = document.getElementById("browseBtn");

  // Prevent default drag behaviors on the whole window
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    window.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Highlight upload box on drag over
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadSection.addEventListener(eventName, () => {
      uploadSection.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    uploadSection.addEventListener(eventName, () => {
      uploadSection.classList.remove('dragover');
    }, false);
  });

  // Handle file drop manually
  uploadSection.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
      fileInput.files = files;
      handleFileChange();
    }
  });

  // Click on the browse button triggers the hidden input
  browseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fileInput.click();
  });

  // Handle standard file selection
  fileInput.addEventListener("change", handleFileChange);

  function handleFileChange() {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      
      // Validate it's a CSV file
      if (file.name.toLowerCase().endsWith('.csv')) {
        fileNameDisplay.textContent = file.name;
        selectedFile.classList.add("show");
        submitBtn.disabled = false;
        
        // Hide result section if it exists from a previous run
        if (resultSection) {
          resultSection.style.display = 'none';
        }
      } else {
        alert("Clinical protocol requires a valid CSV format file.");
        fileInput.value = ""; // Reset input
        selectedFile.classList.remove("show");
        submitBtn.disabled = true;
      }
    } else {
      selectedFile.classList.remove("show");
      submitBtn.disabled = true;
    }
  }

  // Handle form submission to show loading state
  uploadForm.addEventListener("submit", (e) => {
    // We don't prevent default here because we want the form to POST to Flask
    
    // Disable submit button to prevent double clicks
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Show professional loading ring
    loading.classList.add("show");
    
    // Optional: Fade out upload section for focus
    uploadSection.style.opacity = '0.5';
    uploadSection.style.pointerEvents = 'none';
  });
});