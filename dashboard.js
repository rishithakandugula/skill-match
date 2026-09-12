// ==========================================
// SkillMatch - Dashboard JavaScript
// ==========================================


// ==========================================
// SAMPLE USER DATA
// ==========================================

const dashboardData = {

    user: {
        name: "Alex Johnson",
        email: "alex@example.com"
    },

    skills: [
        {
            name: "HTML",
            level: "Advanced",
            score: 90
        },
        {
            name: "CSS",
            level: "Advanced",
            score: 85
        },
        {
            name: "JavaScript",
            level: "Intermediate",
            score: 65
        },
        {
            name: "Python",
            level: "Intermediate",
            score: 60
        },
        {
            name: "SQL",
            level: "Intermediate",
            score: 70
        },
        {
            name: "React",
            level: "Beginner",
            score: 40
        }
    ],

    courses: {
        completed: 4,
        inProgress: 2,
        total: 8
    },

    projects: {
        completed: 3,
        inProgress: 1,
        total: 5
    },

    internships: 6,

    jobs: 8,

    careerReadiness: 72

};


// ==========================================
// CALCULATE AVERAGE SKILL
// ==========================================

function calculateAverageSkill() {

    const skills = dashboardData.skills;

    if (skills.length === 0) {
        return 0;
    }

    const total = skills.reduce(
        (sum, skill) => sum + skill.score,
        0
    );

    return Math.round(total / skills.length);

}


// ==========================================
// CALCULATE COURSE PROGRESS
// ==========================================

function calculateCourseProgress() {

    const courses = dashboardData.courses;

    if (courses.total === 0) {
        return 0;
    }

    return Math.round(
        (courses.completed / courses.total) * 100
    );

}


// ==========================================
// CALCULATE PROJECT PROGRESS
// ==========================================

function calculateProjectProgress() {

    const projects = dashboardData.projects;

    if (projects.total === 0) {
        return 0;
    }

    return Math.round(
        (projects.completed / projects.total) * 100
    );

}


// ==========================================
// DISPLAY USER INFORMATION
// ==========================================

function displayUserInfo() {

    const userName =
        document.getElementById("userName");

    const userEmail =
        document.getElementById("userEmail");


    if (userName) {

        userName.textContent =
            dashboardData.user.name;

    }


    if (userEmail) {

        userEmail.textContent =
            dashboardData.user.email;

    }

}


// ==========================================
// DISPLAY DASHBOARD SUMMARY
// ==========================================

function displaySummary() {

    const averageSkill =
        document.getElementById("averageSkill");

    const completedCourses =
        document.getElementById("completedCourses");

    const completedProjects =
        document.getElementById("completedProjects");

    const careerReadiness =
        document.getElementById("careerReadiness");


    if (averageSkill) {

        averageSkill.textContent =
            calculateAverageSkill() + "%";

    }


    if (completedCourses) {

        completedCourses.textContent =
            dashboardData.courses.completed;

    }


    if (completedProjects) {

        completedProjects.textContent =
            dashboardData.projects.completed;

    }


    if (careerReadiness) {

        careerReadiness.textContent =
            dashboardData.careerReadiness + "%";

    }

}


// ==========================================
// DISPLAY SKILL PROGRESS
// ==========================================

function displaySkillProgress() {

    const skillList =
        document.getElementById("skillProgressList");


    if (!skillList) {
        return;
    }


    skillList.innerHTML = "";


    dashboardData.skills.forEach(skill => {

        const skillItem =
            document.createElement("div");


        skillItem.className =
            "dashboard-skill-item";


        skillItem.innerHTML = `

            <div class="skill-item-header">

                <div>

                    <strong>
                        ${skill.name}
                    </strong>

                    <span>
                        ${skill.level}
                    </span>

                </div>

                <strong>
                    ${skill.score}%
                </strong>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${skill.score}%"
                ></div>

            </div>

        `;


        skillList.appendChild(skillItem);

    });

}


// ==========================================
// DISPLAY COURSE PROGRESS
// ==========================================

function displayCourseProgress() {

    const courseProgress =
        document.getElementById("courseProgress");

    const courseProgressBar =
        document.getElementById("courseProgressBar");


    const percentage =
        calculateCourseProgress();


    if (courseProgress) {

        courseProgress.textContent =
            percentage + "%";

    }


    if (courseProgressBar) {

        courseProgressBar.style.width =
            percentage + "%";

    }

}


// ==========================================
// DISPLAY PROJECT PROGRESS
// ==========================================

function displayProjectProgress() {

    const projectProgress =
        document.getElementById("projectProgress");

    const projectProgressBar =
        document.getElementById("projectProgressBar");


    const percentage =
        calculateProjectProgress();


    if (projectProgress) {

        projectProgress.textContent =
            percentage + "%";

    }


    if (projectProgressBar) {

        projectProgressBar.style.width =
            percentage + "%";

    }

}


// ==========================================
// DISPLAY CAREER READINESS
// ==========================================

function displayCareerReadiness() {

    const readiness =
        document.getElementById("careerReadiness");

    const readinessBar =
        document.getElementById("careerReadinessBar");

    const readinessMessage =
        document.getElementById("careerReadinessMessage");


    const percentage =
        dashboardData.careerReadiness;


    if (readiness) {

        readiness.textContent =
            percentage + "%";

    }


    if (readinessBar) {

        readinessBar.style.width =
            percentage + "%";

    }


    if (readinessMessage) {

        if (percentage >= 80) {

            readinessMessage.textContent =
                "Excellent! You are almost ready for your dream career.";

        } else if (percentage >= 60) {

            readinessMessage.textContent =
                "Good progress! Continue improving your key skills.";

        } else {

            readinessMessage.textContent =
                "Keep learning and building projects to improve your career readiness.";

        }

    }

}


