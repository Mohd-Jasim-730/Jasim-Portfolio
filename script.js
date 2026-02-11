const toggleBtn=document.getElementById("modeToggle");
const modeIcon=document.getElementById("modeIcon");

toggleBtn.addEventListener("click",()=>{
    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        modeIcon.textContent="☀";
    }
    else{
        modeIcon.textContent="🌙";
    }
});