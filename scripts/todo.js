const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");

document.addEventListener("DOMContentLoaded",loadTasks);

addBtn.addEventListener("click",() =>{
    const text=taskInput.value.trim();
    if(text==="")return alert("Enter a task");

    const task={
        id:Date.now(),
        text:text,
        date:new Date().toLocaleDateString('en-GB',{
            day:'2-digit',
            month:'short',
            year:'numeric'
        }),
        time:new Date().toLocaleTimeString('en-US',{
            hour:'2-digit',
            minute:'2-digit',
            hour12:true
        }),
        completed:false
    };

    const tasks=getTasks();
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));

    taskInput.value="";
    loadTasks();
});

function getTasks(){
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks(){
    taskList.innerHTML="";
    const tasks=getTasks();

    tasks.forEach(task =>{
        const li=document.createElement("li");

        li.innerHTML = `
            <div class="task-title">${task.text}</div>

            <div class="task-actions">
                <button onclick="toggleTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>
            
                <button onclick="deleteTask(${task.id})">Delete</button>
            <div>

            <div class="task-meta">
                <div class="meta-left">📅 ${task.date}</div>
                <div class="meta-right">🕒 ${task.time}</div>
            </div>
        `;


        if(task.completed){
            li.style.textDecoration="line-through";
            li.style.opacity="0.6"
        }

        taskList.appendChild(li);
    });
}

function toggleTask(id){
    const tasks=getTasks().map(task => {
        if (task.id===id) task.completed = !task.completed;
        return task;
    });

    localStorage.setItem("tasks",JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(id){
    const tasks=getTasks().filter(task => task.id !==id);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    loadTasks();
}