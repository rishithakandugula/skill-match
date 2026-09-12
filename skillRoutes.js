// ==========================================
// SkillMatch - Skill Routes
// File: backend/routes/skillRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();


// ==========================================
// Temporary Skill Storage
// ==========================================
// This is useful while developing/testing.
// Later, these skills can be stored in MongoDB
// using the Skill model.

let skills = [
    {
        id: 1,
        userId: 1,
        name: "HTML",
        category: "Web Development",
        level: "Advanced",
        score: 90
    },
    {
        id: 2,
        userId: 1,
        name: "CSS",
        category: "Web Development",
        level: "Advanced",
        score: 85
    },
    {
        id: 3,
        userId: 1,
        name: "JavaScript",
        category: "Programming",
        level: "Intermediate",
        score: 65
    }
];


// ==========================================
// GET ALL SKILLS
// ==========================================
// URL:
// GET /api/skills

router.get("/", (req, res) => {

    try {

        res.json({
            success: true,
            count: skills.length,
            skills: skills
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Unable to fetch skills"
        });

    }

});


// ==========================================
// GET SKILLS FOR A USER
// ==========================================
// URL:
// GET /api/skills/user/:userId

router.get("/user/:userId", (req, res) => {

    try {

        const userId =
            Number(req.params.userId);


        const userSkills =
            skills.filter(
                skill => skill.userId === userId
            );


        res.json({

            success: true,

            count: userSkills.length,

            skills: userSkills

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Unable to fetch user skills"

        });

    }

});


// ==========================================
// GET SINGLE SKILL
// ==========================================
// URL:
// GET /api/skills/:id

router.get("/:id", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const skill =
            skills.find(
                item => item.id === id
            );


        if (!skill) {

            return res.status(404).json({

                success: false,

                message: "Skill not found"

            });

        }


        res.json({

            success: true,

            skill: skill

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Unable to fetch skill"

        });

    }

});


// ==========================================
// ADD NEW SKILL
// ==========================================
// URL:
// POST /api/skills

router.post("/", (req, res) => {

    try {

        const {
            userId,
            name,
            category,
            level,
            score
        } = req.body;


        // Validate required fields

        if (
            !name ||
            !category ||
            !level
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, category and level are required"

            });

        }


        // Check whether skill already exists

        const existingSkill =
            skills.find(
                skill =>
                    skill.userId === Number(userId || 1) &&
                    skill.name.toLowerCase() ===
                    name.toLowerCase()
            );


        if (existingSkill) {

            return res.status(409).json({

                success: false,

                message:
                    "This skill already exists"

            });

        }


        // Create new skill

        const newSkill = {

            id:
                skills.length > 0
                    ? Math.max(
                        ...skills.map(skill => skill.id)
                    ) + 1
                    : 1,

            userId:
                Number(userId || 1),

            name:
                name.trim(),

            category:
                category.trim(),

            level:
                level,

            score:
                Number(score || 0)

        };


        skills.push(newSkill);


        res.status(201).json({

            success: true,

            message:
                "Skill added successfully",

            skill:
                newSkill

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to add skill"

        });

    }

});


// ==========================================
// UPDATE SKILL
// ==========================================
// URL:
// PUT /api/skills/:id

router.put("/:id", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const skill =
            skills.find(
                item => item.id === id
            );


        if (!skill) {

            return res.status(404).json({

                success: false,

                message:
                    "Skill not found"

            });

        }


        const {
            name,
            category,
            level,
            score
        } = req.body;


        // Update only supplied values

        if (name) {

            skill.name =
                name.trim();

        }


        if (category) {

            skill.category =
                category.trim();

        }


        if (level) {

            skill.level =
                level;

        }


        if (
            score !== undefined
        ) {

            skill.score =
                Number(score);

        }


        res.json({

            success: true,

            message:
                "Skill updated successfully",

            skill:
                skill

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to update skill"

        });

    }

});


// ==========================================
// UPDATE SKILL SCORE
// ==========================================
// URL:
// PATCH /api/skills/:id/score

