// ==========================================
// SkillMatch - Common JavaScript
// File: frontend/js/script.js
// ==========================================


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    initializeNavbar();

    initializeUserInterface();

    updateLoginState();

    highlightActivePage();

});


// ==========================================
// NAVBAR
// ==========================================

function initializeNavbar() {

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuButton && navLinks) {

        menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("show");

        });

    }


    // Close mobile menu after clicking a link

    const links =
        document.querySelectorAll(".nav-links a");


    links.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navLinks) {

                navLinks.classList.remove("show");

            }

        });

    });

}


// ==========================================
// HIGHLIGHT ACTIVE PAGE
// ==========================================

function highlightActivePage() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navLinks =
        document.querySelectorAll(".nav-links a");


    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");


        if (!linkPage) {

            return;

        }


        const cleanLink =
            linkPage
                .split("?")[0]
                .split("/")
                .pop()
                .toLowerCase();


        if (
            cleanLink === currentPage &&
            currentPage !== ""
        ) {

            link.classList.add("active");

        }

    });

}


// ==========================================
// LOGIN STATE
// ==========================================

function updateLoginState() {

    const isLoggedIn =
        localStorage.getItem(
            "skillMatchLoggedIn"
        ) === "true";


    const loginLinks =
        document.querySelectorAll(
            '[data-auth="login"]'
        );


    const registerLinks =
        document.querySelectorAll(
            '[data-auth="register"]'
        );


    const logoutButtons =
        document.querySelectorAll(
            '[data-auth="logout"]'
        );


    if (isLoggedIn) {

        loginLinks.forEach(function (link) {

            link.style.display = "none";

        });


        registerLinks.forEach(function (link) {

            link.style.display = "none";

        });


        logoutButtons.forEach(function (button) {

            button.style.display = "inline-flex";

        });

    }

    else {

        logoutButtons.forEach(function (button) {

            button.style.display = "none";

        });

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        "skillMatchLoggedIn"
    );

    localStorage.removeItem(
        "skillMatchUser"
    );


    alert(
        "You have been logged out successfully."
    );


    window.location.href =
        "index.html";

}


// ==========================================
// CHECK LOGIN
// ==========================================

function isUserLoggedIn() {

    return (
        localStorage.getItem(
            "skillMatchLoggedIn"
        ) === "true"
    );

}


// ==========================================
// REQUIRE LOGIN
// ==========================================

function requireLogin() {

    if (!isUserLoggedIn()) {

        alert(
            "Please login to access this page."
        );


        window.location.href =
            "login.html";

        return false;

    }


    return true;

}


// ==========================================
// GET CURRENT USER
// ==========================================

function getCurrentUser() {

    const user =
        localStorage.getItem(
            "skillMatchUser"
        );


    if (!user) {

        return null;

    }


    try {

        return JSON.parse(user);

    }

    catch (error) {

        console.error(
            "Unable to read user information:",
            error
        );

        return null;

    }

}


// ==========================================
// SAVE CURRENT USER
// ==========================================

function saveCurrentUser(user) {

    localStorage.setItem(
        "skillMatchUser",
        JSON.stringify(user)
    );

}


// ==========================================
// NOTIFICATION
// ==========================================

function showNotification(
    message,
    type = "success"
) {

    const oldNotification =
        document.querySelector(
            ".skillmatch-notification"
        );


    if (oldNotification) {

        oldNotification.remove();

    }


    const notification =
        document.createElement("div");


    notification.className =
        `skillmatch-notification ${type}`;


    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(function () {

        notification.classList.add(
            "show"
        );

    }, 10);


    setTimeout(function () {

        notification.classList.remove(
            "show"
        );


        setTimeout(function () {

            notification.remove();

        }, 300);

    }, 3000);

}


// ==========================================
// FORM VALIDATION
// ==========================================

function validateRequiredFields(form) {

    if (!form) {

        return false;

    }


    const requiredFields =
        form.querySelectorAll(
            "[required]"
        );


    let valid = true;


    requiredFields.forEach(function (field) {

        if (!field.value.trim()) {

            field.classList.add(
                "input-error"
            );

            valid = false;

        }

        else {

            field.classList.remove(
                "input-error"
            );

        }

    });


    if (!valid) {

        showNotification(
            "Please fill in all required fields.",
            "error"
        );

    }


    return valid;

}


// ==========================================
// PASSWORD VALIDATION
// ==========================================

function validatePassword(password) {

    if (!password) {

        return false;

    }


    return password.length >= 6;

}


// ==========================================
// EMAIL VALIDATION
// ==========================================

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(email);

}


// ==========================================
// FORMAT PERCENTAGE
// ==========================================

