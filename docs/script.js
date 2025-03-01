console.log("script.js loaded!"); 

document.addEventListener("DOMContentLoaded", function () {
    console.log("Checking Lock Screen Status...");

    // localStorage에서 저장된 상태 확인 (잠금 화면 해제 여부)
    const isUnlocked = localStorage.getItem("isUnlocked");

    if (isUnlocked === "true") {
        console.log("✅ Lock Screen was previously unlocked. Showing Home Screen.");
        document.querySelector(".lockscreen").style.display = "none";
        document.getElementById("home-screen").style.display = "block";
    } else {
        console.log("🔒 Lock Screen is still active.");
        document.querySelector(".lockscreen").style.display = "flex";
        document.getElementById("home-screen").style.display = "none";
    }
});

// Function to unlock the screen immediately when the button is clicked
function unlockScreen() {
    console.log("🔓 Unlocking screen...");
    localStorage.setItem("isUnlocked", "true");  // 🔥 잠금 해제 상태 저장
    document.querySelector(".lockscreen").style.display = "none";
    document.getElementById("home-screen").style.display = "block";
}

// Function to go back to the lock screen
function goBackToLockScreen() {
    console.log("🔒 Locking screen again...");
    localStorage.setItem("isUnlocked", "false");  // 🔥 다시 잠금 화면으로 변경
    document.querySelector(".lockscreen").style.display = "flex";
    document.getElementById("home-screen").style.display = "none";
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
                        localStorage.setItem("isUnlocked", "true");
                    })
                    .catch(function (error) {
                        console.log('❌ FAILED...', error);
                        alert('Something went wrong. Please try again.');
                    });
            });
        })
        .catch(error => console.error("❌ Failed to load EmailJS config:", error));
};
