// ==========================================
// SkillMatch - User Model
// File: backend/models/User.js
// ==========================================

const mongoose = require("mongoose");


// ==========================================
// USER SCHEMA
// ==========================================

const userSchema = new mongoose.Schema(

    {

        // --------------------------------------
        // Personal Information
        // --------------------------------------

        fullName: {

            type: String,

            required: true,

            trim: true

        },


        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },


        phone: {

            type: String,

            trim: true,

            default: ""

        },


        location: {

            type: String,

            trim: true,

            default: ""

        },


        about: {

            type: String,

            trim: true,

            default: ""

        },


        // --------------------------------------
        // Education Information
        // --------------------------------------

        college: {

            type: String,

            required: true,

            trim: true

        },


        degree: {

            type: String,

            trim: true,

            default: ""

        },


        branch: {

            type: String,

            required: true,

            trim: true

        },


        studyYear: {

            type: String,

            required: true,

            trim: true

        },


        graduationYear: {

            type: String,

            trim: true,

            default: ""

        },


        // --------------------------------------
        // Career Information
        // --------------------------------------

        careerGoal: {

            type: String,

            required: true,

            trim: true

        },


        preferredRole: {

            type: String,

            trim: true,

            default: ""

        },


        preferredLocation: {

            type: String,

            trim: true,

            default: ""

        },


        careerLevel: {

            type: String,

            trim: true,

            default: "Beginner"

        },


        workType: {

            type: String,

            trim: true,

            default: "Any"

        },


        // --------------------------------------
        // Professional Links
        // --------------------------------------

        github: {

            type: String,

            trim: true,

            default: ""

        },


        linkedin: {

            type: String,

            trim: true,

            default: ""

        },


        portfolio: {

            type: String,

            trim: true,

            default: ""

        },


        resume: {

            type: String,

            trim: true,

            default: ""

        },


        // --------------------------------------
        // Account Information
        // --------------------------------------

        password: {

            type: String,

            required: true,

            minlength: 6

        },


        isActive: {

            type: Boolean,

            default: true

        },


        // --------------------------------------
        // User Role
        // --------------------------------------

        role: {

            type: String,

            enum: [
                "student",
                "admin"
            ],

            default: "student"

        },


        // --------------------------------------
        // Career Readiness
        // --------------------------------------

        careerReadiness: {

            type: Number,

            min: 0,

            max: 100,

            default: 0

        }

    },


    // ==========================================
    // TIMESTAMPS
    // ==========================================

    {

        timestamps: true

    }

);


// ==========================================
// EMAIL INDEX
// ==========================================

userSchema.index(
    {
        email: 1
    },
    {
        unique: true
    }
);


// ==========================================
// REMOVE PASSWORD FROM JSON RESPONSE
// ==========================================
// This prevents the password from appearing
// when a user object is converted to JSON.

userSchema.methods.toSafeObject = function () {

    const user =
        this.toObject();


    delete user.password;


    return user;

};


// ==========================================
// EXPORT MODEL
// ==========================================

const User =
    mongoose.model(
        "User",
        userSchema
    );


module.exports = User;