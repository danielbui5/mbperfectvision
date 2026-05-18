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


  (function() {
    var track = document.getElementById('reviewTrack');
    var prevBtn = document.getElementById('reviewPrev');
    var nextBtn = document.getElementById('reviewNext');
    var dotsContainer = document.getElementById('reviewDots');
    if (!track) return;
    var cards = track.querySelectorAll('.review-card');
    var perPage = window.innerWidth <= 768 ? 1 : 2;
    var pages = Math.ceil(cards.length / perPage);
    var current = 0;

    for (var i = 0; i < pages; i++) {
      var d = document.createElement('button');
      d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to page ' + (i + 1));
      (function(idx) {
        d.addEventListener('click', function() { goTo(idx); });
      })(i);
      dotsContainer.appendChild(d);
    }

    function goTo(page) {
      current = Math.max(0, Math.min(page, pages - 1));
      var cardWidth = cards[0].offsetWidth + 16;
      track.style.transform = 'translateX(-' + (current * perPage * cardWidth) + 'px)';
      dotsContainer.querySelectorAll('.carousel-dot').forEach(function(dot, idx) {
        dot.classList.toggle('active', idx === current);
      });
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current >= pages - 1;
    }

    prevBtn.addEventListener('click', function() { goTo(current - 1); });
    nextBtn.addEventListener('click', function() { goTo(current + 1); });

    var autoTimer = setInterval(function() {
      goTo(current < pages - 1 ? current + 1 : 0);
    }, 5000);

    track.addEventListener('mouseenter', function() { clearInterval(autoTimer); });
    track.addEventListener('mouseleave', function() {
      autoTimer = setInterval(function() {
        goTo(current < pages - 1 ? current + 1 : 0);
      }, 5000);
    });
  })();
  