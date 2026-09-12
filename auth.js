// ==========================================
// SkillMatch - Authentication JavaScript
// File: frontend/js/auth.js
// ==========================================


// ==========================================
// API URL
// ==========================================

const AUTH_API =
    "/api/auth";


// ==========================================
// REGISTER USER
// ==========================================

async function registerUser(event) {

    event.preventDefault();


    const form =
        document.getElementById("registerForm");


    if (!form) {

        return;

    }


    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const college =
        document.getElementById("college").value.trim();

    const branch =
        document.getElementById("branch").value.trim();

    const studyYear =
        document.getElementById("studyYear").value;

    const careerGoal =
        document.getElementById("careerGoal").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // --------------------------------------
    // Validation
    // --------------------------------------

    if (
        !fullName ||
        !email ||
        !college ||
        !branch ||
        !studyYear ||
        !careerGoal ||
        !password ||
        !confirmPassword
    ) {

        showAuthMessage(
            "Please fill in all required fields.",
            "error"
        );

        return;

    }


    if (!validateEmail(email)) {

        showAuthMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    if (!validatePassword(password)) {

        showAuthMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;

    }


    if (password !== confirmPassword) {

        showAuthMessage(
            "Passwords do not match.",
            "error"
        );

        return;

    }


    // --------------------------------------
    // Registration Button
    // --------------------------------------

    const button =
        form.querySelector(
            'button[type="submit"]'
        );


    setButtonLoading(
        button,
        true,
        "Creating Account..."
    );


    try {

        const response =
            await fetch(
                `${AUTH_API}/register`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        fullName,
                        email,
                        college,
                        branch,
                        studyYear,
                        careerGoal,
                        password,
                        confirmPassword

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            showAuthMessage(
                data.message ||
                "Registration failed.",
                "error"
            );

            return;

        }


        // ----------------------------------
        // Save user information
        // ----------------------------------

        if (data.user) {

            localStorage.setItem(
                "skillMatchUser",
                JSON.stringify(data.user)
            );

        }


        localStorage.setItem(
            "skillMatchLoggedIn",
            "true"
        );


        showAuthMessage(
            "Account created successfully!",
            "success"
        );


        // Redirect to dashboard

        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 1000);


    }

    catch (error) {

        console.error(
            "Registration Error:",
            error
        );


        showAuthMessage(
            "Unable to connect to the server. Please make sure the backend is running.",
            "error"
        );

    }

    finally {

        setButtonLoading(
            button,
            false,
            "Create Account"
        );

    }

}


// ==========================================
// LOGIN USER
// ==========================================

async function loginUser(event) {

    event.preventDefault();


    const form =
        document.getElementById("loginForm");


    if (!form) {

        return;

    }


    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const rememberMe =
        document.getElementById(
            "rememberMe"
        );


    if (!email || !password) {

        showAuthMessage(
            "Please enter your email and password.",
            "error"
        );

        return;

    }


    if (!validateEmail(email)) {

        showAuthMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    const button =
        form.querySelector(
            'button[type="submit"]'
        );


    setButtonLoading(
        button,
        true,
        "Logging in..."
    );


    try {

        const response =
            await fetch(
                `${AUTH_API}/login`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        email,
                        password

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            showAuthMessage(
                data.message ||
                "Invalid email or password.",
                "error"
            );

            return;

        }


        // ----------------------------------
        // Save user information
        // ----------------------------------

        if (data.user) {

            localStorage.setItem(
                "skillMatchUser",
                JSON.stringify(data.user)
            );

        }


        localStorage.setItem(
            "skillMatchLoggedIn",
            "true"
        );


        // Save remember-me preference

        if (rememberMe) {

            localStorage.setItem(
                "skillMatchRememberMe",
                rememberMe.checked
                    ? "true"
                    : "false"
            );

        }


        showAuthMessage(
            "Login successful! Redirecting...",
            "success"
        );


        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 800);


    }

    catch (error) {

        console.error(
            "Login Error:",
            error
        );


        showAuthMessage(
            "Unable to connect to the server. Please make sure the backend is running.",
            "error"
        );

    }

    finally {

        setButtonLoading(
            button,
            false,
            "Login"
        );

    }

}


// ==========================================
// LOGOUT USER
// ==========================================

async function logoutUser() {

    try {

        await fetch(
            `${AUTH_API}/logout`,
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                }

            }
        );

    }

    catch (error) {

        console.error(
            "Logout request failed:",
            error
        );

    }


    // Remove local login information

    localStorage.removeItem(
        "skillMatchLoggedIn"
    );

    localStorage.removeItem(
        "skillMatchUser"
    );

    localStorage.removeItem(
        "skillMatchRememberMe"
    );


    window.location.href =
        "index.html";

}


// ==========================================
// CHECK LOGIN STATUS
// ==========================================

