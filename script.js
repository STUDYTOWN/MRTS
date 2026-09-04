document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (event) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('.coming-link').forEach(item => {
  item.addEventListener('click', function (event) {
    event.preventDefault();
    alert('यह Section जल्द उपलब्ध होगा!');
  });
});

document.querySelectorAll('.payment-placeholder').forEach(button => {
  button.addEventListener('click', () => {
    alert('Payment Gateway अगला Step है। Cashfree integration जोड़ने के बाद Buy Now button को payment page से जोड़ा जाएगा।');
  });
});

document.querySelectorAll('.login-btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('My Courses and Login System will be available soon.');
  });
});


// Mobile Hamburger Menu
document.querySelectorAll('.menu-toggle').forEach(menuButton => {
  const navbar = menuButton.closest('.navbar');
  const navLinks = navbar ? navbar.querySelector('.nav-links') : null;

  if (!navLinks) return;

  // Add My Courses inside the mobile menu.
  if (!navLinks.querySelector('.mobile-my-courses')) {
    const myCoursesLink = document.createElement('a');
    myCoursesLink.href = '#';
    myCoursesLink.className = 'mobile-my-courses';
    myCoursesLink.textContent = 'My Courses';

    myCoursesLink.addEventListener('click', function(event) {
      event.preventDefault();
      alert('My Courses and Login System will be available soon.');
    });

    navLinks.appendChild(myCoursesLink);
  }

  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-active');
    menuButton.classList.toggle('active', isOpen);
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuButton.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      menuButton.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    });
  });
});
