//get all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
;

//function that adds task by hitting Enter
document.body.addEventListener('keypress', (e) =>{
    let userData = inputBox.value;
    if(e.key == 'Enter' && userData.trim() != 0){
        let userData = inputBox.value;
        let getLocalStorage = localStorage.getItem("New Todo"); 
        if(getLocalStorage == null){
            listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage); 
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr)); 
    addBtn.classList.remove("active");
    showTask();
    }
});

inputBox.onkeyup = () =>{ //when user releases a key
    let userData = inputBox.value; //get user entered value
    if (userData.trim() != 0){ //if user
        addBtn.classList.add("active"); //active the add button
    } else{
        addBtn.classList.remove("active");
    }
}

showTask(); //calling showTasks function to save prev todo even refreshing page


//if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value; //get user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
    if(getLocalStorage == null) { //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into js object
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into json string
    showTask(); //calling showTasks function
    addBtn.classList.remove("active");
    
}



//function to add task list inside ul
function showTask(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
    if(getLocalStorage == null) { //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
    if (listArr.length > 0){ //if array lenght is greater than 0
        deleteAllBtn.classList.add("active"); //active the clear or delete button
    } else{
        deleteAllBtn.classList.remove("active");
    }

let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} 
        <span ${index}>
        <p class="deleted">x</p></span>
        </li>`;
        
    });
    
    todoList.addEventListener('click', (e) => {
        if(e.target.tagName ==='LI') {
            e.target.classList.toggle('checked');
    }
    }, false);

    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added, leave the input field blank
}
    // todoList.addEventListener('click', (e) => {
    //     if(e.target.classList.contains('deleted')) {
    //         e.target.parentElement.closest.remove('deleted');
    // }
    // })

//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the specific indexed li
    // after remove li again update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into json string
    showTask()
}

//delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = []; //empty array
    //after delete all task again update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into json string
    showTask()
}