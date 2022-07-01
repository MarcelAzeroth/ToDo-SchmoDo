//ToDo Input
const inputField = document.querySelector(".todo__main-input");
const toDoList = document.querySelector(".todo__main-list");

const addToDo = event => {
    if (event.key === "Enter"){
        let item = inputField.value

        //If empty stop the function
        if (!item.match(/([A-Za-z0-9])/)) {
            return false;
          }

        //adding item to ToDo  
        toDoList.innerHTML += ` 
        <li class="todo__main-list-item">
            <label class="todo__main-list-item-checkbox">
                <input type="checkbox">
                <span class="checkmark"><img src="./images/icon-check.svg" alt=""></span>
                <p id="list-paragraph">${item}</p>
            </label>
            <img src="./images/icon-cross.svg" alt="" class="todo__main-list-item-delete">
        </li>`

        //clear Input 
        inputField.value = "";

        //Activate Delete Buttons
        const deleteBtns = document.querySelectorAll(".todo__main-list-item-delete")
        deleteBtns.forEach(btn => btn.addEventListener("click", event => deleteItem(event)));

        //Activate Checkmarks
        const checkmarks = document.querySelectorAll(".checkmark")
        checkmarks.forEach(check => check.addEventListener("click", event => doneItem(event)));

        const checkParagraphs = document.querySelectorAll("#list-paragraph")
        checkParagraphs.forEach(paragraph => paragraph.addEventListener("click", event => donePara(event)))
    
        //Update Counter after adding new item
        updateCounter();
    }
}

inputField.addEventListener("keypress", event => addToDo(event))

//Delete Function
const deleteItem = event => {
    event.currentTarget.parentElement.parentElement.removeChild(event.currentTarget.parentElement)
    updateCounter()
}

//Counter Function
const counter = document.querySelector(".last-number")
const updateCounter = () => {
    let liAmount = document.querySelectorAll(".todo__main-list-item");
    let i = 0;
    liAmount.forEach(item => {
        if(!item.classList[1]){
            i += 1;
        }
    })    
        counter.innerHTML = i;
}

//Checkmark Function
const doneItem = event => {
    event.currentTarget.classList.toggle("checkmark-done")
    event.currentTarget.parentElement.querySelector("p").classList.toggle("done")
}

//Paragraph Function
const donePara = event => {
    event.currentTarget.classList.toggle("done")
    event.target.parentElement.querySelector(".checkmark").classList.toggle("checkmark-done")
}

//Clear completed 
const clearCompleted = document.querySelector("#clear-completed")
clearCompleted.addEventListener("click", () => {
    let currentItems = document.querySelectorAll(".todo__main-list-item")
    currentItems.forEach(item => {
        if(item.children[0].children[1].classList[1]){
            item.parentElement.removeChild(item)
        }
    })
    updateCounter();
})

//Overview Buttons at the bottom
const overviewBtns = document.querySelectorAll(".overview p")

overviewBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        //capture all ToDo Items
        let currentItems = document.querySelectorAll(".todo__main-list-item")
    
        //Change color of overview button
        overviewBtns.forEach(btn => btn.classList.remove("overview-active"))
        event.currentTarget.classList.add("overview-active")

        //Arrange item list
        if (event.currentTarget.classList[0] === "active"){
            currentItems.forEach(item => {
                item.classList.remove("none");
                if(item.querySelector(".todo__main-list-item-checkbox").querySelector(".checkmark").classList[1]){
                    item.classList.add("none") 
                }
            })
            updateCounter()
        } else if (event.currentTarget.classList[0] === "completed"){
            currentItems.forEach(item => {
                item.classList.remove("none");
                if(!item.querySelector(".todo__main-list-item-checkbox").querySelector(".checkmark").classList[1]){
                    item.classList.add("none") 
                }
            })
            updateCounter()
        } else {
            currentItems.forEach(item => {
                item.classList.remove("none");
            })
            updateCounter()
        }
        
    })
})

//Light/Dark Switch
const switchBtn = document.querySelector(".todo__header-switch");
const bodyElem = document.querySelector("body")

const switchTheme = () => {
    let checkmarks = document.querySelectorAll(".checkmark img")

    if(switchBtn.getAttribute("src") === "./images/icon-moon.svg"){
        switchBtn.setAttribute("src", "./images/icon-sun.svg")
        bodyElem.setAttribute("theme", "dark")
        checkmarks.forEach(checkmark => {
            checkmark.setAttribute("src", "./images/icon-check-dark.svg")
        })
    } else {
        switchBtn.setAttribute("src", "./images/icon-moon.svg")
        bodyElem.removeAttribute("theme")
        checkmarks.forEach(checkmark => {
            checkmark.setAttribute("src", "./images/icon-check.svg")
        })
    }
}

switchBtn.addEventListener("click", switchTheme);


