// =====================================================
// SkillMatch - Recommendation System
// =====================================================


// =====================================================
// Sample Student Skill Data
// =====================================================

const studentSkills = [
    {
        name: "HTML",
        level: 90,
        category: "Web Development"
    },

    {
        name: "CSS",
        level: 80,
        category: "Web Development"
    },

    {
        name: "JavaScript",
        level: 65,
        category: "Programming"
    },

    {
        name: "Python",
        level: 60,
        category: "Programming"
    },

    {
        name: "SQL",
        level: 70,
        category: "Database"
    },

    {
        name: "React",
        level: 40,
        category: "Web Development"
    }
];


// =====================================================
// Course Database
// =====================================================

const courses = [

    {
        title: "Advanced JavaScript",
        category: "Web Development",
        requiredSkills: ["JavaScript"],
        difficulty: "Intermediate",
        duration: "6 Weeks",
        description:
            "Improve your JavaScript skills with modern concepts, DOM manipulation and asynchronous programming."
    },

    {
        title: "React.js for Beginners",
        category: "Web Development",
        requiredSkills: ["JavaScript", "React"],
        difficulty: "Beginner",
        duration: "5 Weeks",
        description:
            "Learn React.js and build modern interactive frontend applications."
    },

    {
        title: "Full Stack Web Development",
        category: "Web Development",
        requiredSkills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "SQL"
        ],
        difficulty: "Advanced",
        duration: "12 Weeks",
        description:
            "Learn frontend and backend technologies to become a full stack developer."
    },

    {
        title: "Python Programming",
        category: "Programming",
        requiredSkills: ["Python"],
        difficulty: "Beginner",
        duration: "8 Weeks",
        description:
            "Learn Python programming fundamentals and problem-solving techniques."
    },

    {
        title: "SQL & Database Management",
        category: "Database",
        requiredSkills: ["SQL"],
        difficulty: "Intermediate",
        duration: "4 Weeks",
        description:
            "Learn database concepts, SQL queries and database management."
    }

];


// =====================================================
// Project Database
// =====================================================

const projects = [

    {
        title: "Portfolio Website",
        requiredSkills: ["HTML", "CSS", "JavaScript"],
        difficulty: "Beginner",
        duration: "1 Week",
        description:
            "Build a personal portfolio website to showcase your skills and projects."
    },

    {
        title: "To-Do List Application",
        requiredSkills: ["HTML", "CSS", "JavaScript"],
        difficulty: "Beginner",
        duration: "1 Week",
        description:
            "Create a task management application using JavaScript."
    },

    {
        title: "Weather Application",
        requiredSkills: ["HTML", "CSS", "JavaScript"],
        difficulty: "Intermediate",
        duration: "2 Weeks",
        description:
            "Build a weather application using a public weather API."
    },

    {
        title: "E-Commerce Website",
        requiredSkills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React"
        ],
        difficulty: "Intermediate",
        duration: "4 Weeks",
        description:
            "Create a complete e-commerce frontend with products, cart and checkout."
    },

    {
        title: "Full Stack LMS",
        requiredSkills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "SQL"
        ],
        difficulty: "Advanced",
        duration: "8 Weeks",
        description:
            "Build a learning management system with authentication, courses and student progress."
    }

];


// =====================================================
// Internship Database
// =====================================================

const internships = [

    {
        title: "Frontend Developer Intern",
        company: "Tech Solutions",
        requiredSkills: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        location: "Remote",
        duration: "3 Months"
    },

    {
        title: "React Developer Intern",
        company: "WebWorks",
        requiredSkills: [
            "JavaScript",
            "React"
        ],
        location: "Hyderabad",
        duration: "6 Months"
    },

    {
        title: "Python Developer Intern",
        company: "CodeLabs",
        requiredSkills: [
            "Python",
            "SQL"
        ],
        location: "Remote",
        duration: "3 Months"
    },

    {
        title: "Full Stack Developer Intern",
        company: "InnovateTech",
        requiredSkills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "SQL"
        ],
        location: "Bangalore",
        duration: "6 Months"
    }

];


// =====================================================
// Job Database
// =====================================================

const jobs = [

    {
        title: "Junior Frontend Developer",
        company: "DigitalWorks",
        requiredSkills: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        location: "Hyderabad",
        type: "Full Time"
    },

    {
        title: "React Developer",
        company: "TechWorld",
        requiredSkills: [
            "JavaScript",
            "React"
        ],
        location: "Bangalore",
        type: "Full Time"
    },

    {
        title: "Python Developer",
        company: "DataSoft",
        requiredSkills: [
            "Python",
            "SQL"
        ],
        location: "Remote",
        type: "Full Time"
    },

    {
        title: "Full Stack Developer",
        company: "InnovateLabs",
        requiredSkills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "SQL"
        ],
        location: "Hyderabad",
        type: "Full Time"
    }

];


// =====================================================
// Find Student Skill
// =====================================================

