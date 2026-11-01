// Portfolio JavaScript
// Data projects
const projects = {
  p1: {
    title: "Machine Learning",
    desc: "Tổng hợp các mô hình học máy đã thực hành, từ hồi quy tuyến tính, boosting (LightGBM) đến học tăng cường (Actor-Critic).",
    tech: "Python, Linear Regression, LightGBM, Reinforcement Learning",
    links: [
      { label: "Linear Regression", url: "https://github.com/NappoLeeShi/Linear_Regresstion" },
      { label: "LightGBM", url: "https://github.com/NappoLeeShi/lightgbm" },
      { label: "Actor-Critic", url: "https://github.com/NappoLeeShi/actor_critic" }
    ]
  },
  p2: {
    title: "Xử lý thị giác máy tính / Computer Vision",
    desc: "Các bài thực hành xử lý và phân tích hình ảnh với các kỹ thuật thị giác máy tính cơ bản.",
    tech: "Python, Computer Vision",
    links: [
      { label: "computer_vision", url: "https://github.com/NappoLeeShi/computer_vision" }
    ]
  }
};

// Utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// 1. Typing animation
function initTyping() {
  const typingEl = $("#typing");
  if (!typingEl) return;
  
  const texts = [
    "Data Science & AI student",
    "SQL & Python enthusiast", 
    "Problem solver"
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingEl.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = 100;
    
    if (isDeleting) {
      typeSpeed = 50;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

// 2. Glow effect
function initGlow() {
  const home = $(".home");
  if (!home) return;
  
  home.addEventListener("pointermove", (e) => {
    const rect = home.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    home.style.setProperty("--mx", x + "px");
    home.style.setProperty("--my", y + "px");
  });
}

// 3. Mobile menu
function initMenu() {
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");
  const navLinks = $$(".nav__link");
  
  if (!navToggle || !navMenu) return;
  
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav__menu--open");
    const isOpen = navMenu.classList.contains("nav__menu--open");
    navToggle.setAttribute("aria-expanded", isOpen.toString());
  });
  
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("nav__menu--open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 4. Theme toggle (lưu bằng localStorage)
function initTheme() {
  const themeButton = $("#themeBtn");
  const root = document.documentElement;
  if (!themeButton) return;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeButton.textContent = theme === "dark" ? "☀" : "☾";
    document.dispatchEvent(new Event("themechange"));
  }

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("theme") || "light";
  } catch (error) {
    // Bỏ qua nếu trình duyệt chặn localStorage
  }
  applyTheme(savedTheme);

  themeButton.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (error) {
      // Bỏ qua nếu trình duyệt chặn localStorage
    }
  });
}

// 5. Scroll effects
function initScroll() {
  const progress = $("#progress");
  const toTop = $("#toTop");
  const navLinks = $$(".nav__link");
  const sections = $$("section[id]");
  
  // Progress bar
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (progress) {
      progress.style.width = scrollPercent + "%";
    }
  }
  
  // To top button
  function updateToTop() {
    if (!toTop) return;
    
    if (window.scrollY > 400) {
      toTop.classList.add("to-top--show");
    } else {
      toTop.classList.remove("to-top--show");
    }
  }
  
  // Scroll to top
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
  
  // IntersectionObserver for nav links
  if (sections.length > 0) {
    const observerOptions = {
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          
          navLinks.forEach((link) => {
            link.classList.remove("nav__link--active");
            if (link.getAttribute("href") === "#" + sectionId) {
              link.classList.add("nav__link--active");
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
  
  window.addEventListener("scroll", () => {
    updateProgress();
    updateToTop();
  });
  
  updateProgress();
  updateToTop();
}

// 6. Skill bars animation
function initSkillBars() {
  const skillBars = $("#skillBars");
  if (!skillBars) return;
  
  const bars = $$(".bar");
  if (bars.length === 0) return;
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const fill = bar.querySelector(".bar__fill");
        const level = bar.getAttribute("data-level");
        
        if (fill && level) {
          fill.style.width = level + "%";
        }
      }
    });
  }, observerOptions);
  
  bars.forEach((bar) => {
    observer.observe(bar);
  });
}

// 7. Project filter
function initFilter() {
  const buttons = $$(".filters__btn");
  const cards = $$(".project");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("filters__btn--active"));
      button.classList.add("filters__btn--active");

      const filter = button.dataset.filter;
      cards.forEach((card) => {
        const visible = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("project--hidden", !visible);
      });
    });
  });
}

// 8. Modal chi tiết dự án
function initModal() {
  const modal = $("#modal");
  if (!modal) return;
  const closeButton = $("#modalClose");
  let lastTrigger = null;

  function createLink({ label, url }) {
    const link = document.createElement("a");
    link.href = url;
    link.textContent = label;
    link.target = "_blank";
    link.rel = "noopener";
    link.className = "modal__link";
    return link;
  }

  function openModal(trigger) {
    const project = projects[trigger.dataset.open];
    if (!project) return;
    lastTrigger = trigger;
    $("#modalTitle").textContent = project.title;
    $("#modalDesc").textContent = project.desc;
    $("#modalTech").textContent = "Công nghệ: " + project.tech;
    $("#modalLinks").replaceChildren(...project.links.map(createLink));
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    closeButton.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastTrigger) lastTrigger.focus();
  }

  $$("[data-open]").forEach((button) => button.addEventListener("click", () => openModal(button)));
  closeButton.addEventListener("click", closeModal);
  $("#modalOverlay").addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
}

