// ======================================================
// StudyTown Frontend Script
// ======================================================


// ======================================================
// Cloudflare Worker Payment API
// ======================================================

const PAYMENT_API =
  "https://shy-field-cc38studytown-payment.tarunsaini201986.workers.dev";


// ======================================================
// Smooth Scroll
// ======================================================

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      function (event) {

        const href =
          this.getAttribute("href");


        // Ignore empty hash links
        if (
          !href ||
          href === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(href);


        if (target) {

          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  });


// ======================================================
// Coming Soon Links
// ======================================================

document
  .querySelectorAll(".coming-link")
  .forEach(item => {

    item.addEventListener(
      "click",
      event => {

        event.preventDefault();


        alert(
          "This section will be uploaded soon."
        );

      }
    );

  });


// ======================================================
// Cashfree Payment Integration
// ======================================================

document
  .querySelectorAll(".payment-placeholder")
  .forEach(button => {


    button.addEventListener(
      "click",
      async () => {


        // ================================================
        // Get Product ID
        // ================================================

        const productId =
          button.dataset.product;


        // Check Product ID
        if (!productId) {

          alert(
            "Product configuration is missing. Please contact StudyTown support."
          );

          return;

        }


        // ================================================
        // Save Original Button Text
        // ================================================

        const originalText =
          button.textContent;


        try {


          // ==============================================
          // Prevent Double Click
          // ==============================================

          button.disabled =
            true;


          button.textContent =
            "Creating secure payment...";


          console.log(
            "Creating order for product:",
            productId
          );


          // ==============================================
          // Create Order Through Cloudflare Worker
          // ==============================================

          const response =
            await fetch(

              PAYMENT_API +
              "/create-order",

              {

                method: "POST",

                headers: {

                  "Content-Type":
                    "application/json"

                },

                body:
                  JSON.stringify({

                    productId:
                      productId

                  })

              }

            );


          // ==============================================
          // Read Response Safely
          // ==============================================

          let data;


          try {

            data =
              await response.json();

          } catch (jsonError) {

            console.error(
              "Invalid JSON response:",
              jsonError
            );


            throw new Error(
              "Payment server returned an invalid response."
            );

          }


          // ==============================================
          // Debug Response
          // ==============================================

          console.log(
            "StudyTown Payment Response:",
            data
          );


          // ==============================================
          // Check HTTP Error
          // ==============================================

          if (!response.ok) {

            throw new Error(

              data.message ||

              data.error ||

              "Unable to create payment order."

            );

          }


          // ==============================================
          // Check Success
          // ==============================================

          if (!data.success) {

            throw new Error(

              data.message ||

              "Payment order creation failed."

            );

          }


          // ==============================================
          // Check Payment Session ID
          // ==============================================

          if (

            !data.payment_session_id ||

            typeof data.payment_session_id !==
              "string" ||

            data.payment_session_id.trim() === ""

          ) {

            console.error(
              "Invalid payment_session_id:",
              data
            );


            throw new Error(
              "Payment session could not be created. Please try again."
            );

          }


          console.log(
            "Payment session created successfully."
          );


          // ==============================================
          // Check Cashfree SDK
          // ==============================================

          if (
            typeof Cashfree === "undefined"
          ) {

            throw new Error(
              "Cashfree payment system is not loaded. Please refresh the page and try again."
            );

          }


          // ==============================================
          // Live Cashfree Production Mode
          // ==============================================

          const cashfree =
            Cashfree({

              mode:
                "production"

            });


          // ==============================================
          // Checkout Options
          // ==============================================

          const checkoutOptions = {

            paymentSessionId:
              data.payment_session_id,

            redirectTarget:
              "_self"

          };


          console.log(
            "Opening Cashfree Checkout..."
          );


          // ==============================================
          // Open Cashfree Checkout
          // ==============================================

          const checkoutResult =
            await cashfree.checkout(
              checkoutOptions
            );


          console.log(
            "Cashfree Checkout Result:",
            checkoutResult
          );


          // ==============================================
          // If Checkout Returns Error
          // ==============================================

          if (
            checkoutResult &&
            checkoutResult.error
          ) {

            throw new Error(

              checkoutResult.error.message ||

              "Unable to open payment checkout."

            );

          }


        } catch (error) {


          // ==============================================
          // Log Error
          // ==============================================

          console.error(
            "StudyTown Payment Error:",
            error
          );


          // ==============================================
          // Show Error
          // ==============================================

          alert(

            error.message ||

            "Unable to start payment. Please try again."

          );


          // ==============================================
          // Restore Button
          // ==============================================

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
  .querySelectorAll(".login-btn")
  .forEach(button => {


    button.addEventListener(
      "click",
      () => {

        window.location.href =
          "my-courses.html";

      }
    );


  });


// ======================================================
// Mobile Hamburger Menu
// ======================================================

document
  .querySelectorAll(".menu-toggle")
  .forEach(menuButton => {


    const navbar =
      menuButton.closest(
        ".navbar"
      );


    const navLinks =
      navbar

        ? navbar.querySelector(
            ".nav-links"
          )

        : null;


    // Stop if navigation links do not exist
    if (!navLinks) {
      return;
    }


    // ==================================================
    // Add My Courses Link to Mobile Menu
    // ==================================================

    if (

      !navLinks.querySelector(
        ".mobile-my-courses"
      )

    ) {


      const myCoursesLink =
        document.createElement(
          "a"
        );


      myCoursesLink.href =
        "my-courses.html";


      myCoursesLink.className =
        "mobile-my-courses";


      myCoursesLink.textContent =
        "My Courses";


      navLinks.appendChild(
        myCoursesLink
      );

    }


    // ==================================================
    // Open / Close Mobile Menu
    // ==================================================

    menuButton.addEventListener(
      "click",
      () => {


        const isOpen =
          navLinks.classList.toggle(
            "mobile-active"
          );


        menuButton.classList.toggle(
          "active",
          isOpen
        );


        menuButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );


        menuButton.textContent =
          isOpen

            ? "✕"

            : "☰";


      }
    );


    // ==================================================
    // Close Menu After Clicking Link
    // ==================================================

    navLinks
      .querySelectorAll("a")
      .forEach(link => {


        link.addEventListener(
          "click",
          () => {


            navLinks.classList.remove(
              "mobile-active"
            );


            menuButton.classList.remove(
              "active"
            );


            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );


            menuButton.textContent =
              "☰";


          }
        );


      });


  });
