/* Navbar show/hide on scroll */
let lastScrollY = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Always show navbar at very top
    if (currentScrollY === 0) {
    navbar.classList.remove("navbar-hidden");
    lastScrollY = 0;
    return;
    }

    // Hide on scroll down
    if (currentScrollY > lastScrollY) {
    navbar.classList.add("navbar-hidden");
    }
    // Show on scroll up
    else {
    navbar.classList.remove("navbar-hidden");
    }

    lastScrollY = currentScrollY;
});


/* Scroll on click with offset for sections */
const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (!targetId.startsWith("#")) return;

    e.preventDefault();

    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    let offset = 0;

    // Offset only for non-home sections
    if (targetId !== "#home") {
        offset = navbar.offsetHeight;
    }

    const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

    window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
    });
    });
});


/* Image fading for sevices section */
const serviceImages = [
    "images/services-1.jpg",
    "images/services-2.jpg"
];

let currentImageIndex = 0;
const imageContainer = document.querySelector(".services-image-placeholder");

if (imageContainer) {
    setInterval(() => {
    // Fade out
    imageContainer.style.opacity = 0;

    setTimeout(() => {
        currentImageIndex =
        (currentImageIndex + 1) % serviceImages.length;

        imageContainer.style.backgroundImage =
        `url(${serviceImages[currentImageIndex]})`;

        // Fade in
        imageContainer.style.opacity = 1;
    }, 800);
    }, 5000);
}
