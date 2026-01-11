const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const revealOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, revealOptions);

const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach((el) => revealObserver.observe(el));

document.addEventListener("mousemove", (e) => {
  const mesh = document.querySelector(".bg-mesh");
  const x = (window.innerWidth - e.pageX * 2) / 100;
  const y = (window.innerHeight - e.pageY * 2) / 100;

  mesh.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.1)`;
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

function animateCounters() {
  const badges = document.querySelectorAll(".badge-num");
  badges.forEach((badge) => {
    const target = parseInt(badge.innerText);
    if (isNaN(target)) return;

    let count = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const update = () => {
      count += increment;
      if (count < target) {
        badge.innerText =
          Math.floor(count) + (badge.innerText.includes("+") ? "+" : "");
        requestAnimationFrame(update);
      } else {
        badge.innerText = target + (badge.innerText.includes("+") ? "+" : "");
      }
    };
    update();
  });
}

const hero = document.querySelector(".hero");
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    heroObserver.unobserve(hero);
  }
});
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

heroObserver.observe(hero);
