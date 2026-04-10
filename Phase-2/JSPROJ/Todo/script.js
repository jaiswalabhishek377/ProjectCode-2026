const inputbox=document.querySelector('#taskInput');
const addbtn=document.querySelector('#addTaskBtn');
const displaytask=document.querySelector('#displaytask'); //ul

addbtn.addEventListener('click',function(){
    const task=inputbox.value;
    if(task.trim()!==''){
        const listitem=document.createElement('li');
        listitem.textContent=task; // listitem.innerHTML=task;
        displaytask.appendChild(listitem);
        let span=document.createElement('span');
        span.innerHTML="\u00d7";
        listitem.appendChild(span);
        inputbox.value='';
        saveTasks();
    }
    else{
        alert('Please enter a task');
    }
})

displaytask.addEventListener('click',function(e){
    if(e.target.tagName==='LI'){ // check where user clicks if its li then toggle the checked class
        e.target.classList.toggle('checked');
    }
    else if(e.target.tagName==='SPAN'){ // if user clicks on span then remove the parent element of span which is li
        e.target.parentElement.remove();
    }
    saveTasks();
})

// save to local storage
function saveTasks(){
    localStorage.setItem("data",displaytask.innerHTML); // content of displaytask is stored in local storage with key data  
}
// show from local storage
function showTasks(){
    displaytask.innerHTML=localStorage.getItem("data"); // content of local storage with key data is stored in displaytask
}
showTasks();