function formatPercentage(value) {

    const number =
        Number(value) || 0;


    return Math.round(number) + "%";

}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(date) {

    const newDate =
        new Date(date);


    if (Number.isNaN(newDate.getTime())) {

        return "";

    }


    return newDate.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ==========================================
// CAPITALIZE TEXT
// ==========================================

function capitalizeText(text) {

    if (!text) {

        return "";

    }


    return text.charAt(0).toUpperCase()
        + text.slice(1);

}


// ==========================================
// DEBOUNCE FUNCTION
// ==========================================

function debounce(
    callback,
    delay = 300
) {

    let timeout;


    return function (...args) {

        clearTimeout(timeout);


        timeout =
            setTimeout(function () {

                callback.apply(
                    this,
                    args
                );

            }, delay);

    };

}


// ==========================================
// SCROLL TO SECTION
// ==========================================

function scrollToSection(sectionId) {

    const section =
        document.getElementById(
            sectionId
        );


    if (!section) {

        return;

    }


    section.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


// ==========================================
// GO TO PAGE
// ==========================================

function goToPage(page) {

    if (!page) {

        return;

    }


    window.location.href = page;

}


// ==========================================
// CONFIRM ACTION
// ==========================================

function confirmAction(
    message,
    callback
) {

    const confirmed =
        confirm(message);


    if (
        confirmed &&
        typeof callback === "function"
    ) {

        callback();

    }

}


// ==========================================
// SEARCH HELPER
// ==========================================

function searchInItems(
    items,
    searchText,
    fields
) {

    if (!Array.isArray(items)) {

        return [];

    }


    if (!searchText) {

        return items;

    }


    const query =
        searchText
            .toLowerCase()
            .trim();


    return items.filter(function (item) {

        return fields.some(function (field) {

            const value =
                String(
                    item[field] || ""
                ).toLowerCase();


            return value.includes(query);

        });

    });

}


// ==========================================
// LOCAL STORAGE HELPERS
// ==========================================

function saveToStorage(
    key,
    value
) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    }

    catch (error) {

        console.error(
            "Storage error:",
            error
        );

        return false;

    }

}


function getFromStorage(key, defaultValue = null) {

    const value =
        localStorage.getItem(key);


    if (!value) {

        return defaultValue;

    }


    try {

        return JSON.parse(value);

    }

    catch (error) {

        console.error(
            "Unable to read storage:",
            error
        );

        return defaultValue;

    }

}


function removeFromStorage(key) {

    localStorage.removeItem(key);

}


// ==========================================
// SKILL LEVEL HELPERS
// ==========================================

function getSkillLevel(score) {

    score = Number(score);


    if (score >= 90) {

        return "Expert";

    }


    if (score >= 75) {

        return "Advanced";

    }


    if (score >= 50) {

        return "Intermediate";

    }


    return "Beginner";

}


// ==========================================
// SKILL STATUS
// ==========================================

function getSkillStatus(score) {

    score = Number(score);


    if (score >= 90) {

        return "Excellent";

    }


    if (score >= 75) {

        return "Good";

    }


    if (score >= 50) {

        return "Improving";

    }


    return "Need Improvement";

}


// ==========================================
// CALCULATE AVERAGE
// ==========================================

function calculateAverage(values) {

    if (
        !Array.isArray(values) ||
        values.length === 0
    ) {

        return 0;

    }


    const total =
        values.reduce(
            function (sum, value) {

                return sum + Number(value || 0);

            },
            0
        );


    return Math.round(
        total / values.length
    );

}


// ==========================================
// UPDATE PROGRESS BAR
// ==========================================

function updateProgressBar(
    elementId,
    percentage
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;

    }


    let value =
        Number(percentage) || 0;


    value =
        Math.max(
            0,
            Math.min(100, value)
        );


    element.style.width =
        value + "%";


    element.setAttribute(
        "aria-valuenow",
        value
    );

}


// ==========================================
// TOGGLE PASSWORD VISIBILITY
// ==========================================

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(
            inputId
        );


    if (!input) {

        return;

    }


    if (input.type === "password") {

        input.type = "text";


        if (button) {

            button.textContent =
                "Hide";

        }

    }

    else {

        input.type = "password";


        if (button) {

            button.textContent =
                "Show";

        }

    }

}


// ==========================================
// PREVENT EMPTY LINKS
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                'a[href="#"]'
            );


        if (link) {

            event.preventDefault();

        }

    }
);


// ==========================================
// GLOBAL FUNCTIONS
// ==========================================

window.SkillMatch = {

    logoutUser,

    isUserLoggedIn,

    requireLogin,

    getCurrentUser,

    saveCurrentUser,

    showNotification,

    validateRequiredFields,

    validatePassword,

    validateEmail,

    formatPercentage,

    formatDate,

    capitalizeText,

    debounce,

    scrollToSection,

    goToPage,

    confirmAction,

    searchInItems,

    saveToStorage,

    getFromStorage,

    removeFromStorage,

    getSkillLevel,

    getSkillStatus,

    calculateAverage,

    updateProgressBar,

    togglePassword

};