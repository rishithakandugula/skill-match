// ==========================================
// SkillMatch - Job Routes
// File: backend/routes/jobRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();


// ==========================================
// DEMO JOB DATA
// ==========================================

let jobs = [

    {
        id: 1,
        title: "Junior Frontend Developer",
        company: "DigitalWorks",
        location: "Hyderabad",
        type: "Full Time",
        experience: "0-2 Years",
        salary: "₹4 - ₹6 LPA",
        description:
            "Build responsive and user-friendly web applications.",
        skills: [
            "HTML",
            "CSS",
            "JavaScript"
        ]
    },

    {
        id: 2,
        title: "React Developer",
        company: "TechWorld",
        location: "Bangalore",
        type: "Full Time",
        experience: "1-3 Years",
        salary: "₹5 - ₹8 LPA",
        description:
            "Develop modern web applications using React.",
        skills: [
            "React",
            "JavaScript",
            "HTML",
            "CSS"
        ]
    },

    {
        id: 3,
        title: "Python Developer",
        company: "DataSoft",
        location: "Remote",
        type: "Full Time",
        experience: "0-2 Years",
        salary: "₹4 - ₹7 LPA",
        description:
            "Develop Python applications and work with databases.",
        skills: [
            "Python",
            "SQL",
            "Database"
        ]
    },

    {
        id: 4,
        title: "Full Stack Developer",
        company: "InnovateLabs",
        location: "Hyderabad",
        type: "Full Time",
        experience: "1-3 Years",
        salary: "₹6 - ₹10 LPA",
        description:
            "Work on both frontend and backend web development.",
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
        id: 5,
        title: "Junior Web Developer",
        company: "WebSolutions",
        location: "Chennai",
        type: "Full Time",
        experience: "0-1 Years",
        salary: "₹3 - ₹5 LPA",
        description:
            "Create and maintain responsive websites.",
        skills: [
            "HTML",
            "CSS",
            "JavaScript"
        ]
    },

    {
        id: 6,
        title: "Software Developer",
        company: "CodeTech",
        location: "Remote",
        type: "Full Time",
        experience: "1-3 Years",
        salary: "₹5 - ₹9 LPA",
        description:
            "Develop software applications and solve technical problems.",
        skills: [
            "JavaScript",
            "Python",
            "SQL"
        ]
    }

];


// ==========================================
// GET ALL JOBS
// ==========================================
// GET /api/jobs

router.get("/", (req, res) => {

    try {

        res.json({

            success: true,

            count: jobs.length,

            jobs: jobs

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to fetch jobs"

        });

    }

});


// ==========================================
// SEARCH AND FILTER JOBS
// ==========================================
// GET /api/jobs/search?keyword=developer
// GET /api/jobs/search?location=Hyderabad
// GET /api/jobs/search?type=Full%20Time

router.get("/search", (req, res) => {

    try {

        const {
            keyword,
            location,
            type,
            experience
        } = req.query;


        let filteredJobs = [...jobs];


        // Keyword filter

        if (keyword) {

            const searchText =
                keyword.toLowerCase();


            filteredJobs =
                filteredJobs.filter(job =>

                    job.title
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    job.company
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    job.skills.some(skill =>
                        skill
                            .toLowerCase()
                            .includes(searchText)
                    )

                );

        }


        // Location filter

        if (location) {

            filteredJobs =
                filteredJobs.filter(job =>

                    job.location
                        .toLowerCase()
                        .includes(
                            location.toLowerCase()
                        )

                );

        }


        // Job type filter

        if (type) {

            filteredJobs =
                filteredJobs.filter(job =>

                    job.type
                        .toLowerCase() ===
                    type.toLowerCase()

                );

        }


        // Experience filter

        if (experience) {

            filteredJobs =
                filteredJobs.filter(job =>

                    job.experience
                        .toLowerCase()
                        .includes(
                            experience.toLowerCase()
                        )

                );

        }


        res.json({

            success: true,

            count:
                filteredJobs.length,

            jobs:
                filteredJobs

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to search jobs"

        });

    }

});


// ==========================================
// GET JOB BY ID
// ==========================================
// GET /api/jobs/:id

router.get("/:id", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const job =
            jobs.find(
                item => item.id === id
            );


        if (!job) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found"

            });

        }


        res.json({

            success: true,

            job:
                job

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to fetch job"

        });

    }

});


// ==========================================
// ADD NEW JOB
// ==========================================
// POST /api/jobs