router.patch("/:id/score", (req, res) => {

    try {

        const id =
            Number(req.params.id);

        const {
            score
        } = req.body;


        const skill =
            skills.find(
                item => item.id === id
            );


        if (!skill) {

            return res.status(404).json({

                success: false,

                message:
                    "Skill not found"

            });

        }


        if (
            score === undefined ||
            isNaN(score)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Valid score is required"

            });

        }


        const newScore =
            Number(score);


        if (
            newScore < 0 ||
            newScore > 100
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Score must be between 0 and 100"

            });

        }


        skill.score =
            newScore;


        // Automatically determine level

        if (newScore >= 85) {

            skill.level =
                "Advanced";

        } else if (newScore >= 60) {

            skill.level =
                "Intermediate";

        } else {

            skill.level =
                "Beginner";

        }


        res.json({

            success: true,

            message:
                "Skill score updated successfully",

            skill:
                skill

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to update skill score"

        });

    }

});


// ==========================================
// DELETE SKILL
// ==========================================
// URL:
// DELETE /api/skills/:id

router.delete("/:id", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const skillIndex =
            skills.findIndex(
                skill => skill.id === id
            );


        if (
            skillIndex === -1
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Skill not found"

            });

        }


        const deletedSkill =
            skills.splice(
                skillIndex,
                1
            )[0];


        res.json({

            success: true,

            message:
                "Skill deleted successfully",

            skill:
                deletedSkill

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to delete skill"

        });

    }

});


// ==========================================
// SKILL ASSESSMENT
// ==========================================
// URL:
// POST /api/skills/:id/assessment

router.post("/:id/assessment", (req, res) => {

    try {

        const id =
            Number(req.params.id);


        const {
            score
        } = req.body;


        const skill =
            skills.find(
                item => item.id === id
            );


        if (!skill) {

            return res.status(404).json({

                success: false,

                message:
                    "Skill not found"

            });

        }


        if (
            score === undefined ||
            isNaN(score)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Assessment score is required"

            });

        }


        const assessmentScore =
            Number(score);


        if (
            assessmentScore < 0 ||
            assessmentScore > 100
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Assessment score must be between 0 and 100"

            });

        }


        // Update skill score

        skill.score =
            assessmentScore;


        // Determine skill level

        if (
            assessmentScore >= 85
        ) {

            skill.level =
                "Advanced";

        } else if (
            assessmentScore >= 60
        ) {

            skill.level =
                "Intermediate";

        } else {

            skill.level =
                "Beginner";

        }


        res.json({

            success: true,

            message:
                "Assessment completed successfully",

            assessment: {

                score:
                    assessmentScore,

                level:
                    skill.level

            },

            skill:
                skill

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to process assessment"

        });

    }

});


// ==========================================
// SKILL SUMMARY
// ==========================================
// URL:
// GET /api/skills/summary/:userId

router.get("/summary/:userId", (req, res) => {

    try {

        const userId =
            Number(req.params.userId);


        const userSkills =
            skills.filter(
                skill => skill.userId === userId
            );


        if (
            userSkills.length === 0
        ) {

            return res.json({

                success: true,

                summary: {

                    totalSkills: 0,

                    advancedSkills: 0,

                    intermediateSkills: 0,

                    beginnerSkills: 0,

                    averageScore: 0

                }

            });

        }


        const advancedSkills =
            userSkills.filter(
                skill =>
                    skill.level === "Advanced"
            ).length;


        const intermediateSkills =
            userSkills.filter(
                skill =>
                    skill.level === "Intermediate"
            ).length;


        const beginnerSkills =
            userSkills.filter(
                skill =>
                    skill.level === "Beginner"
            ).length;


        const totalScore =
            userSkills.reduce(
                (total, skill) =>
                    total + skill.score,
                0
            );


        const averageScore =
            Math.round(
                totalScore /
                userSkills.length
            );


        res.json({

            success: true,

            summary: {

                totalSkills:
                    userSkills.length,

                advancedSkills:
                    advancedSkills,

                intermediateSkills:
                    intermediateSkills,

                beginnerSkills:
                    beginnerSkills,

                averageScore:
                    averageScore

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Unable to generate skill summary"

        });

    }

});


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;