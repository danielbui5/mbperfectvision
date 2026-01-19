   let lastScrollY = 0;
   let isProgrammaticScroll = false;
   
   const navbar = document.querySelector(".navbar");
   const navLinks = document.querySelectorAll(".navbar a");
   
   
   /* Navbar show/hide on scroll */
   window.addEventListener("scroll", () => {
     // Do not change navbar state during JS-driven scroll
     if (isProgrammaticScroll) return;
   
     const currentScrollY = window.scrollY;
   
     // Always show navbar at very top (hero)
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
   
   
   /* Scroll on navbar button click */
   navLinks.forEach(link => {
     link.addEventListener("click", e => {
       const targetId = link.getAttribute("href");
       if (!targetId || !targetId.startsWith("#")) return;
   
       e.preventDefault();
   
       const targetSection = document.querySelector(targetId);
       if (!targetSection) return;
   
       // Lock navbar state during scroll
       isProgrammaticScroll = true;
       navbar.classList.remove("navbar-hidden");
   
       // Offset only for non-home sections
       const offset = targetId === "#home" ? 0 : navbar.offsetHeight;
   
       const targetPosition =
         targetSection.getBoundingClientRect().top +
         window.scrollY -
         offset;
   
       window.scrollTo({
         top: targetPosition,
         behavior: "smooth"
       });
   
       // Re-enable navbar logic after scroll completes
       setTimeout(() => {
         isProgrammaticScroll = false;
         lastScrollY = window.scrollY;
       }, 700); // must exceed scroll animation duration
     });
   });
   
   
   /* Services section image fading */
   const serviceImages = [
     "images/services-1.jpg",
     "images/services-2.jpg"
   ];
   
   let currentImageIndex = 0;
   const imageContainer = document.querySelector(".services-image-placeholder");
   
   if (imageContainer) {
     setInterval(() => {
       // Fade out
       imageContainer.style.opacity = "0";
   
       setTimeout(() => {
         currentImageIndex =
           (currentImageIndex + 1) % serviceImages.length;
   
         imageContainer.style.backgroundImage =
           `url(${serviceImages[currentImageIndex]})`;
   
         // Fade in
         imageContainer.style.opacity = "1";
       }, 800);
     }, 5000);
   }
   