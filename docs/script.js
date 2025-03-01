console.log("script.js loaded!"); 

// Function to unlock the screen immediately when the button is clicked
function unlockScreen() {
    document.querySelector('.lockscreen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
}

// Function to go back to the lock screen
function goBackToLockScreen() {
    document.querySelector('.lockscreen').style.display = 'flex';
    document.getElementById('home-screen').style.display = 'none';
}

// Function to scroll smoothly to the "Experience" section
function scrollToExperience() {
    const experienceSection = document.getElementById('experience');
    experienceSection.scrollIntoView({ behavior: 'smooth' });
}

// Initialize EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);  // Replace with your EmailJS user ID

// Event listener for email form submission
document.getElementById('email-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent default form submission

    // Send form data via EmailJS
    emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, this)  // Replace with your actual service ID and template ID
        .then(function (response) {
            console.log('SUCCESS!', response);
            alert('Your message has been sent!');
        }, function (error) {
            console.log('FAILED...', error);
            alert('Something went wrong. Please try again.');
        });
});
