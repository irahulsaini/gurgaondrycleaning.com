
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120; // offset for fixed nav
        if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
            scrollIntoViewIfNeeded(link); 
        }
    });
});
function scrollIntoViewIfNeeded(el) {
  const parent = el.parentElement;
  const parentRect = parent.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  if (elRect.left < parentRect.left || elRect.right > parentRect.right) {
    el.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
}
AOS.init({
    duration: 1000
});

lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
})