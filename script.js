// =====================================
// STUDYTOWN - MAIN JAVASCRIPT
// =====================================


// Smooth scrolling for internal links

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener('click', function (event) {

    event.preventDefault();

    const target = document.querySelector(
      this.getAttribute('href')
    );

    if (target) {

      target.scrollIntoView({
        behavior: 'smooth'
      });

    }

  });

});


// Class Explore Buttons

const classButtons = document.querySelectorAll(
  '.class-card .card-btn'
);

classButtons.forEach((button, index) => {

  button.addEventListener('click', () => {

    const classNumber = [10, 11, 12][index];

    alert(
      `कक्षा ${classNumber} के Courses जल्द उपलब्ध होंगे!`
    );

  });

});


// Premium Course Buttons

const buyButtons = document.querySelectorAll(
  '.buy-btn'
);

buyButtons.forEach((button, index) => {

  button.addEventListener('click', () => {

    if (index === 0) {

      alert(
        'हिंदी – आरोह भाग 2 Course जल्द खुलेगा।'
      );

    }

    else if (index === 1) {

      alert(
        'Complete Course की जानकारी जल्द उपलब्ध होगी।'
      );

    }

  });

});


// Free Resource Buttons

const freeButtons = document.querySelectorAll(
  '.free-card button'
);

freeButtons.forEach((button, index) => {

  button.addEventListener('click', () => {

    if (index === 0) {

      alert(
        'Important Questions Section जल्द खुलेगा!'
      );

    }

    else {

      alert(
        'PYQs Section जल्द खुलेगा!'
      );

    }

  });

});


// My Courses Button

const myCoursesButton = document.querySelector(
  '.login-btn'
);

if (myCoursesButton) {

  myCoursesButton.addEventListener('click', () => {

    alert(
      'My Courses और Login System जल्द उपलब्ध होगा!'
    );

  });

}