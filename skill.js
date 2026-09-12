// ==========================================
// SkillMatch - Skill Model
// File: backend/models/Skill.js
// ==========================================

const mongoose = require("mongoose");


// ==========================================
// SKILL SCHEMA
// ==========================================

const skillSchema = new mongoose.Schema(

    {

        // --------------------------------------
        // User who owns this skill
        // --------------------------------------

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // --------------------------------------
        // Skill Information
        // --------------------------------------

        name: {

            type: String,

            required: true,

            trim: true

        },


        category: {

            type: String,

            required: true,

            trim: true

        },


        // --------------------------------------
        // Skill Level
        // --------------------------------------

        level: {

            type: String,

            enum: [
                "Beginner",
                "Intermediate",
                "Advanced",
                "Expert"
            ],

            default: "Beginner"

        },


        // --------------------------------------
        // Skill Score
        // --------------------------------------

        score: {

            type: Number,

            min: 0,

            max: 100,

            default: 0

        },


        // --------------------------------------
        // Target Score
        // --------------------------------------
        // The level the student wants to reach.

        targetScore: {

            type: Number,

            min: 0,

            max: 100,

            default: 80

        },


        // --------------------------------------
        // Assessment Information
        // --------------------------------------

        assessmentScore: {

            type: Number,

            min: 0,

            max: 100,

            default: 0

        },


        assessmentCompleted: {

            type: Boolean,

            default: false

        },


        assessmentAttempts: {

            type: Number,

            min: 0,

            default: 0

        },


        // --------------------------------------
        // Learning Progress
        // --------------------------------------

        learningProgress: {

            type: Number,

            min: 0,

            max: 100,

            default: 0

        },


        // --------------------------------------
        // Skill Status
        // --------------------------------------

        status: {

            type: String,

            enum: [
                "Need Improvement",
                "Improving",
                "Good",
                "Excellent"
            ],

            default: "Need Improvement"

        },


        // --------------------------------------
        // Notes
        // --------------------------------------

        notes: {

            type: String,

            trim: true,

            default: ""

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
// AUTOMATIC SKILL LEVEL
// ==========================================

skillSchema.methods.updateLevel = function () {

    if (this.score >= 90) {

        this.level = "Expert";

    }

    else if (this.score >= 75) {

        this.level = "Advanced";

    }

    else if (this.score >= 50) {

        this.level = "Intermediate";

    }

    else {

        this.level = "Beginner";

    }

};


// ==========================================
// AUTOMATIC SKILL STATUS
// ==========================================

skillSchema.methods.updateStatus = function () {

    if (this.score >= 90) {

        this.status = "Excellent";

    }

    else if (this.score >= 75) {

        this.status = "Good";

    }

    else if (this.score >= 50) {

        this.status = "Improving";

    }

    else {

        this.status = "Need Improvement";

    }

};


// ==========================================
// PRE-SAVE FUNCTION
// ==========================================

skillSchema.pre("save", function (next) {

    this.updateLevel();

    this.updateStatus();

    next();

});


// ==========================================
// INDEX
// ==========================================
// Prevents the same user from adding the
// same skill multiple times.

skillSchema.index(
    {
        userId: 1,
        name: 1
    },
    {
        unique: true
    }
);


// ==========================================
// EXPORT MODEL
// ==========================================

const Skill =
    mongoose.model(
        "Skill",
        skillSchema
    );


module.exports = Skill;