function findStudentSkill(skillName) {

    return studentSkills.find(
        skill =>
            skill.name.toLowerCase() ===
            skillName.toLowerCase()
    );

}


// =====================================================
// Calculate Skill Match
// =====================================================

function calculateSkillMatch(requiredSkills) {

    if (requiredSkills.length === 0) {
        return 0;
    }

    let totalScore = 0;

    requiredSkills.forEach(requiredSkill => {

        const studentSkill =
            findStudentSkill(requiredSkill);

        if (studentSkill) {

            totalScore += studentSkill.level;

        } else {

            totalScore += 0;

        }

    });

    return Math.round(
        totalScore / requiredSkills.length
    );

}


// =====================================================
// Find Missing Skills
// =====================================================

function findMissingSkills(requiredSkills) {

    return requiredSkills.filter(skill => {

        const studentSkill =
            findStudentSkill(skill);

        return !studentSkill || studentSkill.level < 50;

    });

}


// =====================================================
// Get Recommended Courses
// =====================================================

function getRecommendedCourses() {

    return courses
        .map(course => {

            const match =
                calculateSkillMatch(
                    course.requiredSkills
                );

            const missing =
                findMissingSkills(
                    course.requiredSkills
                );

            return {
                ...course,
                match,
                missing
            };

        })
        .sort((a, b) => b.match - a.match);

}


// =====================================================
// Get Recommended Projects
// =====================================================

function getRecommendedProjects() {

    return projects
        .map(project => {

            const match =
                calculateSkillMatch(
                    project.requiredSkills
                );

            const missing =
                findMissingSkills(
                    project.requiredSkills
                );

            return {
                ...project,
                match,
                missing
            };

        })
        .sort((a, b) => b.match - a.match);

}


// =====================================================
// Get Recommended Internships
// =====================================================

function getRecommendedInternships() {

    return internships
        .map(internship => {

            const match =
                calculateSkillMatch(
                    internship.requiredSkills
                );

            const missing =
                findMissingSkills(
                    internship.requiredSkills
                );

            return {
                ...internship,
                match,
                missing
            };

        })
        .sort((a, b) => b.match - a.match);

}


// =====================================================
// Get Recommended Jobs
// =====================================================

function getRecommendedJobs() {

    return jobs
        .map(job => {

            const match =
                calculateSkillMatch(
                    job.requiredSkills
                );

            const missing =
                findMissingSkills(
                    job.requiredSkills
                );

            return {
                ...job,
                match,
                missing
            };

        })
        .sort((a, b) => b.match - a.match);

}


// =====================================================
// Generate Skill Gap Report
// =====================================================

function generateSkillGapReport() {

    const skillGaps = [];

    studentSkills.forEach(skill => {

        if (skill.level < 70) {

            skillGaps.push({
                skill: skill.name,
                currentLevel: skill.level,
                targetLevel: 80,
                improvementNeeded:
                    80 - skill.level
            });

        }

    });

    return skillGaps;

}


// =====================================================
// Get Career Match
// =====================================================

function getCareerMatch() {

    const careerSkills = [
        "HTML",
        "CSS",
        "JavaScript",
        "React"
    ];

    return calculateSkillMatch(
        careerSkills
    );

}


// =====================================================
// Display Recommendations
// =====================================================

