/* ============================================
   MB PERFECT VISION — script.js
   ============================================ */

   const navbar = document.querySelector('.navbar');
   const navLinks = document.querySelectorAll('.nav-links a');
   const navToggle = document.querySelector('.nav-toggle');
   const mobileMenu = document.getElementById('mobileMenu');
   const mobileClose = document.getElementById('mobileClose');
   const mobileLinks = document.querySelectorAll('.mobile-link');
   
   let lastScrollY = window.scrollY;
   let disableAutoHide = false;
   
   /* ── Navbar hide / show on scroll ── */
   window.addEventListener('scroll', () => {
     if (disableAutoHide) return;
     const currentY = window.scrollY;
     if (currentY <= 0) {
       navbar.classList.remove('navbar-hidden');
     } else if (currentY > lastScrollY) {
       navbar.classList.add('navbar-hidden');
     } else {
       navbar.classList.remove('navbar-hidden');
     }
     lastScrollY = currentY;
   });
   
   /* ── Smooth scroll for desktop nav links ── */
   function scrollToSection(targetId) {
     const target = document.querySelector(targetId);
     if (!target) return;
   
     disableAutoHide = true;
     navbar.classList.remove('navbar-hidden');
   
     const offset = targetId === '#home' ? 0 : navbar.offsetHeight;
     const top = target.getBoundingClientRect().top + window.scrollY - offset;
   
     window.scrollTo({ top, behavior: 'smooth' });
   
     const unlock = () => {
       disableAutoHide = false;
       lastScrollY = window.scrollY;
     };
     window.addEventListener('wheel', unlock, { once: true });
     window.addEventListener('touchstart', unlock, { once: true });
     window.addEventListener('keydown', unlock, { once: true });
   }
   
   navLinks.forEach(link => {
     link.addEventListener('click', e => {
       const href = link.getAttribute('href');
       if (!href || !href.startsWith('#')) return;
       e.preventDefault();
       scrollToSection(href);
     });
   });
   
   /* ── Mobile menu ── */
   navToggle.addEventListener('click', () => {
     mobileMenu.classList.add('open');
     document.body.style.overflow = 'hidden';
   });
   
   function closeMobileMenu() {
     mobileMenu.classList.remove('open');
     document.body.style.overflow = '';
   }
   
   mobileClose.addEventListener('click', closeMobileMenu);
   
   mobileLinks.forEach(link => {
     link.addEventListener('click', e => {
       const href = link.getAttribute('href');
       closeMobileMenu();
       if (!href || !href.startsWith('#')) return;
       e.preventDefault();
       setTimeout(() => scrollToSection(href), 100);
     });
   });
   
   /* ── Services image slideshow ── */
   const serviceImages = [
     'images/services.jpg',
     'images/services1.jpg',
     'images/services2.jpg'
   ];
   
   let currentImg = 0;
   const hero = document.querySelector('.hero');
   
   if (hero) {
     setInterval(() => {
       currentImg = (currentImg + 1) % serviceImages.length;
       hero.style.transition = 'none';
   
       const next = new Image();
       next.src = serviceImages[currentImg];
       next.onload = () => {
         hero.style.backgroundImage =
           `linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.55)), url('${serviceImages[currentImg]}')`;
       };
     }, 6000);
   }