      // Create floating particles
      function createParticles() {
        const particlesContainer = document.querySelector(".particles");
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.className = "particle";
          particle.style.left = Math.random() * 100 + "%";
          particle.style.animationDelay = Math.random() * 8 + "s";
          particle.style.animationDuration = Math.random() * 8 + 8 + "s";
          particlesContainer.appendChild(particle);
        }
      }

      // Progress bar
      function updateProgressBar() {
        const progressBar = document.querySelector(".progress-bar");
        const scrollTop = window.pageYOffset;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
      }

      // Back to top button
      function toggleBackToTop() {
        const backToTop = document.querySelector(".back-to-top");
        if (window.pageYOffset > 300) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      }

      // Smooth scroll for back to top
      document.querySelector(".back-to-top").addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Counter animation for metrics
      function animateCounters() {
        const metrics = document.querySelectorAll(".metric h3");
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = parseInt(entry.target.dataset.target);
              let current = 0;
              const increment = target / 50;
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  entry.target.textContent = target + "%";
                  clearInterval(timer);
                } else {
                  entry.target.textContent = Math.floor(current) + "%";
                }
              }, 30);
              entry.target.parentElement.classList.add("animate");
              observer.unobserve(entry.target);
            }
          });
        });

        metrics.forEach((metric) => {
          observer.observe(metric);
        });
      }

      // Intersection Observer for fade-in animations
      function setupIntersectionObserver() {
        const elements = document.querySelectorAll("section");
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
          }
        );

        elements.forEach((el) => {
          observer.observe(el);
        });
      }

      // Initialize everything
      window.addEventListener("DOMContentLoaded", () => {
        createParticles();
        animateCounters();
        setupIntersectionObserver();
      });

      // Scroll events
      window.addEventListener("scroll", () => {
        updateProgressBar();
        toggleBackToTop();
      });

      // Add hover effects to steps
      document.querySelectorAll(".step").forEach((step) => {
        step.addEventListener("mouseenter", () => {
          step.style.transform = "translateY(-10px) scale(1.02)";
        });

        step.addEventListener("mouseleave", () => {
          step.style.transform = "translateY(0) scale(1)";
        });
      });
