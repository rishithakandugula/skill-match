// ==========================================
// SkillMatch - Authentication Routes
// File: backend/routes/authRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();


// ==========================================
// TEMPORARY USER STORAGE
// ==========================================
// This is only for development/testing.
// Users will be stored in memory until
// User.js and MongoDB are connected.

let users = [
    {
        id: 1,
        fullName: "Alex Johnson",
        email: "alex@example.com",
        college: "SkillMatch University",
        branch: "Computer Science",
        studyYear: "3rd Year",
        careerGoal: "Frontend Developer",
        password: "123456"
    }
];


// ==========================================
// REGISTER USER
// ==========================================
// POST /api/auth/register

router.post("/register", (req, res) => {

    try {

        const {
            fullName,
            email,
            college,
            branch,
            studyYear,
            careerGoal,
            password,
            confirmPassword
        } = req.body;


        // ------------------------------
        // Validate required fields
        // ------------------------------

        if (
            !fullName ||
            !email ||
            !college ||
            !branch ||
            !studyYear ||
            !careerGoal ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill in all required fields."

            });

        }


        // ------------------------------
        // Validate password confirmation
        // ------------------------------

        if (
            confirmPassword &&
            password !== confirmPassword
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Passwords do not match."

            });

        }


        // ------------------------------
        // Validate password length
        // ------------------------------

        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must contain at least 6 characters."

            });

        }


        // ------------------------------
        // Check existing email
        // ------------------------------

        const existingUser =
            users.find(
                user =>
                    user.email.toLowerCase() ===
                    email.toLowerCase()
            );


        if (existingUser) {

            return res.status(409).json({

                success: false,

                message:
                    "An account with this email already exists."

            });

        }


        // ------------------------------
        // Create new user
        // ------------------------------

        const newUser = {

            id:
                users.length > 0
                    ? Math.max(
                        ...users.map(
                            user => user.id
                        )
                    ) + 1
                    : 1,

            fullName:
                fullName.trim(),

            email:
                email.trim().toLowerCase(),

            college:
                college.trim(),

            branch:
                branch.trim(),

            studyYear:
                studyYear,

            careerGoal:
                careerGoal.trim(),

            password:
                password

        };


        // Add user

        users.push(newUser);


        // ------------------------------
        // Send response
        // ------------------------------

        res.status(201).json({

            success: true,

            message:
                "Account created successfully.",

            user: {

                id:
                    newUser.id,

                fullName:
                    newUser.fullName,

                email:
                    newUser.email,

                college:
                    newUser.college,

                branch:
                    newUser.branch,

                studyYear:
                    newUser.studyYear,

                careerGoal:
                    newUser.careerGoal

            }

        });

    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to create account."

        });

    }

});


// ==========================================
// LOGIN USER
// ==========================================
// POST /api/auth/login

router.post("/login", (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // ------------------------------
        // Validate fields
        // ------------------------------

        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required."

            });

        }


        // ------------------------------
        // Find user
        // ------------------------------

        const user =
            users.find(
                item =>
                    item.email.toLowerCase() ===
                    email.toLowerCase()
            );


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }


        // ------------------------------
        // Check password
        // ------------------------------

        if (
            user.password !== password
        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }


        // ------------------------------
        // Login successful
        // ------------------------------

        res.json({

            success: true,

            message:
                "Login successful.",

            user: {

                id:
                    user.id,

                fullName:
                    user.fullName,

                email:
                    user.email,

                college:
                    user.college,

                branch:
                    user.branch,

                studyYear:
                    user.studyYear,

                careerGoal:
                    user.careerGoal

            }

        });

    } catch (error) {

        console.error(
            "Login Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to login."

        });

    }

});


// ==========================================
// GET USER PROFILE
// ==========================================
// GET /api/auth/profile/:id

router.get("/profile/:id", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const user =
            users.find(
                item => item.id === id
            );


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });

        }


        res.json({

            success: true,

            user: {

                id:
                    user.id,

                fullName:
                    user.fullName,

                email:
                    user.email,

                college:
                    user.college,

                branch:
                    user.branch,

                studyYear:
                    user.studyYear,

                careerGoal:
                    user.careerGoal

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to fetch profile."

        });

    }

});