router.post("/", (req, res) => {

    try {

        const {
            title,
            company,
            location,
            type,
            experience,
            salary,
            description,
            skills
        } = req.body;


        // Validate required fields

        if (
            !title ||
            !company ||
            !location ||
            !skills
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Title, company, location and skills are required"

            });

        }


        // Create job

        const newJob = {

            id:
                jobs.length > 0
                    ? Math.max(
                        ...jobs.map(job => job.id)
                    ) + 1
                    : 1,

            title:
                title.trim(),

            company:
                company.trim(),

            location:
                location.trim(),

            type:
                type || "Full Time",

            experience:
                experience || "Not specified",

            salary:
                salary || "Not specified",

            description:
                description || "",

            skills:
                Array.isArray(skills)
                    ? skills
                    : []

        };


        jobs.push(newJob);


        res.status(201).json({

            success: true,

            message:
                "Job added successfully",

            job:
                newJob

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to add job"

        });

    }

});


// ==========================================
// UPDATE JOB
// ==========================================
// PUT /api/jobs/:id

router.put("/:id", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const job =
            jobs.find(
                item => item.id === id
            );


        if (!job) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found"

            });

        }


        const {
            title,
            company,
            location,
            type,
            experience,
            salary,
            description,
            skills
        } = req.body;


        if (title) {

            job.title =
                title.trim();

        }


        if (company) {

            job.company =
                company.trim();

        }


        if (location) {

            job.location =
                location.trim();

        }


        if (type) {

            job.type =
                type;

        }


        if (experience) {

            job.experience =
                experience;

        }


        if (salary) {

            job.salary =
                salary;

        }


        if (description) {

            job.description =
                description;

        }


        if (Array.isArray(skills)) {

            job.skills =
                skills;

        }


        res.json({

            success: true,

            message:
                "Job updated successfully",

            job:
                job

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to update job"

        });

    }

});


// ==========================================
// DELETE JOB
// ==========================================
// DELETE /api/jobs/:id

router.delete("/:id", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const jobIndex =
            jobs.findIndex(
                job => job.id === id
            );


        if (jobIndex === -1) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found"

            });

        }


        const deletedJob =
            jobs.splice(
                jobIndex,
                1
            )[0];


        res.json({

            success: true,

            message:
                "Job deleted successfully",

            job:
                deletedJob

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to delete job"

        });

    }

});


// ==========================================
// MATCH JOB WITH STUDENT SKILLS
// ==========================================
// POST /api/jobs/:id/match

router.post("/:id/match", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const {
            skills = []
        } = req.body;


        const job =
            jobs.find(
                item => item.id === id
            );


        if (!job) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found"

            });

        }


        if (!Array.isArray(skills)) {

            return res.status(400).json({

                success: false,

                message:
                    "Skills must be provided as an array"

            });

        }


        // Find matching skills

        const matchedSkills =
            job.skills.filter(
                requiredSkill =>

                    skills.some(
                        studentSkill => {

                            const studentSkillName =
                                typeof studentSkill === "string"
                                    ? studentSkill
                                    : studentSkill.name;

                            return (
                                studentSkillName &&
                                studentSkillName
                                    .toLowerCase() ===
                                requiredSkill
                                    .toLowerCase()
                            );

                        }
                    )

            );


        // Find missing skills

        const missingSkills =
            job.skills.filter(
                requiredSkill =>

                    !matchedSkills.some(
                        matchedSkill =>

                            matchedSkill
                                .toLowerCase() ===
                            requiredSkill
                                .toLowerCase()

                    )

            );


        // Calculate percentage

        const matchPercentage =
            job.skills.length === 0

                ? 0

                : Math.round(
                    (
                        matchedSkills.length /
                        job.skills.length
                    ) * 100
                );


        res.json({

            success: true,

            job: {

                id:
                    job.id,

                title:
                    job.title,

                company:
                    job.company

            },

            matchPercentage:
                matchPercentage,

            matchedSkills:
                matchedSkills,

            missingSkills:
                missingSkills,

            totalRequiredSkills:
                job.skills.length

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to calculate job match"

        });

    }

});


// ==========================================
// GET JOB STATISTICS
// ==========================================
// GET /api/jobs/statistics

router.get("/statistics/summary", (req, res) => {

    try {

        const locations = [
            ...new Set(
                jobs.map(job => job.location)
            )
        ];


        const companies = [
            ...new Set(
                jobs.map(job => job.company)
            )
        ];


        const jobTypes = [
            ...new Set(
                jobs.map(job => job.type)
            )
        ];


        res.json({

            success: true,

            statistics: {

                totalJobs:
                    jobs.length,

                totalCompanies:
                    companies.length,

                totalLocations:
                    locations.length,

                locations:
                    locations,

                jobTypes:
                    jobTypes

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to generate job statistics"

        });

    }

});


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;