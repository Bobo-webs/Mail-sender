// Initialize EmailJS
(function () {
    emailjs.init("PHtc00_xTfspVqqr-");
})();

// Select elements
const form = document.getElementById("mailForm");
const overlay = document.getElementById("overlay");
const successPopup = document.getElementById("successPopup");
const errorPopup = document.getElementById("errorPopup");
const popupOverlay = document.getElementById("popupOverlay");

// Handle form submission
form.addEventListener("submit", function (e) {
    e.preventDefault();

    overlay.style.display = "flex";

    const templateParams = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value
    };

    emailjs.send("service_c0oe0ti", "template_64ujovc", templateParams)
        .then(function () {
            overlay.style.display = "none";
            openPopup("successPopup");
            form.reset();
            console.log("✅ Mail sent successfully via EmailJS");
        })
        .catch(function (error) {
            overlay.style.display = "none";

            const errorTitle = document.getElementById("errorTitle");
            const errorMessage = document.getElementById("errorMessage");

            if (error && (error.status === 404 || error.status === 400)) {
                errorTitle.textContent = "⚠️ Credentials Not Found";
                errorMessage.textContent = "Invalid EmailJS service ID, template ID, or public key. Please verify your credentials.";
            } else if (error && error.status === 429) {
                errorTitle.textContent = "⚠️ Quota Limit Reached";
                errorMessage.textContent = "Your EmailJS sending quota has been exhausted. Please upgrade your plan or try again later.";
            } else if (!navigator.onLine) {
                errorTitle.textContent = "⚠️ Network Error";
                errorMessage.textContent = "Network connection lost. Please check your internet and try again.";
            } else {
                errorTitle.textContent = "⚠️ Mail Delivery Failed";
                errorMessage.textContent = "We couldn’t send your mail. Please verify your configuration or try again later.";
            }

            openPopup("errorPopup");
            console.error("❌ Error sending mail:", error);
        });
});

// Popup controls
function openPopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = "block";
    popup.style.opacity = "1";
    popup.style.transform = "translate(-50%, -50%) scale(1)";
    popupOverlay.classList.add("active");
}

function closePopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = "none";
    popupOverlay.classList.remove("active");
}