// 9. Form liên hệ: kiểm tra dữ liệu
function initForm() {
  const form = $("#contactForm");
  const success = $("#formSuccess");
  if (!form) return;

  // Mỗi ô có một hàm kiểm tra, trả về chuỗi lỗi (rỗng nếu hợp lệ)
  const rules = {
    name: (value) => (value ? "" : "Họ tên không được để trống"),
    email: (value) => {
      if (!value) return "Email không được để trống";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Email không đúng định dạng";
    },
    subject: (value) => (value ? "" : "Chủ đề không được để trống"),
    message: (value) => (value.length >= 10 ? "" : "Nội dung tối thiểu 10 ký tự")
  };

  function validateField(field) {
    const error = rules[field.name](field.value.trim());
    const group = field.closest(".form__group");
    group.classList.toggle("form__group--error", Boolean(error));
    group.querySelector(".form__error").textContent = error;
    return !error;
  }

  const fields = [...form.querySelectorAll("input, textarea")];
  fields.forEach((field) => field.addEventListener("blur", () => validateField(field)));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = fields.map(validateField).every(Boolean);
    success.textContent = isValid ? "Gửi thành công! Cảm ơn bạn đã liên hệ." : "";
    if (isValid) {
      form.reset();
      setTimeout(() => { success.textContent = ""; }, 5000);
    }
  });
}

// 10. Demo Linear Regression tương tác (điểm sáng tạo)
function initRegressionDemo() {
  const canvas = $("#demoCanvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const formula = $("#demoFormula");
  const SCALE = 10; // hệ trục dữ liệu 0..10
  let points = []; // lưu theo toạ độ dữ liệu

  const toCanvas = (x, y) => ({ x: (x / SCALE) * canvas.width, y: (1 - y / SCALE) * canvas.height });

  // Bình phương tối thiểu: slope = Σ(x-x̄)(y-ȳ) / Σ(x-x̄)²
  function fitLine() {
    if (points.length < 2) return null;
    const meanX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const meanY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
    const varX = points.reduce((sum, p) => sum + (p.x - meanX) ** 2, 0);
    if (varX < 1e-6) return null;
    const slope = points.reduce((sum, p) => sum + (p.x - meanX) * (p.y - meanY), 0) / varX;
    return { slope, intercept: meanY - slope * meanX };
  }

  function drawGrid(color) {
    context.strokeStyle = color;
    context.lineWidth = 1;
    for (let i = 1; i < SCALE; i++) {
      const { x } = toCanvas(i, 0);
      const { y } = toCanvas(0, i);
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }
  }

  function draw() {
    const styles = getComputedStyle(document.documentElement);
    const color = (name) => styles.getPropertyValue(name).trim();
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(color("--line"));

    const line = fitLine();
    if (line) {
      const start = toCanvas(0, line.intercept);
      const end = toCanvas(SCALE, line.slope * SCALE + line.intercept);
      context.strokeStyle = color("--accent");
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.stroke();
    }

    context.fillStyle = color("--primary");
    points.forEach((p) => {
      const position = toCanvas(p.x, p.y);
      context.beginPath();
      context.arc(position.x, position.y, 7, 0, Math.PI * 2);
      context.fill();
    });

    if (line) {
      const sign = line.intercept < 0 ? "-" : "+";
      formula.textContent = `y = ${line.slope.toFixed(2)}x ${sign} ${Math.abs(line.intercept).toFixed(2)}`;
    } else {
      formula.textContent = "Cần ít nhất 2 điểm để vẽ đường hồi quy";
    }
  }

  function addPoint(x, y) {
    points.push({ x, y });
    draw();
  }

  function addRandomPoint() {
    const x = 0.8 + Math.random() * 8.4;
    const y = Math.min(9.5, Math.max(0.5, 0.7 * x + 1.5 + (Math.random() - 0.5) * 3));
    addPoint(x, y);
  }

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    addPoint(((event.clientX - rect.left) / rect.width) * SCALE, (1 - (event.clientY - rect.top) / rect.height) * SCALE);
  });
  $("#demoRandom").addEventListener("click", addRandomPoint);
  $("#demoReset").addEventListener("click", () => { points = []; draw(); });
  document.addEventListener("themechange", draw);

  for (let i = 0; i < 6; i++) addRandomPoint();
}

// Initialize all functions
function initAll() {
  initTyping();
  initGlow();
  initMenu();
  initTheme();
  initScroll();
  initSkillBars();
  initFilter();
  initModal();
  initForm();
  initRegressionDemo();
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}
