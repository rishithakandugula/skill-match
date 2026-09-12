// ==========================================
// SkillMatch - Recommendation Routes
// File: backend/routes/recommendationRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();


// ==========================================
// DEMO DATA
// ==========================================

const courses = [

    {
        id: 1,
        title: "Advanced JavaScript",
        category: "Programming",
        level: "Advanced",
        skills: ["JavaScript", "DOM", "API"],
        duration: "18 Hours"
    },

    {
        id: 2,
        title: "React.js for Beginners",
        category: "Web Development",
        level: "Beginner",
        skills: ["React", "JavaScript", "HTML", "CSS"],
        duration: "20 Hours"
    },

    {
        id: 3,
        title: "Full Stack Web Development",
        category: "Web Development",
        level: "Advanced",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB"
        ],
        duration: "45 Hours"
    },

    {
        id: 4,
        title: "Python Programming",
        category: "Programming",
        level: "Beginner",
        skills: ["Python"],
        duration: "16 Hours"
    },

    {
        id: 5,
        title: "SQL & Database Management",
        category: "Database",
        level: "Intermediate",
        skills: ["SQL", "Database"],
        duration: "14 Hours"
    }

];


const projects = [

    {
        id: 1,
        title: "Personal Portfolio Website",
        level: "Beginner",
        skills: ["HTML", "CSS", "JavaScript"],
        duration: "1 Week"
    },

    {
        id: 2,
        title: "To-Do List Application",
        level: "Beginner",
        skills: ["HTML", "CSS", "JavaScript"],
        duration: "1 Week"
    },

    {
        id: 3,
        title: "Weather Application",
        level: "Intermediate",
        skills: ["HTML", "CSS", "JavaScript", "API"],
        duration: "1-2 Weeks"
    },

    {
        id: 4,
        title: "E-Commerce Website",
        level: "Intermediate",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Database"
        ],
        duration: "2-3 Weeks"
    },

    {
        id: 5,
        title: "Learning Management System",
        level: "Advanced",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB"
        ],
        duration: "4-6 Weeks"
    }

];


const internships = [

    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "Tech Solutions",
        location: "Hyderabad",
        type: "Hybrid",
        skills: ["HTML", "CSS", "JavaScript", "React"]
    },

    {
        id: 2,
        title: "React Developer Intern",
        company: "WebWorks",
        location: "Bangalore",
        type: "Hybrid",
        skills: ["React", "JavaScript", "HTML", "CSS"]
    },

    {
        id: 3,
        title: "Python Developer Intern",
        company: "CodeLabs",
        location: "Remote",
        type: "Remote",
        skills: ["Python", "SQL"]
    },

    {
        id: 4,
        title: "Full Stack Developer Intern",
        company: "InnovateTech",
        location: "Hyderabad",
        type: "On-site",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js"
        ]
    }

];


const jobs = [

    {
        id: 1,
        title: "Junior Frontend Developer",
        company: "DigitalWorks",
        location: "Hyderabad",
        type: "Full Time",
        skills: ["HTML", "CSS", "JavaScript"]
    },

    {
        id: 2,
        title: "React Developer",
        company: "TechWorld",
        location: "Bangalore",
        type: "Full Time",
        skills: ["React", "JavaScript", "HTML", "CSS"]
    },

    {
        id: 3,
        title: "Python Developer",
        company: "DataSoft",
        location: "Remote",
        type: "Full Time",
        skills: ["Python", "SQL"]
    },

    {
        id: 4,
        title: "Full Stack Developer",
        company: "InnovateLabs",
        location: "Hyderabad",
        type: "Full Time",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB"
        ]
    }

];


// ==========================================
// SKILL MATCH CALCULATION
// ==========================================

