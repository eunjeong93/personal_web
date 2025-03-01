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

// 🔥 EmailJS 환경 변수 불러오기
window.onload = function () {
    console.log("Loading EmailJS config...");

    fetch("/config.js")  // 📌 환경 변수 불러오기
        .then(response => response.text())
        .then(script => {
            eval(script);  // 📌 config.js 실행 (환경 변수 적용)

            console.log("✅ EmailJS Public Key Loaded:", window.EMAILJS_PUBLIC_KEY);

            // 📌 EmailJS 초기화
            emailjs.init(window.EMAILJS_PUBLIC_KEY);

            // 📌 이메일 폼 제출 이벤트 리스너 추가
            document.getElementById('email-form').addEventListener('submit', function (event) {
                event.preventDefault();  // 기본 제출 방지

                emailjs.sendForm(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ID, this)
                    .then(function (response) {
                        console.log('✅ SUCCESS!', response);
                        alert('Your message has been sent!');
                    })
                    .catch(function (error) {
                        console.log('❌ FAILED...', error);
                        alert('Something went wrong. Please try again.');
                    });
            });
        })
        .catch(error => console.error("❌ Failed to load EmailJS config:", error));
};
