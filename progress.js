/* =========================================================
   SkillMatch - Progress Management
   File: progress.js
   ========================================================= */


/* ================= SAMPLE USER PROGRESS ================= */

const userProgress = {

    skills: [
        {
            name: "HTML",
            current: 90,
            target: 95,
            level: "Advanced"
        },
        {
            name: "CSS",
            current: 85,
            target: 90,
            level: "Advanced"
        },
        {
            name: "JavaScript",
            current: 65,
            target: 85,
            level: "Intermediate"
        },
        {
            name: "Python",
            current: 60,
            target: 80,
            level: "Intermediate"
        },
        {
            name: "SQL",
            current: 70,
            target: 85,
            level: "Intermediate"
        },
        {
            name: "React",
            current: 40,
            target: 75,
            level: "Beginner"
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

    assessments: {
        completed: 5,
        total: 8
    },

    learningHours: 42,

    careerReadiness: 72
};


/* =========================================================
   CALCULATE AVERAGE SKILL SCORE
   ========================================================= */

function calculateAverageSkill() {

    if (userProgress.skills.length === 0) {
        return 0;
    }

    const total = userProgress.skills.reduce(
        (sum, skill) => sum + skill.current,
        0
    );

    return Math.round(
        total / userProgress.skills.length
    );
}


/* =========================================================
   CALCULATE COURSE PROGRESS
   ========================================================= */

function calculateCourseProgress() {

    if (userProgress.courses.total === 0) {
        return 0;
    }

    return Math.round(
        (userProgress.courses.completed /
            userProgress.courses.total) * 100
    );
}


/* =========================================================
   CALCULATE PROJECT PROGRESS
   ========================================================= */

function calculateProjectProgress() {

    if (userProgress.projects.total === 0) {
        return 0;
    }

    return Math.round(
        (userProgress.projects.completed /
            userProgress.projects.total) * 100
    );
}


/* =========================================================
   CALCULATE ASSESSMENT PROGRESS
   ========================================================= */

function calculateAssessmentProgress() {

    if (userProgress.assessments.total === 0) {
        return 0;
    }

    return Math.round(
        (userProgress.assessments.completed /
            userProgress.assessments.total) * 100
    );
}


/* =========================================================
   GET SKILL STATUS
   ========================================================= */

function getSkillStatus(score) {

    if (score >= 90) {
        return "Excellent";
    }

    if (score >= 75) {
        return "Good";
    }

    if (score >= 50) {
        return "Improving";
    }

    return "Needs Improvement";
}


/* =========================================================
   GET PROGRESS MESSAGE
   ========================================================= */

function getProgressMessage(score) {

    if (score >= 90) {
        return "Excellent progress! You are highly skilled.";
    }

    if (score >= 75) {
        return "Great progress! Keep improving your skills.";
    }

    if (score >= 50) {
        return "You are making good progress. Keep learning.";
    }

    return "Start learning and improve your skills step by step.";
}


/* =========================================================
   DISPLAY OVERALL PROGRESS
   ========================================================= */

function displayOverallProgress() {

    const averageSkill = calculateAverageSkill();
    const courseProgress = calculateCourseProgress();
    const projectProgress = calculateProjectProgress();
    const assessmentProgress = calculateAssessmentProgress();

    const averageElement =
        document.getElementById("averageSkill");

    const courseElement =
        document.getElementById("courseProgress");

    const projectElement =
        document.getElementById("projectProgress");

    const assessmentElement =
        document.getElementById("assessmentProgress");

    if (averageElement) {
        averageElement.textContent =
            averageSkill + "%";
    }

    if (courseElement) {
        courseElement.textContent =
            courseProgress + "%";
    }

    if (projectElement) {
        projectElement.textContent =
            projectProgress + "%";
    }

    if (assessmentElement) {
        assessmentElement.textContent =
            assessmentProgress + "%";
    }
}


/* =========================================================
   DISPLAY SKILL PROGRESS
   ========================================================= */

function displaySkillProgress() {

    const container =
        document.getElementById("skillProgressList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    userProgress.skills.forEach(skill => {

        const status =
            getSkillStatus(skill.current);

        const remaining =
            Math.max(
                skill.target - skill.current,
                0
            );

        const skillItem =
            document.createElement("div");

        skillItem.className =
            "progress-skill-item";

        skillItem.innerHTML = `

            <div class="progress-skill-header">

                <div>
                    <h3>${skill.name}</h3>

                    <span>
                        ${skill.level}
                    </span>
                </div>

                <strong>
                    ${skill.current}%
                </strong>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width: ${skill.current}%;">
                </div>

            </div>


            <div class="progress-skill-footer">

                <span>
                    ${status}
                </span>

                <span>
                    Target: ${skill.target}%
                </span>

            </div>


            ${
                remaining > 0
                ? `
                    <p class="progress-tip">
                        Improve ${remaining}% more to reach your target.
                    </p>
                  `
                : `
                    <p class="progress-tip">
                        🎉 Target achieved!
                    </p>
                  `
            }

        `;

        container.appendChild(skillItem);

    });
}


/* =========================================================
   DISPLAY COURSE PROGRESS
   ========================================================= */

function displayCourseProgress() {

    const container =
        document.getElementById("courseProgressDetails");

    if (!container) {
        return;
    }

    const progress =
        calculateCourseProgress();

    container.innerHTML = `

        <div class="progress-detail-card">

            <div class="progress-detail-icon">
                📚
            </div>

            <div class="progress-detail-content">

                <h3>
                    Course Learning
                </h3>

                <p>
                    ${userProgress.courses.completed}
                    of
                    ${userProgress.courses.total}
                    courses completed
                </p>

                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width: ${progress}%;">
                    </div>

                </div>

                <span>
                    ${progress}% completed
                </span>

            </div>

        </div>

    `;
}


/* =========================================================
   DISPLAY PROJECT PROGRESS
   ========================================================= */

function displayProjectProgress() {

    const container =
        document.getElementById("projectProgressDetails");

    if (!container) {
        return;
    }

    const progress =
        calculateProjectProgress();

    container.innerHTML = `

        <div class="progress-detail-card">

            <div class="progress-detail-icon">
                💻
            </div>

            <div class="progress-detail-content">

                <h3>
                    Project Building
                </h3>

                <p>
                    ${userProgress.projects.completed}
                    of
                    ${userProgress.projects.total}
                    projects completed
                </p>

                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width: ${progress}%;">
                    </div>

                </div>

                <span>
                    ${progress}% completed
                </span>

            </div>

        </div>

    `;
}


/* =========================================================
   DISPLAY LEARNING HOURS
   ========================================================= */

function displayLearningHours() {

    const element =
        document.getElementById("learningHours");

    if (!element) {
        return;
    }

    element.textContent =
        userProgress.learningHours + " hrs";
}


/* =========================================================
   DISPLAY CAREER READINESS
   ========================================================= */

function displayCareerReadiness() {

    const element =
        document.getElementById("careerReadiness");

    if (!element) {
        return;
    }

    const score =
        userProgress.careerReadiness;

    element.textContent =
        score + "%";

    const messageElement =
        document.getElementById("careerReadinessMessage");

    if (messageElement) {

        messageElement.textContent =
            getProgressMessage(score);

    }

    const progressBar =
        document.getElementById("careerReadinessBar");

    if (progressBar) {

        progressBar.style.width =
            score + "%";

    }
}


/* =========================================================
   GET NEXT LEARNING GOAL
   ========================================================= */

function getNextLearningGoal() {

    let weakestSkill =
        userProgress.skills[0];

    userProgress.skills.forEach(skill => {

        if (
            skill.current <
            weakestSkill.current
        ) {

            weakestSkill = skill;

        }

    });

    return weakestSkill;
}


/* =========================================================
   DISPLAY NEXT GOAL
   ========================================================= */

function displayNextGoal() {

    const container =
        document.getElementById("nextLearningGoal");

    if (!container) {
        return;
    }

    const skill =
        getNextLearningGoal();

    const improvement =
        skill.target - skill.current;

    container.innerHTML = `

        <div class="next-goal-card">

            <div class="next-goal-icon">
                🎯
            </div>

            <div>

                <span class="section-label">
                    Next Learning Goal
                </span>

                <h3>
                    Improve ${skill.name}
                </h3>

                <p>
                    Your current level is
                    ${skill.current}%.
                    Aim for ${skill.target}%.
                </p>

                <strong>
                    ${improvement}% improvement needed
                </strong>

            </div>

        </div>

    `;
}


/* =========================================================
   SAVE PROGRESS TO LOCAL STORAGE
   ========================================================= */

function saveProgress() {

    localStorage.setItem(
        "skillMatchProgress",
        JSON.stringify(userProgress)
    );

}


/* =========================================================
   LOAD SAVED PROGRESS
   ========================================================= */

function loadProgress() {

    const savedProgress =
        localStorage.getItem(
            "skillMatchProgress"
        );

    if (!savedProgress) {
        return;
    }

    try {

        const savedData =
            JSON.parse(savedProgress);

        Object.assign(
            userProgress,
            savedData
        );

    } catch (error) {

        console.error(
            "Unable to load progress:",
            error
        );

    }

}


/* =========================================================
   UPDATE SKILL PROGRESS
   ========================================================= */

function updateSkillProgress(
    skillName,
    newScore
) {

    const skill =
        userProgress.skills.find(
            item =>
                item.name.toLowerCase() ===
                skillName.toLowerCase()
        );

    if (!skill) {

        console.warn(
            "Skill not found:",
            skillName
        );

        return false;
    }

    skill.current =
        Math.min(
            Math.max(newScore, 0),
            100
        );


    if (skill.current >= 90) {

        skill.level = "Expert";

    } else if (skill.current >= 75) {

        skill.level = "Advanced";

    } else if (skill.current >= 50) {

        skill.level = "Intermediate";

    } else {

        skill.level = "Beginner";

    }


    saveProgress();

    displaySkillProgress();
    displayOverallProgress();

    return true;
}


/* =========================================================
   COMPLETE COURSE
   ========================================================= */

function completeCourse() {

    if (
        userProgress.courses.completed <
        userProgress.courses.total
    ) {

        userProgress.courses.completed++;

    }

    if (
        userProgress.courses.inProgress > 0
    ) {

        userProgress.courses.inProgress--;

    }

    saveProgress();

    displayOverallProgress();
    displayCourseProgress();

}


/* =========================================================
   COMPLETE PROJECT
   ========================================================= */

function completeProject() {

    if (
        userProgress.projects.completed <
        userProgress.projects.total
    ) {

        userProgress.projects.completed++;

    }

    if (
        userProgress.projects.inProgress > 0
    ) {

        userProgress.projects.inProgress--;

    }

    saveProgress();

    displayOverallProgress();
    displayProjectProgress();

}


/* =========================================================
   COMPLETE ASSESSMENT
   ========================================================= */

function completeAssessment() {

    if (
        userProgress.assessments.completed <
        userProgress.assessments.total
    ) {

        userProgress.assessments.completed++;

    }

    saveProgress();

    displayOverallProgress();

}


/* =========================================================
   RESET PROGRESS
   ========================================================= */

function resetProgress() {

    const confirmation =
        confirm(
            "Are you sure you want to reset your progress?"
        );

    if (!confirmation) {
        return;
    }

    localStorage.removeItem(
        "skillMatchProgress"
    );

    location.reload();

}


/* =========================================================
   INITIALIZE PROGRESS PAGE
   ========================================================= */

function initializeProgress() {

    loadProgress();

    displayOverallProgress();

    displaySkillProgress();

    displayCourseProgress();

    displayProjectProgress();

    displayLearningHours();

    displayCareerReadiness();

    displayNextGoal();

}


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeProgress
);


/* =========================================================
   GLOBAL SKILLMATCH PROGRESS API
   ========================================================= */

window.SkillMatchProgress = {

    userProgress,

    calculateAverageSkill,

    calculateCourseProgress,

    calculateProjectProgress,

    calculateAssessmentProgress,

    getSkillStatus,

    getProgressMessage,

    updateSkillProgress,

    completeCourse,

    completeProject,

    completeAssessment,

    getNextLearningGoal,

    saveProgress,

    loadProgress,

    resetProgress

};