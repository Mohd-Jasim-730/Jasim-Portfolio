const toggleBtn = document.getElementById("modeToggle");
const modeIcon = document.getElementById("modeIcon");
const DSSound = document.getElementById("DSSound");

// =================== MODE TOGGLE ===================
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        modeIcon.textContent = "☀";
    } else {
        modeIcon.textContent = "🌙";
    }
});

// =================== LOAD TASKS ===================
document.addEventListener("DOMContentLoaded", () => {

    loadPortfolioTasks();

    // Attach sound to all clickable elements AFTER DOM loads
    document.querySelectorAll("a, button").forEach(element => {
        element.addEventListener("click", playSound);
    });
});

function loadPortfolioTasks() {
    const taskContainer = document.getElementById("portfolioTasks");
    if (!taskContainer) return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    taskContainer.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${task.text}</strong>
            <br><small>${task.time}</small>
        `;

        if (task.completed) {
            li.style.textDecoration = "line-through";
            li.style.color = "#888";
        }

        taskContainer.appendChild(li);
    });
}

// =================== SOUND ===================

// Unlock sound after first interaction
document.addEventListener("click", () => {
    DSSound.play().then(() => {
        DSSound.pause();
        DSSound.currentTime = 0;
    }).catch(() => {});
}, { once: true });

function playSound() {
    DSSound.currentTime = 0;
    DSSound.play().catch(() => {});
}