function calculateMatch(
    studentSkills,
    requiredSkills
) {

    if (
        !studentSkills ||
        studentSkills.length === 0
    ) {

        return 0;

    }


    if (
        !requiredSkills ||
        requiredSkills.length === 0
    ) {

        return 100;

    }


    let matchedSkills = 0;


    requiredSkills.forEach(
        requiredSkill => {

            const foundSkill =
                studentSkills.find(
                    studentSkill =>
                        studentSkill.name.toLowerCase() ===
                        requiredSkill.toLowerCase()
                );


            if (foundSkill) {

                matchedSkills++;

            }

        }
    );


    return Math.round(
        (matchedSkills /
            requiredSkills.length) *
        100
    );

}


// ==========================================
// FIND MISSING SKILLS
// ==========================================

function findMissingSkills(
    studentSkills,
    requiredSkills
) {

    if (
        !requiredSkills ||
        requiredSkills.length === 0
    ) {

        return [];

    }


    return requiredSkills.filter(
        requiredSkill => {

            return !studentSkills.some(
                studentSkill =>
                    studentSkill.name.toLowerCase() ===
                    requiredSkill.toLowerCase()
            );

        }
    );

}


// ==========================================
// GET RECOMMENDATIONS
// ==========================================
// POST /api/recommendations