function isLoggedIn() {

    return (
        localStorage.getItem(
            "skillMatchLoggedIn"
        ) === "true"
    );

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
            "Unable to read user:",
            error
        );

        return null;

    }

}


// ==========================================
// PROTECT PAGE
// ==========================================

function requireAuthentication() {

    if (!isLoggedIn()) {

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
// SHOW AUTH MESSAGE
// ==========================================

function showAuthMessage(
    message,
    type = "error"
) {

    // Login message

    const loginMessage =
        document.getElementById(
            "loginMessage"
        );


    // Registration message

    const registerMessage =
        document.getElementById(
            "registerMessage"
        );


    const messageElement =
        loginMessage ||
        registerMessage;


    if (!messageElement) {

        alert(message);

        return;

    }


    messageElement.textContent =
        message;


    messageElement.className =
        `auth-message ${type}`;


    messageElement.style.display =
        "block";

}


// ==========================================
// BUTTON LOADING STATE
// ==========================================

function setButtonLoading(
    button,
    loading,
    loadingText
) {

    if (!button) {

        return;

    }


    if (loading) {

        button.dataset.originalText =
            button.textContent;


        button.disabled = true;


        button.textContent =
            loadingText;

    }

    else {

        button.disabled = false;


        button.textContent =
            button.dataset.originalText ||
            "Submit";

    }

}


// ==========================================
// PASSWORD MATCH CHECK
// ==========================================

function checkPasswordMatch() {

    const password =
        document.getElementById(
            "password"
        );


    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        );


    if (
        !password ||
        !confirmPassword
    ) {

        return;

    }


    if (
        confirmPassword.value &&
        password.value !==
        confirmPassword.value
    ) {

        confirmPassword.classList.add(
            "input-error"
        );

    }

    else {

        confirmPassword.classList.remove(
            "input-error"
        );

    }

}


// ==========================================
// EMAIL CHECK
// ==========================================

async function checkEmailAvailability() {

    const emailInput =
        document.getElementById(
            "email"
        );


    if (!emailInput) {

        return;

    }


    const email =
        emailInput.value.trim();


    if (!email || !validateEmail(email)) {

        return;

    }


    try {

        const response =
            await fetch(
                `${AUTH_API}/check-email?email=${encodeURIComponent(email)}`
            );


        const data =
            await response.json();


        if (
            data.exists
        ) {

            showAuthMessage(
                "This email is already registered.",
                "error"
            );

        }

    }

    catch (error) {

        console.error(
            "Email check error:",
            error
        );

    }

}


// ==========================================
// PASSWORD VISIBILITY
// ==========================================

function toggleAuthPassword(
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


    if (
        input.type ===
        "password"
    ) {

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
// DEMO LOGIN
// ==========================================

async function demoLogin() {

    const emailInput =
        document.getElementById(
            "loginEmail"
        );


    const passwordInput =
        document.getElementById(
            "loginPassword"
        );


    if (!emailInput || !passwordInput) {

        return;

    }


    emailInput.value =
        "alex@example.com";


    passwordInput.value =
        "123456";


    showAuthMessage(
        "Demo login details filled. Click Login to continue.",
        "success"
    );

}


// ==========================================
// INITIALIZE AUTH
// ==========================================

function initializeAuth() {

    // --------------------------------------
    // Registration form
    // --------------------------------------

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            registerUser
        );

    }


    // --------------------------------------
    // Login form
    // --------------------------------------

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginUser
        );

    }


    // --------------------------------------
    // Confirm password
    // --------------------------------------

    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        );


    if (confirmPassword) {

        confirmPassword.addEventListener(
            "input",
            checkPasswordMatch
        );

    }


    // --------------------------------------
    // Password
    // --------------------------------------

    const password =
        document.getElementById(
            "password"
        );


    if (password) {

        password.addEventListener(
            "input",
            checkPasswordMatch
        );

    }


    // --------------------------------------
    // Email
    // --------------------------------------

    const email =
        document.getElementById(
            "email"
        );


    if (email) {

        email.addEventListener(
            "blur",
            checkEmailAvailability
        );

    }


    // --------------------------------------
    // Demo login button
    // --------------------------------------

    const demoLoginBtn =
        document.getElementById(
            "demoLoginBtn"
        );


    if (demoLoginBtn) {

        demoLoginBtn.addEventListener(
            "click",
            demoLogin
        );

    }

}


// ==========================================
// PAGE INITIALIZATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initializeAuth
);


// ==========================================
// GLOBAL AUTH API
// ==========================================

window.SkillMatchAuth = {

    registerUser,

    loginUser,

    logoutUser,

    isLoggedIn,

    getCurrentUser,

    requireAuthentication,

    checkEmailAvailability,

    checkPasswordMatch,

    toggleAuthPassword,

    demoLogin

};