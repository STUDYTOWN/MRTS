// StudyTown Frontend Script
const PAYMENT_API = "https://shy-field-cc38studytown-payment.tarunsaini201986.workers.dev/create-order";

// Smooth scroll for valid hash links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (event) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Coming soon links
document.querySelectorAll('.coming-link').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault();
    alert('This section will be uploaded soon.');
  });
});

// Cashfree payment integration
document.querySelectorAll('.payment-placeholder').forEach(button => {
  button.addEventListener('click', async () => {
    const productId = button.dataset.product;
    if (!productId) {
      alert('Product configuration is missing. Please contact StudyTown support.');
      return;
    }

    const originalText = button.textContent;

    try {
      button.disabled = true;
      button.textContent = 'Loading payment...';

      const response = await fetch(PAYMENT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.payment_session_id) {
        console.error('Payment API error:', data);
        throw new Error(data.message || 'Unable to create payment order.');
      }

      if (typeof Cashfree === 'undefined') {
        throw new Error('Cashfree payment system is not loaded. Please refresh and try again.');
      }

      const cashfree = Cashfree({ mode: 'sandbox' });
      await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_self'
      });

    } catch (error) {
      console.error('Payment error:', error);
      alert(error.message || 'Unable to start payment. Please try again.');
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});

// Login / My Courses placeholder
document.querySelectorAll('.login-btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('My Courses will be available after the course access system is added.');
  });
});

// Mobile hamburger menu
document.querySelectorAll('.menu-toggle').forEach(menuButton => {
  const navbar = menuButton.closest('.navbar');
  const navLinks = navbar ? navbar.querySelector('.nav-links') : null;
  if (!navLinks) return;

  if (!navLinks.querySelector('.mobile-my-courses')) {
    const myCoursesLink = document.createElement('a');
    myCoursesLink.href = '#';
    myCoursesLink.className = 'mobile-my-courses';
    myCoursesLink.textContent = 'My Courses';
    myCoursesLink.addEventListener('click', event => {
      event.preventDefault();
      alert('My Courses will be available after the course access system is added.');
    });
    navLinks.appendChild(myCoursesLink);
  }

  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-active');
    menuButton.classList.toggle('active', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
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
