// ==========================================
// SkillMatch - Skills Management
// File: frontend/js/skills.js
// ==========================================


// ==========================================
// SAMPLE SKILLS
// ==========================================

let skills = [
    {
        id: 1,
        name: "HTML",
        category: "Web Development",
        level: "Advanced",
        score: 90
    },

    {
        id: 2,
        name: "CSS",
        category: "Web Development",
        level: "Advanced",
        score: 85
    },

    {
        id: 3,
        name: "JavaScript",
        category: "Programming",
        level: "Intermediate",
        score: 65
    },

    {
        id: 4,
        name: "Python",
        category: "Programming",
        level: "Intermediate",
        score: 60
    },

    {
        id: 5,
        name: "SQL",
        category: "Database",
        level: "Intermediate",
        score: 70
    },

    {
        id: 6,
        name: "React",
        category: "Web Development",
        level: "Beginner",
        score: 40
    }
];


// ==========================================
// LOCAL STORAGE KEY
// ==========================================

const SKILLS_STORAGE_KEY = "skillMatchSkills";


// ==========================================
// LOAD SAVED SKILLS
// ==========================================

function loadSkills() {

    const savedSkills =
        localStorage.getItem(SKILLS_STORAGE_KEY);

    if (savedSkills) {

        try {

            skills = JSON.parse(savedSkills);

        } catch (error) {

            console.error(
                "Unable to load saved skills:",
                error
            );

        }

    }

}


// ==========================================
// SAVE SKILLS
// ==========================================

function saveSkills() {

    localStorage.setItem(
        SKILLS_STORAGE_KEY,
        JSON.stringify(skills)
    );

}


// ==========================================
// GET LEVEL FROM SCORE
// ==========================================

function getLevelFromScore(score) {

    if (score >= 90) {

        return "Expert";

    }

    if (score >= 75) {

        return "Advanced";

    }

    if (score >= 50) {

        return "Intermediate";

    }

    return "Beginner";

}


// ==========================================
// GET STATUS FROM SCORE
// ==========================================

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

    return "Need Improvement";

}


// ==========================================
// DISPLAY SKILLS
// ==========================================

