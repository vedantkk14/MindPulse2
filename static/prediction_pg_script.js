      // Create floating particles
      function createParticles() {
        const particlesContainer = document.querySelector(".particles");
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.className = "particle";
          particle.style.left = Math.random() * 100 + "%";
          particle.style.animationDelay = Math.random() * 10 + "s";
          particle.style.animationDuration = Math.random() * 10 + 10 + "s";
          particlesContainer.appendChild(particle);
        }
      }

      const fileInput = document.getElementById("fileInput");
      const uploadSection = document.getElementById("uploadSection");
      const selectedFile = document.getElementById("selectedFile");
      const fileName = document.getElementById("fileName");
      const submitBtn = document.getElementById("submitBtn");
      const uploadForm = document.getElementById("uploadForm");
      const loading = document.getElementById("loading");

      // File input change handler
      fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          fileName.textContent = file.name;
          selectedFile.classList.add("show");
          submitBtn.disabled = false;

          if (file.name.endsWith(".csv")) {
            selectedFile.style.borderColor = "#66bb6a";
            selectedFile.style.background =
              "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)";
          } else {
            selectedFile.style.borderColor = "#ef5350";
            selectedFile.style.background =
              "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)";
          }
        }
      });

      // Drag and drop functionality
      uploadSection.addEventListener("dragover", function (e) {
        e.preventDefault();
        uploadSection.classList.add("dragover");
      });

      uploadSection.addEventListener("dragleave", function (e) {
        e.preventDefault();
        uploadSection.classList.remove("dragover");
      });

      uploadSection.addEventListener("drop", function (e) {
        e.preventDefault();
        uploadSection.classList.remove("dragover");

        const files = e.dataTransfer.files;
        if (files.length > 0) {
          fileInput.files = files;
          const event = new Event("change");
          fileInput.dispatchEvent(event);
        }
      });

      // Form submission with loading state
      uploadForm.addEventListener("submit", function (e) {
        if (fileInput.files.length > 0) {
          loading.classList.add("show");
          submitBtn.disabled = true;
          submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Processing...';
        }
      });

      // Enhanced particle effects for drag and drop
      function createUploadParticle(x, y) {
        const particle = document.createElement("div");
        particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 8px;
                height: 8px;
                background: #4CAF50;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: particleFloat 2s ease-out forwards;
                box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
            `;

        const style = document.createElement("style");
        style.textContent = `
                @keyframes particleFloat {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100px) scale(0);
                    }
                }
            `;
        document.head.appendChild(style);
        document.body.appendChild(particle);

        setTimeout(() => {
          if (document.body.contains(particle)) {
            document.body.removeChild(particle);
          }
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        }, 2000);
      }

      // Enhanced drag and drop with particle effects
      uploadSection.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.classList.add("dragover");

        // Create particles on drag enter
        const rect = this.getBoundingClientRect();
        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            createUploadParticle(
              rect.left + Math.random() * rect.width,
              rect.top + Math.random() * rect.height
            );
          }, i * 100);
        }
      });

      // Click handler for upload button and section
      document.addEventListener("click", function (e) {
        if (
          e.target.classList.contains("upload-btn") ||
          (e.target === uploadSection && !e.target.closest("input, button"))
        ) {
          fileInput.click();
        }
      });

      // Add staggered animations to list items
      document.addEventListener("DOMContentLoaded", function () {
        // Initialize particles
        createParticles();

        // Stagger list animations
        document.querySelectorAll(".requirements li").forEach((li, index) => {
          li.style.animation = `fadeInUp 0.5s ease-out ${
            1.2 + index * 0.15
          }s both`;
          li.style.opacity = "0";
        });

        // Add hover effect to result icons
        const resultIcon = document.querySelector(".result-section i");
        if (resultIcon) {
          resultIcon.addEventListener("mouseenter", function () {
            this.style.animation = "brainWave 1s ease-in-out infinite";
          });
          resultIcon.addEventListener("mouseleave", function () {
            this.style.animation = "";
          });
        }

        // Add floating animation to various icons
        document.querySelectorAll(".fas").forEach((icon, index) => {
          if (!icon.closest(".result-section")) {
            icon.style.animation = `float 3s ease-in-out infinite`;
            icon.style.animationDelay = `${index * 0.2}s`;
          }
        });
      });

      // Enhanced hover effects
      document
        .querySelectorAll(".info-section, .requirements, .disclaimer")
        .forEach((section) => {
          section.addEventListener("mouseenter", function () {
            this.style.transform = this.classList.contains("info-section")
              ? "translateX(10px) translateY(-3px)"
              : "scale(1.02) translateY(-3px)";
          });

          section.addEventListener("mouseleave", function () {
            this.style.transform = "";
          });
        });

      // Smooth scroll behavior
      document.documentElement.style.scrollBehavior = "smooth";