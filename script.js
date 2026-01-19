   let lastScrollY = window.scrollY;
   let disableAutoHide = false;
   
   const navbar = document.querySelector(".navbar");
   const navLinks = document.querySelectorAll(".navbar a");
   
   
   /* Navbar hide/show on scroll */
   window.addEventListener("scroll", () => {
     if (disableAutoHide) return;
   
     const currentScrollY = window.scrollY;
   
     // Always show navbar at very top
     if (currentScrollY <= 0) {
       navbar.classList.remove("navbar-hidden");
       lastScrollY = 0;
       return;
     }
   
     if (currentScrollY > lastScrollY) {
       navbar.classList.add("navbar-hidden");
     } else {
       navbar.classList.remove("navbar-hidden");
     }
   
     lastScrollY = currentScrollY;
   });
   
   
   /* Scroll to section, offset navbar */
   navLinks.forEach(link => {
     link.addEventListener("click", e => {
       const targetId = link.getAttribute("href");
       if (!targetId || !targetId.startsWith("#")) return;
   
       e.preventDefault();
   
       const targetSection = document.querySelector(targetId);
       if (!targetSection) return;
   
       // Freeze navbar behaviour
       disableAutoHide = true;
       navbar.classList.remove("navbar-hidden");
   
       const offset = targetId === "#home" ? 0 : navbar.offsetHeight;
   
       const targetPosition =
         targetSection.getBoundingClientRect().top +
         window.scrollY -
         offset;
   
       window.scrollTo({
         top: targetPosition,
         behavior: "smooth"
       });
   
       // Re-enable auto-hide only after USER scrolls
       const unlock = () => {
         disableAutoHide = false;
         lastScrollY = window.scrollY;
         window.removeEventListener("wheel", unlock);
         window.removeEventListener("touchstart", unlock);
         window.removeEventListener("keydown", unlock);
       };
   
       window.addEventListener("wheel", unlock, { once: true });
       window.addEventListener("touchstart", unlock, { once: true });
       window.addEventListener("keydown", unlock, { once: true });
     });
   });
   
   
   /* Services section images fading */
   const serviceImages = [
     "images/services-1.jpg",
     "images/services-2.jpg"
   ];
   
   let currentImageIndex = 0;
   const imageContainer = document.querySelector(".services-image-placeholder");
   
   if (imageContainer) {
     setInterval(() => {
       imageContainer.style.opacity = "0";
   
       setTimeout(() => {
         currentImageIndex =
           (currentImageIndex + 1) % serviceImages.length;
   
         imageContainer.style.backgroundImage =
           `url(${serviceImages[currentImageIndex]})`;
   
         imageContainer.style.opacity = "1";
       }, 800);
     }, 5000);
   }
   