function displayRecommendations() {

    const courseContainer =
        document.getElementById(
            "courseRecommendations"
        );

    const projectContainer =
        document.getElementById(
            "projectRecommendations"
        );

    const internshipContainer =
        document.getElementById(
            "internshipRecommendations"
        );

    const jobContainer =
        document.getElementById(
            "jobRecommendations"
        );


    // ---------------- Courses ----------------

    if (courseContainer) {

        const recommendedCourses =
            getRecommendedCourses();

        courseContainer.innerHTML = "";

        recommendedCourses
            .slice(0, 4)
            .forEach(course => {

                courseContainer.innerHTML += `

                    <div class="recommendation-card">

                        <div class="recommendation-icon">
                            📚
                        </div>

                        <div class="recommendation-content">

                            <span class="match-badge">
                                ${course.match}% Match
                            </span>

                            <h3>
                                ${course.title}
                            </h3>

                            <p>
                                ${course.description}
                            </p>

                            <small>
                                ${course.duration}
                            </small>

                        </div>

                        <a
                            href="course-details.html"
                            class="small-btn"
                        >
                            View
                        </a>

                    </div>

                `;

            });

    }


    // ---------------- Projects ----------------

    if (projectContainer) {

        const recommendedProjects =
            getRecommendedProjects();

        projectContainer.innerHTML = "";

        recommendedProjects
            .slice(0, 4)
            .forEach(project => {

                projectContainer.innerHTML += `

                    <div class="recommendation-card">

                        <div class="recommendation-icon">
                            💻
                        </div>

                        <div class="recommendation-content">

                            <span class="match-badge">
                                ${project.match}% Match
                            </span>

                            <h3>
                                ${project.title}
                            </h3>

                            <p>
                                ${project.description}
                            </p>

                            <small>
                                ${project.duration}
                            </small>

                        </div>

                        <a
                            href="project-details.html"
                            class="small-btn"
                        >
                            View
                        </a>

                    </div>

                `;

            });

    }


    // ---------------- Internships ----------------

    if (internshipContainer) {

        const recommendedInternships =
            getRecommendedInternships();

        internshipContainer.innerHTML = "";

        recommendedInternships
            .slice(0, 4)
            .forEach(internship => {

                internshipContainer.innerHTML += `

                    <div class="recommendation-card">

                        <div class="recommendation-icon">
                            🎓
                        </div>

                        <div class="recommendation-content">

                            <span class="match-badge">
                                ${internship.match}% Match
                            </span>

                            <h3>
                                ${internship.title}
                            </h3>

                            <p>
                                ${internship.company}
                            </p>

                            <small>
                                ${internship.location}
                                •
                                ${internship.duration}
                            </small>

                        </div>

                        <a
                            href="internships.html"
                            class="small-btn"
                        >
                            Apply
                        </a>

                    </div>

                `;

            });

    }


    // ---------------- Jobs ----------------

    if (jobContainer) {

        const recommendedJobs =
            getRecommendedJobs();

        jobContainer.innerHTML = "";

        recommendedJobs
            .slice(0, 4)
            .forEach(job => {

                jobContainer.innerHTML += `

                    <div class="recommendation-card">

                        <div class="recommendation-icon">
                            💼
                        </div>

                        <div class="recommendation-content">

                            <span class="match-badge">
                                ${job.match}% Match
                            </span>

                            <h3>
                                ${job.title}
                            </h3>

                            <p>
                                ${job.company}
                            </p>

                            <small>
                                ${job.location}
                                •
                                ${job.type}
                            </small>

                        </div>

                        <a
                            href="jobs.html"
                            class="small-btn"
                        >
                            View Job
                        </a>

                    </div>

                `;

            });

}


// =====================================================
// Display Career Match
// =====================================================

function displayCareerMatch() {

    const careerMatch =
        getCareerMatch();

    const matchElement =
        document.getElementById(
            "careerMatch"
        );

    if (matchElement) {

        matchElement.textContent =
            careerMatch + "%";

    }

}


// =====================================================
// Display Skill Gaps
// =====================================================

function displaySkillGaps() {

    const gapContainer =
        document.getElementById(
            "skillGaps"
        );

    if (!gapContainer) {
        return;
    }

    const gaps =
        generateSkillGapReport();

    gapContainer.innerHTML = "";

    gaps.forEach(gap => {

        gapContainer.innerHTML += `

            <div class="skill-gap-item">

                <div>

                    <strong>
                        ${gap.skill}
                    </strong>

                    <span>
                        Current: ${gap.currentLevel}%
                    </span>

                </div>

                <div>

                    <span>
                        Target: ${gap.targetLevel}%
                    </span>

                </div>

            </div>

        `;

    });

}


// =====================================================
// Filter Recommendations
// =====================================================

function filterRecommendations(type, level) {

    let data = [];

    if (type === "courses") {
        data = getRecommendedCourses();
    }

    if (type === "projects") {
        data = getRecommendedProjects();
    }

    if (type === "internships") {
        data = getRecommendedInternships();
    }

    if (type === "jobs") {
        data = getRecommendedJobs();
    }


    if (!level || level === "all") {

        return data;

    }


    return data.filter(item => {

        return item.difficulty &&
            item.difficulty.toLowerCase() ===
            level.toLowerCase();

    });

}


// =====================================================
// Save Recommendation
// =====================================================

function saveRecommendation(type, title) {

    let saved =
        JSON.parse(
            localStorage.getItem(
                "savedRecommendations"
            )
        ) || [];


    const alreadySaved =
        saved.some(item =>
            item.title === title &&
            item.type === type
        );


    if (!alreadySaved) {

        saved.push({
            type: type,
            title: title,
            savedAt: new Date().toISOString()
        });

        localStorage.setItem(
            "savedRecommendations",
            JSON.stringify(saved)
        );

        alert(
            "Recommendation saved successfully!"
        );

    } else {

        alert(
            "This recommendation is already saved."
        );

    }

}


// =====================================================
// Get Saved Recommendations
// =====================================================

function getSavedRecommendations() {

    return JSON.parse(
        localStorage.getItem(
            "savedRecommendations"
        )
    ) || [];

}


// =====================================================
// Initialize Recommendation Page
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayRecommendations();

        displayCareerMatch();

        displaySkillGaps();

    }
);


// =====================================================
// Export Functions
// =====================================================

window.SkillMatchRecommendations = {

    getRecommendedCourses,
    getRecommendedProjects,
    getRecommendedInternships,
    getRecommendedJobs,

    calculateSkillMatch,
    findMissingSkills,

    generateSkillGapReport,
    getCareerMatch,

    filterRecommendations,

    saveRecommendation,
    getSavedRecommendations

};