// ==========================================
// DISPLAY OPPORTUNITY COUNTS
// ==========================================

function displayOpportunities() {

    const internshipCount =
        document.getElementById("internshipCount");

    const jobCount =
        document.getElementById("jobCount");


    if (internshipCount) {

        internshipCount.textContent =
            dashboardData.internships;

    }


    if (jobCount) {

        jobCount.textContent =
            dashboardData.jobs;

    }

}


// ==========================================
// GET NEXT LEARNING GOAL
// ==========================================

function getNextLearningGoal() {

    const sortedSkills =
        [...dashboardData.skills]
            .sort((a, b) => a.score - b.score);


    if (sortedSkills.length === 0) {

        return "Add your first skill";

    }


    const weakestSkill =
        sortedSkills[0];


    if (weakestSkill.score < 50) {

        return `Improve ${weakestSkill.name} from Beginner to Intermediate`;

    }


    if (weakestSkill.score < 70) {

        return `Improve ${weakestSkill.name} to the next level`;

    }


    return "Complete another project to strengthen your profile";

}


// ==========================================
// DISPLAY NEXT LEARNING GOAL
// ==========================================

function displayNextGoal() {

    const nextGoal =
        document.getElementById("nextLearningGoal");


    if (nextGoal) {

        nextGoal.textContent =
            getNextLearningGoal();

    }

}


// ==========================================
// DISPLAY RECOMMENDATIONS
// ==========================================

function displayRecommendations() {

    const recommendationList =
        document.getElementById(
            "dashboardRecommendations"
        );


    if (!recommendationList) {
        return;
    }


    const recommendations = [

        {
            title: "Advanced JavaScript",
            type: "Course",
            reason: "Improve your JavaScript skills",
            link: "courses.html"
        },

        {
            title: "React.js for Beginners",
            type: "Course",
            reason: "Your React skill needs improvement",
            link: "courses.html"
        },

        {
            title: "Weather Application",
            type: "Project",
            reason: "Practice JavaScript and API integration",
            link: "projects.html"
        },

        {
            title: "Frontend Developer Intern",
            type: "Internship",
            reason: "92% skill match",
            link: "internships.html"
        }

    ];


    recommendationList.innerHTML = "";


    recommendations.forEach(item => {

        const card =
            document.createElement("div");


        card.className =
            "recommendation-item";


        card.innerHTML = `

            <div class="recommendation-icon">
                ${getRecommendationIcon(item.type)}
            </div>

            <div class="recommendation-info">

                <span>
                    ${item.type}
                </span>

                <h4>
                    ${item.title}
                </h4>

                <p>
                    ${item.reason}
                </p>

            </div>

            <a
                href="${item.link}"
                class="btn btn-outline"
            >
                View
            </a>

        `;


        recommendationList.appendChild(card);

    });

}


// ==========================================
// RECOMMENDATION ICON
// ==========================================

function getRecommendationIcon(type) {

    switch (type) {

        case "Course":
            return "📚";

        case "Project":
            return "💻";

        case "Internship":
            return "🎓";

        case "Job":
            return "💼";

        default:
            return "⭐";

    }

}


// ==========================================
// LOAD SAVED PROFILE
// ==========================================

function loadProfileData() {

    const savedProfile =
        localStorage.getItem(
            "skillMatchProfile"
        );


    if (!savedProfile) {
        return;
    }


    try {

        const profile =
            JSON.parse(savedProfile);


        if (profile.fullName) {

            dashboardData.user.name =
                profile.fullName;

        }


        if (profile.email) {

            dashboardData.user.email =
                profile.email;

        }


    } catch (error) {

        console.error(
            "Unable to load profile:",
            error
        );

    }

}


// ==========================================
// LOAD SAVED SKILLS
// ==========================================

function loadSavedSkills() {

    const savedSkills =
        localStorage.getItem(
            "skillMatchSkills"
        );


    if (!savedSkills) {
        return;
    }


    try {

        const skills =
            JSON.parse(savedSkills);


        if (
            Array.isArray(skills) &&
            skills.length > 0
        ) {

            dashboardData.skills =
                skills;

        }


    } catch (error) {

        console.error(
            "Unable to load skills:",
            error
        );

    }

}


// ==========================================
// REFRESH DASHBOARD
// ==========================================

function refreshDashboard() {

    displayUserInfo();

    displaySummary();

    displaySkillProgress();

    displayCourseProgress();

    displayProjectProgress();

    displayCareerReadiness();

    displayOpportunities();

    displayNextGoal();

    displayRecommendations();

}


// ==========================================
// INITIALIZE DASHBOARD
// ==========================================

function initializeDashboard() {

    loadProfileData();

    loadSavedSkills();

    refreshDashboard();

}


// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    localStorage.removeItem(
        "skillMatchLoggedIn"
    );

    localStorage.removeItem(
        "skillMatchUser"
    );

    window.location.href =
        "login.html";

}


// ==========================================
// EXPOSE DASHBOARD FUNCTIONS
// ==========================================

window.SkillMatchDashboard = {

    data: dashboardData,

    refresh: refreshDashboard,

    calculateAverageSkill,

    calculateCourseProgress,

    calculateProjectProgress,

    getNextLearningGoal,

    logout: logoutUser

};


// ==========================================
// START DASHBOARD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);