// ==========================================
// SkillMatch - Job Model
// File: backend/models/Job.js
// ==========================================

const mongoose = require("mongoose");


// ==========================================
// JOB SCHEMA
// ==========================================

const jobSchema = new mongoose.Schema(

    {

        // --------------------------------------
        // Job Information
        // --------------------------------------

        title: {

            type: String,

            required: true,

            trim: true

        },


        company: {

            type: String,

            required: true,

            trim: true

        },


        description: {

            type: String,

            required: true,

            trim: true

        },


        // --------------------------------------
        // Location
        // --------------------------------------

        location: {

            type: String,

            required: true,

            trim: true

        },


        workType: {

            type: String,

            enum: [
                "On-site",
                "Remote",
                "Hybrid"
            ],

            default: "On-site"

        },


        jobType: {

            type: String,

            enum: [
                "Full Time",
                "Part Time",
                "Contract",
                "Internship"
            ],

            default: "Full Time"

        },


        // --------------------------------------
        // Experience
        // --------------------------------------

        experience: {

            type: String,

            required: true,

            trim: true

        },


        // --------------------------------------
        // Salary
        // --------------------------------------

        salary: {

            type: String,

            default: "Not specified",

            trim: true

        },


        // --------------------------------------
        // Required Skills
        // --------------------------------------

        requiredSkills: [

            {

                type: String,

                trim: true

            }

        ],


        // --------------------------------------
        // Preferred Skills
        // --------------------------------------

        preferredSkills: [

            {

                type: String,

                trim: true

            }

        ],


        // --------------------------------------
        // Education
        // --------------------------------------

        education: {

            type: String,

            default: "",

            trim: true

        },


        // --------------------------------------
        // Application Information
        // --------------------------------------

        applicationLink: {

            type: String,

            default: "",

            trim: true

        },


        applicationDeadline: {

            type: Date,

            default: null

        },


        // --------------------------------------
        // Job Status
        // --------------------------------------

        isActive: {

            type: Boolean,

            default: true

        },


        // --------------------------------------
        // Job Category
        // --------------------------------------

        category: {

            type: String,

            default: "Software Development",

            trim: true

        },


        // --------------------------------------
        // Job Level
        // --------------------------------------

        level: {

            type: String,

            enum: [
                "Entry Level",
                "Junior",
                "Mid Level",
                "Senior"
            ],

            default: "Entry Level"

        },


        // --------------------------------------
        // Company Information
        // --------------------------------------

        companyWebsite: {

            type: String,

            default: "",

            trim: true

        },


        // --------------------------------------
        // Number of Applicants
        // --------------------------------------

        applicants: {

            type: Number,

            min: 0,

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
// SKILL MATCHING METHOD
// ==========================================
// Compares the student's skills with the
// skills required by the job.

jobSchema.methods.calculateSkillMatch = function (
    studentSkills
) {

    if (
        !this.requiredSkills ||
        this.requiredSkills.length === 0
    ) {

        return {

            matchedSkills: [],

            missingSkills: [],

            matchPercentage: 0

        };

    }


    const studentSkillNames =
        studentSkills.map(skill =>
            skill.name.toLowerCase()
        );


    const matchedSkills =
        this.requiredSkills.filter(skill =>
            studentSkillNames.includes(
                skill.toLowerCase()
            )
        );


    const missingSkills =
        this.requiredSkills.filter(skill =>
            !studentSkillNames.includes(
                skill.toLowerCase()
            )
        );


    const matchPercentage =
        Math.round(
            (
                matchedSkills.length /
                this.requiredSkills.length
            ) * 100
        );


    return {

        matchedSkills,

        missingSkills,

        matchPercentage

    };

};


// ==========================================
// INDEXES
// ==========================================

jobSchema.index({
    title: "text",
    company: "text",
    category: "text",
    location: "text"
});

jobSchema.index({
    location: 1
});

jobSchema.index({
    category: 1
});

jobSchema.index({
    isActive: 1
});


// ==========================================
// EXPORT MODEL
// ==========================================

const Job =
    mongoose.model(
        "Job",
        jobSchema
    );


module.exports = Job;