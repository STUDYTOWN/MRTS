// ======================================================
// StudyTown Frontend Script
// ======================================================


// ======================================================
// Cloudflare Worker Payment API
// ======================================================

const PAYMENT_API =
  "https://shy-field-cc38studytown-payment.tarunsaini201986.workers.dev/create-order";


// ======================================================
// Cashfree Environment
// ======================================================

// अभी Sandbox Testing चल रही है.
// Live payment शुरू करने के समय इसे "production" करना होगा.

const CASHFREE_MODE = "sandbox";


// ======================================================
// Smooth Scroll
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener('click', function (event) {

    const href =
      this.getAttribute('href');


    // Ignore empty hash links
    if (!href || href === '#') {
      return;
    }


    const target =
      document.querySelector(href);


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

    alert(
      'This section will be uploaded soon.'
    );

  });

});


// ======================================================
// Cashfree Payment Integration
// ======================================================

document
  .querySelectorAll('.payment-placeholder')
  .forEach(button => {


    button.addEventListener(
      'click',
      async () => {


        // ==================================================
        // Get Product ID
        // ==================================================

        const productId =
          button.dataset.product;


        // ==================================================
        // Validate Product ID
        // ==================================================

        if (!productId) {

          alert(
            'Product configuration is missing. Please contact StudyTown support.'
          );

          return;

        }


        // ==================================================
        // Save Original Button Text
        // ==================================================

        const originalText =
          button.textContent;


        try {


          // ==================================================
          // Prevent Double Click
          // ==================================================

          button.disabled = true;

          button.textContent =
            'Creating order...';


          // ==================================================
          // Create Order Through Cloudflare Worker
          // ==================================================

          const response =
            await fetch(
              PAYMENT_API,
              {

                method: 'POST',

                headers: {

                  'Content-Type':
                    'application/json'

                },

                body:
                  JSON.stringify({

                    productId:
                      productId

                  })

              }
            );


          // ==================================================
          // Read API Response Safely
          // ==================================================

          let data;


          try {

            data =
              await response.json();

          } catch (jsonError) {

            throw new Error(
              'Invalid response received from payment server.'
            );

          }


          // ==================================================
          // Debug
          // ==================================================

          console.log(
            'StudyTown Payment Response:',
            data
          );


          // ==================================================
          // Validate API Response
          // ==================================================

          if (
            !response.ok ||
            !data.success
          ) {

            console.error(
              'Payment API Error:',
              data
            );


            throw new Error(

              data.message ||

              'Unable to create payment order.'

            );

          }


          // ==================================================
          // Validate Payment Session ID
          // ==================================================

          if (
            !data.payment_session_id
          ) {

            throw new Error(
              'Payment session was not created.'
            );

          }


          // ==================================================
          // Check Cashfree SDK
          // ==================================================

          if (
            typeof Cashfree ===
            'undefined'
          ) {

            throw new Error(
              'Cashfree payment system is not loaded. Please refresh the page and try again.'
            );

          }


          // ==================================================
          // Update Button
          // ==================================================

          button.textContent =
            'Opening payment...';


          // ==================================================
          // Initialize Cashfree
          // ==================================================

          const cashfree =
            Cashfree({

              mode:
                CASHFREE_MODE

            });


          // ==================================================
          // Checkout Options
          // ==================================================

          const checkoutOptions = {

            paymentSessionId:
              data.payment_session_id,


            // Payment checkout current page में open होगा
            redirectTarget:
              '_self'

          };


          // ==================================================
          // Open Cashfree Checkout
          // ==================================================

          const checkoutResult =
            await cashfree.checkout(
              checkoutOptions
            );


          // ==================================================
          // Debug Checkout Result
          // ==================================================

          console.log(
            'Cashfree Checkout Result:',
            checkoutResult
          );


        } catch (error) {


          // ==================================================
          // Error
          // ==================================================

          console.error(
            'StudyTown Payment Error:',
            error
          );


          alert(

            error.message ||

            'Unable to start payment. Please try again.'

          );


          // ==================================================
          // Restore Button
          // ==================================================

          button.disabled =
            false;


          button.textContent =
            originalText;

        }


      }
    );


  });


// ======================================================
// My Courses / Login Button
// ======================================================

document
  .querySelectorAll('.login-btn')
  .forEach(button => {


    button.addEventListener(
      'click',
      () => {


        alert(
          'My Courses will be available after the course access system is added.'
        );


      }
    );


  });


// ======================================================
// Mobile Hamburger Menu
// ======================================================

document
  .querySelectorAll('.menu-toggle')
  .forEach(menuButton => {


    const navbar =
      menuButton.closest(
        '.navbar'
      );


    const navLinks =
      navbar
        ? navbar.querySelector(
            '.nav-links'
          )
        : null;


    // Stop if navbar links do not exist
    if (!navLinks) {

      return;

    }


    // ====================================================
    // Add My Courses Link to Mobile Menu
    // ====================================================

    if (
      !navLinks.querySelector(
        '.mobile-my-courses'
      )
    ) {


      const myCoursesLink =
        document.createElement(
          'a'
        );


      myCoursesLink.href =
        '#';


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


      navLinks.appendChild(
        myCoursesLink
      );


    }


    // ====================================================
    // Open / Close Mobile Menu
    // ====================================================

    menuButton.addEventListener(
      'click',
      () => {


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


      }
    );


    // ====================================================
    // Close Mobile Menu After Clicking a Link
    // ====================================================

    navLinks
      .querySelectorAll('a')
      .forEach(link => {


        link.addEventListener(
          'click',
          () => {


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


          }
        );


      });


  });