function displaySkills(skillList = skills) {

    const container =
        document.getElementById("skillsList");

    const noSkills =
        document.getElementById("noSkills");

    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (skillList.length === 0) {

        if (noSkills) {

            noSkills.style.display = "block";

        }

        updateSkillSummary([]);

        return;

    }


    if (noSkills) {

        noSkills.style.display = "none";

    }


    skillList.forEach(skill => {

        const card =
            document.createElement("div");

        card.className = "skill-card";


        card.innerHTML = `

            <div class="skill-card-header">

                <div>

                    <h3>${escapeHTML(skill.name)}</h3>

                    <p>
                        ${escapeHTML(skill.category)}
                    </p>

                </div>

                <span class="skill-level">
                    ${escapeHTML(skill.level)}
                </span>

            </div>


            <div class="skill-score">

                <div class="skill-score-header">

                    <span>Skill Level</span>

                    <strong>${skill.score}%</strong>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width: ${skill.score}%"
                    ></div>

                </div>

            </div>


            <div class="skill-status">

                <span>
                    ${getSkillStatus(skill.score)}
                </span>

            </div>


            <div class="skill-card-actions">

                <button
                    type="button"
                    onclick="editSkill(${skill.id})"
                    class="btn btn-outline"
                >
                    Edit
                </button>


                <button
                    type="button"
                    onclick="viewSkill(${skill.id})"
                    class="btn btn-primary"
                >
                    View Details
                </button>


                <button
                    type="button"
                    onclick="deleteSkill(${skill.id})"
                    class="btn btn-danger"
                >
                    Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });


    updateSkillSummary(skillList);

}


// ==========================================
// UPDATE SUMMARY CARDS
// ==========================================

function updateSkillSummary(skillList = skills) {

    const totalSkills =
        document.getElementById("totalSkills");

    const advancedSkills =
        document.getElementById("advancedSkills");

    const improvingSkills =
        document.getElementById("improvingSkills");

    const averageSkill =
        document.getElementById("averageSkill");


    const total =
        skillList.length;


    const advanced =
        skillList.filter(skill =>
            skill.score >= 75
        ).length;


    const improving =
        skillList.filter(skill =>
            skill.score >= 50 &&
            skill.score < 75
        ).length;


    let average = 0;


    if (total > 0) {

        const totalScore =
            skillList.reduce(
                (sum, skill) =>
                    sum + Number(skill.score),
                0
            );

        average =
            Math.round(totalScore / total);

    }


    if (totalSkills) {

        totalSkills.textContent = total;

    }


    if (advancedSkills) {

        advancedSkills.textContent = advanced;

    }


    if (improvingSkills) {

        improvingSkills.textContent = improving;

    }


    if (averageSkill) {

        averageSkill.textContent =
            average + "%";

    }

}


// ==========================================
// ADD NEW SKILL
// ==========================================

function addSkill(event) {

    event.preventDefault();


    const nameInput =
        document.getElementById("skillName");

    const categoryInput =
        document.getElementById("skillCategory");

    const levelInput =
        document.getElementById("skillLevel");


    if (
        !nameInput ||
        !categoryInput ||
        !levelInput
    ) {

        return;

    }


    const name =
        nameInput.value.trim();

    const category =
        categoryInput.value.trim();

    const level =
        levelInput.value;


    if (!name || !category || !level) {

        alert(
            "Please fill in all skill details."
        );

        return;

    }


    // Check duplicate skill

    const existingSkill =
        skills.find(skill =>
            skill.name.toLowerCase() ===
            name.toLowerCase()
        );


    if (existingSkill) {

        alert(
            "This skill has already been added."
        );

        return;

    }


    // Convert selected level to score

    let score = 30;


    if (level === "Intermediate") {

        score = 60;

    }

    else if (level === "Advanced") {

        score = 80;

    }

    else if (level === "Expert") {

        score = 95;

    }


    const newSkill = {

        id: Date.now(),

        name: name,

        category: category,

        level: level,

        score: score

    };


    skills.push(newSkill);

    saveSkills();

    displaySkills();

    event.target.reset();


    alert(
        `${name} has been added successfully!`
    );

}


// ==========================================
// EDIT SKILL
// ==========================================

function editSkill(id) {

    const skill =
        skills.find(item =>
            item.id === id
        );


    if (!skill) {

        return;

    }


    const newScore =
        prompt(
            `Enter your new score for ${skill.name} (0-100):`,
            skill.score
        );


    if (newScore === null) {

        return;

    }


    const score =
        Number(newScore);


    if (
        Number.isNaN(score) ||
        score < 0 ||
        score > 100
    ) {

        alert(
            "Please enter a score between 0 and 100."
        );

        return;

    }


    skill.score = score;

    skill.level =
        getLevelFromScore(score);


    saveSkills();

    displaySkills();


    alert(
        `${skill.name} has been updated successfully!`
    );

}


// ==========================================
// DELETE SKILL
// ==========================================

function deleteSkill(id) {

    const skill =
        skills.find(item =>
            item.id === id
        );


    if (!skill) {

        return;

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${skill.name}?`
        );


    if (!confirmed) {

        return;

    }


    skills =
        skills.filter(item =>
            item.id !== id
        );


    saveSkills();

    displaySkills();


    alert(
        `${skill.name} has been deleted.`
    );

}


// ==========================================
// VIEW SKILL DETAILS
// ==========================================

function viewSkill(id) {

    const skill =
        skills.find(item =>
            item.id === id
        );


    if (!skill) {

        return;

    }


    // Store selected skill

    localStorage.setItem(
        "selectedSkill",
        JSON.stringify(skill)
    );


    window.location.href =
        `skill-details.html?skill=${encodeURIComponent(skill.name)}`;

}


// ==========================================
// SEARCH SKILLS
// ==========================================

function searchSkills() {

    const searchInput =
        document.getElementById("skillSearch");


    if (!searchInput) {

        return;

    }


    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const filteredSkills =
        skills.filter(skill =>

            skill.name
                .toLowerCase()
                .includes(searchText)

            ||

            skill.category
                .toLowerCase()
                .includes(searchText)

            ||

            skill.level
                .toLowerCase()
                .includes(searchText)

        );


    displaySkills(filteredSkills);

}


// ==========================================
// FILTER BY LEVEL
// ==========================================

function filterByLevel(level) {

    if (level === "All") {

        displaySkills(skills);

        return;

    }


    const filteredSkills =
        skills.filter(skill =>
            skill.level === level
        );


    displaySkills(filteredSkills);

}


// ==========================================
// UPDATE SKILL SCORE
// ==========================================

function updateSkillScore(id, score) {

    const skill =
        skills.find(item =>
            item.id === id
        );


    if (!skill) {

        return;

    }


    score = Number(score);


    if (
        Number.isNaN(score) ||
        score < 0 ||
        score > 100
    ) {

        return;

    }


    skill.score = score;

    skill.level =
        getLevelFromScore(score);


    saveSkills();

    displaySkills();

}


// ==========================================
// GET SKILL BY NAME
// ==========================================

function getSkillByName(name) {

    return skills.find(skill =>

        skill.name.toLowerCase() ===
        name.toLowerCase()

    );

}


// ==========================================
// GET ALL SKILLS
// ==========================================

function getAllSkills() {

    return skills;

}


// ==========================================
// GET AVERAGE SKILL SCORE
// ==========================================

function getAverageSkillScore() {

    if (skills.length === 0) {

        return 0;

    }


    const total =
        skills.reduce(
            (sum, skill) =>
                sum + Number(skill.score),
            0
        );


    return Math.round(
        total / skills.length
    );

}


// ==========================================
// HTML SECURITY HELPER
// ==========================================

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// ==========================================
// INITIALIZE SKILLS PAGE
// ==========================================

function initializeSkills() {

    loadSkills();

    displaySkills();


    const searchInput =
        document.getElementById("skillSearch");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchSkills
        );

    }


    const skillForm =
        document.getElementById("addSkillForm");


    if (skillForm) {

        skillForm.addEventListener(
            "submit",
            addSkill
        );

    }

}


// ==========================================
// RUN WHEN PAGE LOADS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initializeSkills
);


// ==========================================
// PUBLIC API
// ==========================================

window.SkillMatchSkills = {

    getAllSkills,

    getSkillByName,

    getAverageSkillScore,

    updateSkillScore,

    addSkill,

    editSkill,

    deleteSkill,

    searchSkills,

    filterByLevel

};