// ==========================================
// UPDATE USER PROFILE
// ==========================================
// PUT /api/auth/profile/:id

router.put("/profile/:id", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const user =
            users.find(
                item => item.id === id
            );


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });

        }


        const {
            fullName,
            email,
            college,
            branch,
            studyYear,
            careerGoal
        } = req.body;


        // ------------------------------
        // Update available fields
        // ------------------------------

        if (fullName) {

            user.fullName =
                fullName.trim();

        }


        if (email) {

            user.email =
                email.trim().toLowerCase();

        }


        if (college) {

            user.college =
                college.trim();

        }


        if (branch) {

            user.branch =
                branch.trim();

        }


        if (studyYear) {

            user.studyYear =
                studyYear;

        }


        if (careerGoal) {

            user.careerGoal =
                careerGoal.trim();

        }


        res.json({

            success: true,

            message:
                "Profile updated successfully.",

            user: {

                id:
                    user.id,

                fullName:
                    user.fullName,

                email:
                    user.email,

                college:
                    user.college,

                branch:
                    user.branch,

                studyYear:
                    user.studyYear,

                careerGoal:
                    user.careerGoal

            }

        });

    } catch (error) {

        console.error(
            "Profile Update Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to update profile."

        });

    }

});


// ==========================================
// CHANGE PASSWORD
// ==========================================
// PUT /api/auth/password/:id

router.put("/password/:id", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const {
            currentPassword,
            newPassword,
            confirmPassword
        } = req.body;


        const user =
            users.find(
                item => item.id === id
            );


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });

        }


        // ------------------------------
        // Validate fields
        // ------------------------------

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All password fields are required."

            });

        }


        // ------------------------------
        // Check current password
        // ------------------------------

        if (
            user.password !==
            currentPassword
        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Current password is incorrect."

            });

        }


        // ------------------------------
        // Check new passwords
        // ------------------------------

        if (
            newPassword !==
            confirmPassword
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "New passwords do not match."

            });

        }


        // ------------------------------
        // Validate password length
        // ------------------------------

        if (
            newPassword.length < 6
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "New password must contain at least 6 characters."

            });

        }


        // Update password

        user.password =
            newPassword;


        res.json({

            success: true,

            message:
                "Password changed successfully."

        });

    } catch (error) {

        console.error(
            "Password Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to change password."

        });

    }

});


// ==========================================
// CHECK EMAIL
// ==========================================
// GET /api/auth/check-email?email=test@example.com

router.get("/check-email", (req, res) => {

    try {

        const {
            email
        } = req.query;


        if (!email) {

            return res.status(400).json({

                success: false,

                message:
                    "Email is required."

            });

        }


        const exists =
            users.some(
                user =>
                    user.email.toLowerCase() ===
                    email.toLowerCase()
            );


        res.json({

            success: true,

            exists:
                exists,

            message:

                exists
                    ? "Email is already registered."
                    : "Email is available."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to check email."

        });

    }

});


// ==========================================
// LOGOUT
// ==========================================
// POST /api/auth/logout
//
// With a real JWT/session system, the token
// would be invalidated here.

router.post("/logout", (req, res) => {

    res.json({

        success: true,

        message:
            "Logout successful."

    });

});


// ==========================================
// GET AUTHENTICATION STATUS
// ==========================================
// GET /api/auth/status

router.get("/status", (req, res) => {

    res.json({

        success: true,

        authenticated: false,

        message:
            "Authentication status checked."

    });

});


// ==========================================
// DELETE USER ACCOUNT
// ==========================================
// DELETE /api/auth/:id

router.delete("/:id", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const userIndex =
            users.findIndex(
                user => user.id === id
            );


        if (
            userIndex === -1
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });

        }


        const deletedUser =
            users.splice(
                userIndex,
                1
            )[0];


        res.json({

            success: true,

            message:
                "Account deleted successfully.",

            userId:
                deletedUser.id

        });

    } catch (error) {

        console.error(
            "Delete Account Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to delete account."

        });

    }

});


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;