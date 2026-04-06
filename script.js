const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");

const allQuotes = [
    "Raise the bar by completing your goals!",
    "Well begun is half done!",
    "Just a step away, keep going!",
    "Whoa! You just completed all the goals, time for chill :D"
];

const defaultGoalsState = {
    first: {
        name: "",
        completed: false
    },
    second: {
        name: "",
        completed: false
    },
    third: {
        name: "",
        completed: false
    }
};

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || defaultGoalsState;

// make sure all 3 keys always exist
allGoals = {
    ...defaultGoalsState,
    ...allGoals
};

function saveGoals() {
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
}

function getCompletedGoalsCount() {
    return Object.values(allGoals).filter((goal) => goal.completed).length;
}

function updateProgress() {
    const completedGoalsCount = getCompletedGoalsCount();
    const progressPercent = (completedGoalsCount / inputFields.length) * 100;

    progressValue.style.width = `${progressPercent}%`;
    progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} Completed`;
    progressLabel.innerText = allQuotes[completedGoalsCount];
}

function loadGoals() {
    inputFields.forEach((input) => {
        const storedGoal = allGoals[input.id];

        if (!storedGoal) return;

        input.value = storedGoal.name;

        if (storedGoal.completed) {
            input.parentElement.classList.add("completed");
            input.disabled = true;
        } else {
            input.parentElement.classList.remove("completed");
            input.disabled = false;
        }
    });

    updateProgress();
}

function areAllInputsFilled() {
    return [...inputFields].every((input) => input.value.trim() !== "");
}

function toggleGoalComplete(checkbox) {
    if (!areAllInputsFilled()) {
        progressBar.parentElement.classList.add("show-error");
        return;
    }

    progressBar.parentElement.classList.remove("show-error");

    const goalContainer = checkbox.parentElement;
    const input = goalContainer.querySelector(".goal-input");

    goalContainer.classList.toggle("completed");

    const isCompleted = goalContainer.classList.contains("completed");

    allGoals[input.id] = {
        name: input.value,
        completed: isCompleted
    };

    input.disabled = isCompleted;

    saveGoals();
    updateProgress();
}

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
        toggleGoalComplete(checkbox);
    });

    checkbox.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleGoalComplete(checkbox);
        }
    });
});

inputFields.forEach((input) => {
    input.addEventListener("focus", () => {
        progressBar.parentElement.classList.remove("show-error");
    });

    input.addEventListener("input", (event) => {
        const currentGoal = allGoals[input.id];

        if (currentGoal.completed) {
            event.target.value = currentGoal.name;
            return;
        }

        allGoals[input.id] = {
            name: input.value,
            completed: false
        };

        saveGoals();
    });
});

loadGoals();