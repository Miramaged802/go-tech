document.addEventListener("DOMContentLoaded", () => {
  // Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-item");

  if (navToggle && navLinks) {
    // Toggle menu
    navToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking links
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !navToggle.contains(e.target) &&
        !navLinks.contains(e.target) &&
        navLinks.classList.contains("active")
      ) {
        navToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".fade-in, .service-card, .feature-card, .contact-item"
  );
  animatedElements.forEach((element) => {
    element.classList.add("fade-in");
    observer.observe(element);
  });

  // Smooth scroll with offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll class to header for background change
  const header = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Form Validation
  const contactForm = document.getElementById("contactForm");
  const formGroups = document.querySelectorAll(".form-group");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      formGroups.forEach((group) => {
        group.classList.remove("error");
      });

      // Validate each field
      formGroups.forEach((group) => {
        const input = group.querySelector("input, textarea");
        if (input.required && !input.value.trim()) {
          group.classList.add("error");
          isValid = false;
        }

        if (input.type === "email" && input.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value.trim())) {
            group.classList.add("error");
            isValid = false;
          }
        }
      });

      if (isValid) {
        // Here you would typically send the form data to a server
        console.log("Form submitted successfully");
        contactForm.reset();

        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.textContent = "تم إرسال رسالتك بنجاح!";
        contactForm.appendChild(successMessage);

        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });

    // Handle floating labels
    formGroups.forEach((group) => {
      const input = group.querySelector("input, textarea");
      const label = group.querySelector("label");

      input.addEventListener("focus", () => {
        label.classList.add("active");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          label.classList.remove("active");
        }
      });

      // Check initial state
      if (input.value) {
        label.classList.add("active");
      }
    });
  }

  // Typewriter Effect (No Sound, No Start Button)
  const heroTitle = document.getElementById("hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let charIndex = 0;
    let delayPerChar = 4000 / text.length; // مدة الكتابة 4 ثواني
    function typeWriter() {
      if (charIndex < text.length) {
        heroTitle.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, delayPerChar);
      } else {
        heroTitle.style.borderLeft = "none";
        heroTitle.style.paddingLeft = "0";
        heroTitle.classList.add("typing");
        setTimeout(() => {
          heroTitle.classList.remove("typing");
        }, 2000);
      }
    }
    // بدء التأثير تلقائياً عند تحميل الصفحة
    heroTitle.style.borderLeft = "2px solid var(--accent-yellow)";
    heroTitle.style.paddingLeft = "5px";
    typeWriter();
  }


});

  document.getElementById("whatsappBtn").addEventListener("click", function () {
    document.getElementById("chatBox").style.display = "block";
  });

  // إغلاق نافذة الدردشة
  document.getElementById("closeChat").addEventListener("click", function () {
    document.getElementById("chatBox").style.display = "none";
  });