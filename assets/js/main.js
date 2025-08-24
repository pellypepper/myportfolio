// Preloader
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// Initialize AOS
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Typed animation
const typedTextElement = document.getElementById('typed-text');
if (typedTextElement) {
  const textArray = ['Full Stack Developer', 'Software Engineer', 'Problem Solver'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeText() {
    const currentText = textArray[textIndex];
    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
    }

    const speed = isDeleting ? 50 : typeSpeed;
    setTimeout(typeText, speed);
  }
  typeText();
}

// Smooth scrolling for navigation links (only internal, not modal/external links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Only scroll if the link is not inside a modal
    if (!this.closest('.modal')) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Download CV function
function downloadCV() {
  const cvContent = `
PELUMI OTEGBOLA
Full Stack Developer

EXPERIENCE:
• Web Developer at TechElevate (Jun 2025 — Present)
• Frontend Developer - Freelance (Dec 2023 — Apr 2025)
• IT Technician at Alpha Cyber Cafe (May 2021 — Jun 2023)

EDUCATION:
• IT Career Switch – Full Stack Developer Training (Aug 2024 — Aug 2025)
• B.Sc Computer Science - Second Class Honours (Mar 2017 — Jun 2021)

SKILLS:
JavaScript, TypeScript, React, Node.js, Express, PHP, Python, PostgreSQL, MongoDB, AWS, Docker

CONTACT:
LinkedIn: linkedin.com/in/pellypepper/
GitHub: github.com/pellypepper/
  `;
  const element = document.createElement('a');
  const file = new Blob([cvContent], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = 'Pelumi_Otegbola_CV.txt';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
      header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
  }
});

// Portfolio modal population and tech stack badges
document.addEventListener("DOMContentLoaded", function () {
  function slugify(tech) {
    return tech.toLowerCase()
      .replace(/\.js$/, 'js')
      .replace(/\.io$/, 'io')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
  }
  const techStackIcons = {
    "react": "bi-filetype-js",
    "redux": "bi-filetype-js",
    "bootstrap": "bi-bootstrap-fill",
    "expressjs": "bi-node-plus",
    "express": "bi-node-plus",
    "postgres": "bi-database-fill",
    "postgresql": "bi-database-fill",
    "clerk": "bi-person-badge",
    "typescript": "bi-filetype-ts",
    "nextjs": "bi-filetype-js",
    "zustand": "bi-code-slash",
    "tailwind": "bi-palette-fill",
    "drizzle": "bi-cloud-drizzle",
    "aws": "bi-cloud",
    "supabase": "bi-server",
    "vercel": "bi-server",
    "nodejs": "bi-node-plus",
    "heroku": "bi-cloud-upload",
    "php": "bi-filetype-php",
    "laravel": "bi-layers-fill",
    "mysql": "bi-database-fill",
    "javascript": "bi-filetype-js",
    "jquery": "bi-filetype-js",
    "flyio": "bi-rocket",
    "chartjs": "bi-bar-chart-fill",
    "restapi": "bi-link",
    "mongodb": "bi-database-fill",
    "docker": "bi-box-seam",
    "whatsappapi": "bi-whatsapp",
    "html": "bi-filetype-html",
    "css": "bi-filetype-css",
    "seo": "bi-search",
    "netlify": "bi-cloud-upload",
    "googleappscript": "bi-google",
    "twilio": "bi-phone",
    "googlesheets": "bi-file-earmark-spreadsheet",
    "other": "bi-gear"
  };

  document.querySelectorAll('.portfolio-entry').forEach(function(entry) {
    // Modal population logic
    function populatePortfolioModal() {
      document.getElementById('portfolioModalLabel').textContent = entry.getAttribute('data-title');
      document.getElementById('portfolioModalImg').src = entry.getAttribute('data-img');
      document.getElementById('portfolioModalMeta').textContent = entry.getAttribute('data-meta');
      document.getElementById('portfolioModalDesc').textContent = entry.getAttribute('data-description');
      // External links
      const demoLink = document.getElementById('portfolioModalDemo');
      const githubLink = document.getElementById('portfolioModalGithub');
      demoLink.href = entry.getAttribute('data-demo');
      githubLink.href = entry.getAttribute('data-github');
      demoLink.setAttribute('target', '_blank');
      githubLink.setAttribute('target', '_blank');
      // Tech stack
      const techStack = entry.getAttribute('data-tech');
      const techContainer = document.getElementById('portfolioModalTech');
      techContainer.innerHTML = '';
      if (techStack) {
        techStack.split(',').map(t => t.trim()).forEach(tech => {
          const slug = slugify(tech);
          const icon = techStackIcons[slug] || techStackIcons["other"];
          const badge = document.createElement('span');
          badge.className = `badge badge-${slug} d-flex align-items-center mb-1`;
          badge.innerHTML = `<i class="bi ${icon} me-1"></i>${tech}`;
          techContainer.appendChild(badge);
        });
      }
    }

    // Entry click
    entry.addEventListener('click', populatePortfolioModal);

    // Overlay click triggers modal
    const overlay = entry.querySelector('.entry-overlay');
    if (overlay) {
      overlay.addEventListener('click', function(e) {
        e.stopPropagation();
        populatePortfolioModal();
        const modal = new bootstrap.Modal(document.getElementById('portfolioModal'));
        modal.show();
      });
    }

    // "View More" button triggers modal
    const viewMoreBtn = entry.querySelector('.view-more-btn');
    if (viewMoreBtn) {
      viewMoreBtn.classList.remove("d-none");
      viewMoreBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        populatePortfolioModal();
        const modal = new bootstrap.Modal(document.getElementById('portfolioModal'));
        modal.show();
      });
    }
  });
});

// Contact form AJAX
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const loading = form.querySelector('.loading');
  const errorMsg = form.querySelector('.error-message');
  const sentMsg = form.querySelector('.sent-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    loading.style.display = 'block';
    errorMsg.style.display = 'none';
    sentMsg.style.display = 'none';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        loading.style.display = 'none';
        if (data.status === "success") {
          sentMsg.style.display = 'block';
          errorMsg.style.display = 'none';
          form.reset();
        } else {
          errorMsg.textContent = data.message || "Something went wrong.";
          errorMsg.style.display = 'block';
          sentMsg.style.display = 'none';
        }
      })
      .catch(err => {
        loading.style.display = 'none';
        errorMsg.textContent = "Could not send message. Please try again later.";
        errorMsg.style.display = 'block';
        sentMsg.style.display = 'none';
      });
  });
});