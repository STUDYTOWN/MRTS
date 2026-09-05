// ================================
// SMOOTH SCROLL
// ================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (event) {
    const href = this.getAttribute('href');

    // "#" जैसे empty links को ignore करो
    if (href === '#') return;

    const target = document.querySelector(href);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});


// ================================
// COMING SOON LINKS
// ================================

document.querySelectorAll('.coming-link').forEach(item => {
  item.addEventListener('click', function (event) {
    event.preventDefault();
    alert('यह Section जल्द उपलब्ध होगा!');
  });
});


// ================================
// CASHFREE PAYMENT INTEGRATION
// ================================

document.querySelectorAll('.payment-placeholder').forEach(button => {

  button.addEventListener('click', async () => {

    // HTML button से product ID प्राप्त करो
    const productId = button.dataset.product;

    if (!productId) {
      alert('Product ID नहीं मिली। कृपया दोबारा कोशिश करें।');
      return;
    }

    const originalText = button.textContent;

    try {

      // Loading state
      button.disabled = true;
      button.textContent = 'Loading...';

      // Cloudflare Worker API को request भेजो
      const response = await fetch(
        'https://shy-field-cc38studytown-payment.tarunsaini201986.workers.dev/create-order',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            productId: productId
          })
        }
      );

      // Response JSON
      const data = await response.json();

      // Error handling
      if (!response.ok || !data.success) {

        console.error('Payment API Error:', data);

        alert(
          data.message ||
          'Payment order create नहीं हो सका। कृपया दोबारा कोशिश करें।'
        );

        return;
      }


      // ================================
      // CASHFREE SDK CHECK
      // ================================

      if (typeof Cashfree === 'undefined') {

        console.error('Cashfree SDK is not loaded.');

        alert(
          'Payment system अभी load नहीं हुआ। कृपया page refresh करके दोबारा कोशिश करें।'
        );

        return;
      }


      // ================================
      // INITIALIZE CASHFREE
      // ================================

      const cashfree = new Cashfree(
        data.payment_session_id
      );


      // ================================
      // REDIRECT TO PAYMENT PAGE
      // ================================

      cashfree.redirect();

    } catch (error) {

      console.error('Payment Error:', error);

      alert(
        'Payment शुरू करने में समस्या हुई। कृपया Internet connection check करके दोबारा कोशिश करें।'
      );

    } finally {

      // अगर redirect नहीं हुआ तो button वापस normal हो जाएगा
      button.disabled = false;
      button.textContent = originalText;

    }

  });

});


// ================================
// LOGIN BUTTON
// ================================

document.querySelectorAll('.login-btn').forEach(button => {

  button.addEventListener('click', () => {

    alert(
      'My Courses and Login System will be available soon.'
    );

  });

});


// ================================
// MOBILE HAMBURGER MENU
// ================================

document.querySelectorAll('.menu-toggle').forEach(menuButton => {

  const navbar = menuButton.closest('.navbar');

  const navLinks = navbar
    ? navbar.querySelector('.nav-links')
    : null;


  if (!navLinks) return;


  // ================================
  // ADD MY COURSES TO MOBILE MENU
  // ================================

  if (!navLinks.querySelector('.mobile-my-courses')) {

    const myCoursesLink = document.createElement('a');

    myCoursesLink.href = '#';

    myCoursesLink.className = 'mobile-my-courses';

    myCoursesLink.textContent = 'My Courses';


    myCoursesLink.addEventListener(
      'click',
      function (event) {

        event.preventDefault();

        alert(
          'My Courses and Login System will be available soon.'
        );

      }
    );


    navLinks.appendChild(myCoursesLink);

  }


  // ================================
  // OPEN / CLOSE MOBILE MENU
  // ================================

  menuButton.addEventListener('click', () => {

    const isOpen = navLinks.classList.toggle(
      'mobile-active'
    );

    menuButton.classList.toggle(
      'active',
      isOpen
    );


    menuButton.setAttribute(
      'aria-expanded',
      isOpen ? 'true' : 'false'
    );


    menuButton.textContent =
      isOpen ? '✕' : '☰';

  });


  // ================================
  // CLOSE MENU AFTER CLICK
  // ================================

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


      menuButton.textContent = '☰';

    });

  });

});
