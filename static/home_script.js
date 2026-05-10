document.addEventListener("DOMContentLoaded", () => {
    
  // 1. Navbar Shadow on Scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Intersection Observer for Smooth Fade-In Animations
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserverOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, fadeObserverOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // 3. Number Counter Animation for Clinical Efficacy Metrics
  const counters = document.querySelectorAll(".counter");
  let countersAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // 2 seconds
      const fps = 60;
      const increment = target / (duration / (1000 / fps));
      
      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  };

  // 4. Trigger counters only when the efficacy section comes into view
  const metricsContainer = document.getElementById("metrics-container");
  
  if (metricsContainer) {
    const metricsObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !countersAnimated) {
        animateCounters();
        countersAnimated = true; // Prevent re-animating
      }
    }, { threshold: 0.5 });

    metricsObserver.observe(metricsContainer);
  }
});