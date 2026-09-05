// ======================================================
// StudyTown Frontend Script
// ======================================================

// Cloudflare Worker Payment API
const PAYMENT_API =
  "https://shy-field-cc38studytown-payment.tarunsaini201986.workers.dev/create-order";


// ======================================================
// Smooth Scroll
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (event) {
    const href = this.getAttribute('href');

    // Ignore empty hash
    if (!href || href === '#') {
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});


// ======================================================
// Coming Soon Links
// ======================================================

document.querySelectorAll('.coming-link').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault();

    alert('This section will be uploaded soon.');
  });
});


// ======================================================
// Cashfree Payment Integration
// ======================================================

document.querySelectorAll('.payment-placeholder').forEach(button => {

  button.addEventListener('click', async () => {

    // Get product ID from HTML button
    const productId = button.dataset.product;

    if (!productId) {
      alert(
        'Product configuration is missing. Please contact StudyTown support.'
      );

      return;
    }


    // Save original button text
    const originalText = button.textContent;


    try {

      // Disable button to prevent double click
      button.disabled = true;

      button.textContent = 'Loading payment...';


      // Create payment order through Cloudflare Worker
      const response = await fetch(PAYMENT_API, {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          productId: productId
        })

      });


      // Read API response
      const data = await response.json();

      console.log('StudyTown Payment Response:', data);


      // Check payment order
      if (
        !response.ok ||
        !data.success ||
        !data.payment_session_id
      ) {

        console.error('Payment API Error:', data);

        throw new Error(
          data.message ||
          'Unable to create payment order.'
        );

      }


      // Check if Cashfree SDK is loaded
      if (typeof Cashfree === 'undefined') {

        throw new Error(
          'Cashfree payment system is not loaded. Please refresh the page and try again.'
        );

      }


      // ==================================================
      // IMPORTANT
      // Production / Live Payment Mode
      // ==================================================

      const cashfree = Cashfree({
        mode: 'production'
      });


      // Open Cashfree Checkout
      const checkoutOptions = {

        paymentSessionId: data.payment_session_id,

        redirectTarget: '_self'

      };


      // Start payment
      cashfree.checkout(checkoutOptions);


    } catch (error) {

      console.error('Payment Error:', error);


      alert(
        error.message ||
        'Unable to start payment. Please try again.'
      );


      // Enable button again
      button.disabled = false;

      button.textContent = originalText;

    }

  });

});


// ======================================================
// My Courses / Login
// ======================================================

document.querySelectorAll('.login-btn').forEach(button => {

  button.addEventListener('click', () => {

    alert(
      'My Courses will be available after the course access system is added.'
    );

  });

});


// ======================================================
// Mobile Hamburger Menu
// ======================================================

document.querySelectorAll('.menu-toggle').forEach(menuButton => {

  const navbar = menuButton.closest('.navbar');


  const navLinks = navbar
    ? navbar.querySelector('.nav-links')
    : null;


  if (!navLinks) {
    return;
  }


  // Add My Courses to mobile menu
  if (!navLinks.querySelector('.mobile-my-courses')) {

    const myCoursesLink =
      document.createElement('a');


    myCoursesLink.href = '#';

    myCoursesLink.className =
      'mobile-my-courses';


    myCoursesLink.textContent =
      'My Courses';


    myCoursesLink.addEventListener(
      'click',
      event => {

        event.preventDefault();

        alert(
          'My Courses will be available after the course access system is added.'
        );

      }
    );


    navLinks.appendChild(myCoursesLink);

  }


  // Open / Close Mobile Menu
  menuButton.addEventListener('click', () => {

    const isOpen =
      navLinks.classList.toggle(
        'mobile-active'
      );


    menuButton.classList.toggle(
      'active',
      isOpen
    );


    menuButton.setAttribute(
      'aria-expanded',
      String(isOpen)
    );


    menuButton.textContent =
      isOpen
        ? '✕'
        : '☰';

  });


  // Close mobile menu after clicking a link
  navLinks.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      navLinks.classList.remove(
        'mobile-active'
      );


      menuButton.classList.remove(
        'active'
      );


      menuButton.setAttribute(
        'aria-expanded',
        'false'
      );


      menuButton.textContent =
        '☰';

    });

  });

});
