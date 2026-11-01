document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     1. TYPING EFFECT (Tiêu chí 19: Sáng tạo)
     ========================================== */
  const typedTextSpan = document.getElementById("typing-effect");
  const textArray = ["Data Science Enthusiast", "AI Engineering Explorer", "UTH IT Student"];
  let textIndex = 0, charIndex = 0;

  function type() {
    if (charIndex < textArray[textIndex].length) {
      typedTextSpan.textContent += textArray[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, 500);
    }
  }
  type();

  /* ==========================================
     2. DARK MODE / LIGHT MODE TOGGLE (Tiêu chí 14)
     ========================================== */
  const themeToggleBtn = document.getElementById("theme-toggle");
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    themeToggleBtn.querySelector(".theme-icon").textContent = newTheme === "dark" ? "🌙" : "☀️";
  });

  /* ==========================================
     3. PROJECT FILTER (Tiêu chí 14)
     ========================================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ==========================================
     4. FORM VALIDATION (Tiêu chí 15)
     ========================================== */
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (name.value.trim() === "") {
      document.getElementById("name-error").textContent = "Vui lòng nhập họ tên!";
      isValid = false;
    } else { document.getElementById("name-error").textContent = ""; }

    if (!email.value.includes("@") || email.value.trim() === "") {
      document.getElementById("email-error").textContent = "Email không hợp lệ!";
      isValid = false;
    } else { document.getElementById("email-error").textContent = ""; }

    if (message.value.trim() === "") {
      document.getElementById("message-error").textContent = "Vui lòng nhập nội dung!";
      isValid = false;
    } else { document.getElementById("message-error").textContent = ""; }

    if (isValid) {
      document.getElementById("form-status").textContent = "⚡ Tín hiệu đã gửi thành công!";
      contactForm.reset();
    }
  });

  /* ==========================================
     5. SCROLL TO TOP & HUD CANVAS (Tiêu chí 14, 19)
     ========================================== */
  const scrollTopBtn = document.getElementById("scroll-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});