router.post("/", (req, res) => {

    try {

        const {
            skills = [],
            careerGoal = ""
        } = req.body;


        const courseRecommendations =
            courses.map(course => ({

                ...course,

                matchPercentage:
                    calculateMatch(
                        skills,
                        course.skills
                    )

            }))
            .filter(
                course =>
                    course.matchPercentage > 0
            )
            .sort(
                (a, b) =>
                    b.matchPercentage -
                    a.matchPercentage
            );


        const projectRecommendations =
            projects.map(project => ({

                ...project,

                matchPercentage:
                    calculateMatch(
                        skills,
                        project.skills
                    )

            }))
            .filter(
                project =>
                    project.matchPercentage > 0
            )
            .sort(
                (a, b) =>
                    b.matchPercentage -
                    a.matchPercentage
            );


        const internshipRecommendations =
            internships.map(internship => ({

                ...internship,

                matchPercentage:
                    calculateMatch(
                        skills,
                        internship.skills
                    )

            }))
            .sort(
                (a, b) =>
                    b.matchPercentage -
                    a.matchPercentage
            );


        const jobRecommendations =
            jobs.map(job => ({

                ...job,

                matchPercentage:
                    calculateMatch(
                        skills,
                        job.skills
                    )

            }))
            .sort(
                (a, b) =>
                    b.matchPercentage -
                    a.matchPercentage
            );


        res.json({

            success: true,

            careerGoal:

                careerGoal ||
                "Not specified",

            recommendations: {

                courses:
                    courseRecommendations,

                projects:
                    projectRecommendations,

                internships:
                    internshipRecommendations,

                jobs:
                    jobRecommendations

            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Unable to generate recommendations"

        });

    }

});


// ==========================================
// COURSE RECOMMENDATIONS
// ==========================================
// POST /api/recommendations/courses

router.post("/courses", (req, res) => {

    try {

        const {
            skills = []
        } = req.body;


        const recommendations =
            courses.map(course => ({

                ...course,

                matchPercentage:
                    calculateMatch(
                        skills,
                        course.skills
                    )

            }))
            .sort(
                (a, b) =>
                    b.matchPercentage -
                    a.matchPercentage
            );


        res.json({

            success: true,

            count:
                recommendations.length,

            courses:
                recommendations

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to generate course recommendations"

        });

    }

});


// ==========================================
// PROJECT RECOMMENDATIONS
// ==========================================
// POST /api/recommendations/projects

router.post("/projects", (req, res) => {

    try {

        const {
            skills = []
        } = req.body;


        const recommendations =
            projects.map(project => ({

                ...project,

                matchPercentage:
                    calculateMatch(
                        skills,
                        project.skills
                    )

            }))
            .sort(
                (a, b) =>
                    b.matchPercentage -
                    a.matchPercentage
            );


        res.json({

            success: true,

            count:
                recommendations.length,

            projects:
                recommendations

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to generate project recommendations"

        });

    }

});


// ==========================================
// INTERNSHIP RECOMMENDATIONS
// ==========================================
// POST /api/recommendations/internships

router.post("/internships", (req, res) => {

    try {

        const {
            skills = []
        } = req.body;


        const recommendations =
            internships.map(internship => ({

                ...internship,

                matchPercentage:
                    calculateMatch(
                        skills,
                        internship.skills
                    )

            }))
            .sort(
                (a, b) =>
                    b.matchPercentage -
                    a.matchPercentage
            );


        res.json({

            success: true,

            count:
                recommendations.length,

            internships:
                recommendations

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to generate internship recommendations"

        });

    }

});


// ==========================================
// JOB RECOMMENDATIONS
// ==========================================
// POST /api/recommendations/jobs

router.post("/jobs", (req, res) => {

    try {

        const {
            skills = []
        } = req.body;


        const recommendations =
            jobs.map(job => ({

                ...job,

                matchPercentage:
                    calculateMatch(
                        skills,
                        job.skills
                    )

            }))
            .sort(
                (a, b) =>
                    b.matchPercentage -
                    a.matchPercentage
            );


        res.json({

            success: true,

            count:
                recommendations.length,

            jobs:
                recommendations

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to generate job recommendations"

        });

    }

});


// ==========================================
// SKILL GAP ANALYSIS
// ==========================================
// POST /api/recommendations/skill-gap

router.post("/skill-gap", (req, res) => {

    try {

        const {
            skills = [],
            targetSkills = []
        } = req.body;


        const missingSkills =
            findMissingSkills(
                skills,
                targetSkills
            );


        const matchPercentage =
            calculateMatch(
                skills,
                targetSkills
            );


        res.json({

            success: true,

            matchPercentage:

                matchPercentage,

            totalRequiredSkills:
                targetSkills.length,

            missingSkillCount:
                missingSkills.length,

            missingSkills:
                missingSkills,

            message:

                missingSkills.length > 0

                    ? "Improve the missing skills to reach your career goal."

                    : "You have all the required skills."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to analyze skill gaps"

        });

    }

});


// ==========================================
// CAREER MATCH
// ==========================================
// POST /api/recommendations/career-match

router.post("/career-match", (req, res) => {

    try {

        const {
            skills = [],
            targetSkills = []
        } = req.body;


        const matchPercentage =
            calculateMatch(
                skills,
                targetSkills
            );


        let readiness;


        if (matchPercentage >= 85) {

            readiness =
                "Excellent";

        } else if (
            matchPercentage >= 70
        ) {

            readiness =
                "Good";

        } else if (
            matchPercentage >= 50
        ) {

            readiness =
                "Developing";

        } else {

            readiness =
                "Needs Improvement";

        }


        res.json({

            success: true,

            careerMatch: {

                percentage:
                    matchPercentage,

                readiness:
                    readiness,

                requiredSkills:
                    targetSkills.length,

                matchedSkills:
                    targetSkills.length -
                    findMissingSkills(
                        skills,
                        targetSkills
                    ).length

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to calculate career match"

        });

    }

});


// ==========================================
// GET AVAILABLE CAREER ROLES
// ==========================================
// GET /api/recommendations/careers

router.get("/careers", (req, res) => {

    const careers = [

        {
            title:
                "Frontend Developer",

            skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "React"
            ]
        },

        {
            title:
                "Backend Developer",

            skills: [
                "JavaScript",
                "Node.js",
                "Database",
                "API"
            ]
        },

        {
            title:
                "Full Stack Developer",

            skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Node.js",
                "MongoDB"
            ]
        },

        {
            title:
                "Python Developer",

            skills: [
                "Python",
                "SQL",
                "Database"
            ]
        },

        {
            title:
                "Data Analyst",

            skills: [
                "Python",
                "SQL",
                "Excel",
                "Statistics"
            ]
        }

    ];


    res.json({

        success: true,

        count:
            careers.length,

        careers:
            careers

    });

});


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;