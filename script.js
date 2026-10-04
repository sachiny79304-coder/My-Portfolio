/* ================= ELEMENTS ================= */

const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const topBtn = document.getElementById("topBtn");
const scrollProgress = document.getElementById("scrollProgress");

const year = document.getElementById("year");
const toast = document.getElementById("toast");

const typingText = document.getElementById("typingText");


/* ================= YEAR ================= */

year.textContent = new Date().getFullYear();


/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("open");

  const spans =
    menuBtn.querySelectorAll("span");

  const isOpen =
    navLinks.classList.contains("open");

  if (isOpen) {

    spans[0].style.transform =
      "rotate(45deg) translate(5px, 5px)";

    spans[1].style.opacity = "0";

    spans[2].style.transform =
      "rotate(-45deg) translate(5px, -5px)";

  } else {

    spans[0].style.transform = "";

    spans[1].style.opacity = "1";

    spans[2].style.transform = "";

  }

});


/* Close menu after clicking */

document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      const spans =
        menuBtn.querySelectorAll("span");

      spans[0].style.transform = "";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "";

    });

  });


/* ================= SCROLL UI ================= */

function updateScrollUI() {

  const scrollTop =
    window.scrollY;

  const height =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    height > 0
      ? (scrollTop / height) * 100
      : 0;

  scrollProgress.style.width =
    `${progress}%`;


  header.classList.toggle(
    "scrolled",
    scrollTop > 30
  );


  topBtn.classList.toggle(
    "show",
    scrollTop > 500
  );

}

window.addEventListener(
  "scroll",
  updateScrollUI
);

updateScrollUI();


/* ================= BACK TO TOP ================= */

topBtn.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* ================= TYPING EFFECT ================= */

const roles = [
  "Web Developer",
  "Frontend Developer",
  "JavaScript Developer",
  "B.Tech CSE Student"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;


function typeRole() {

  const role =
    roles[roleIndex];


  if (!deleting) {

    typingText.textContent =
      role.slice(
        0,
        charIndex + 1
      );

    charIndex++;


    if (charIndex === role.length) {

      deleting = true;

      setTimeout(
        typeRole,
        1400
      );

      return;
    }

  } else {

    typingText.textContent =
      role.slice(
        0,
        charIndex - 1
      );

    charIndex--;


    if (charIndex === 0) {

      deleting = false;

      roleIndex =
        (roleIndex + 1) %
        roles.length;

    }

  }


  setTimeout(
    typeRole,
    deleting ? 55 : 90
  );

}

typeRole();


/* ================= SCROLL REVEAL ================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target
            .classList
            .add("visible");

        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    observer.observe(element);

  });


/* ================= ACTIVE NAV LINK ================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const links =
  document.querySelectorAll(
    ".nav-links a"
  );


function updateActiveLink() {

  let current = "";

  sections.forEach(section => {

    const top =
      section.offsetTop - 120;

    if (
      window.scrollY >= top
    ) {

      current =
        section.id;

    }

  });


  links.forEach(link => {

    link.classList.toggle(
      "active",
      link.getAttribute("href") ===
      `#${current}`
    );

  });

}

window.addEventListener(
  "scroll",
  updateActiveLink
);


/* ================= WELCOME TOAST ================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(() => {

      toast.classList.add("show");

    }, 700);


    setTimeout(() => {

      toast.classList.remove("show");

    }, 3000);

  }
);