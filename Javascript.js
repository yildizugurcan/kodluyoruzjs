//Selectors
    const TASK_INPUT = document.querySelector(`#task`);
    const TASK_LIST = document.querySelector(`#list`);
    const TASK_LIST_ALL = document.querySelectorAll(`#list li`);
    const BUTTON_DOM = document.querySelector(`#liveToastBtn`);
    const TOAST_SUCCESS = document.querySelector(`.toast.success`);
    const TOAST_ERROR = document.querySelector(`.toast.error`);
    
//Variables
    const arrayTaskList = localStorage.getItem("Tasks") ? JSON.parse(localStorage.getItem("Tasks")): []


//Onload   
window.onload = function(){

    //Calling display function to show stored tasks.
    displayItems();

    // Trigger "EKLE" button on press ENTER.
    TASK_INPUT.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
        event.preventDefault();
        BUTTON_DOM.click();
        };
     });

};


//Handlers

    // Function to show stored tasks.
function displayItems(){

    for(var i = 0; i < arrayTaskList.length; i++){
        
        //create li element
        var liNode = document.createElement(`li`);

        // Create li value from the array
        var liNodeTxt = document.createTextNode(arrayTaskList[i]);

        // Assing li element to its parrent node (ul)
        TASK_LIST.appendChild(liNode);

        // Assing li value to inside li
        liNode.appendChild(liNodeTxt);

        // Add onclick function for  toggle checked class when click on li element.
        liNode.setAttribute(`onclick`,`addCheckedClass(event)`);

        //Create span element as a li child (DELETE TASK BUTTON)
        var spanNode = document.createElement(`span`)

        // Assing span element to its parrent node (li)
        liNode.appendChild(spanNode); 

        // Write delete icon to span`s inner text
        spanNode.innerHTML= "&times;";// delete button icon
        
        // Add close class to span nodes 
        spanNode.setAttribute(`class`,`close`);

        // Add Delete function to onclick attribute.
        spanNode.setAttribute(`onclick`,`deleteElement(event)`);

        }
};
    

    // Fuuction for add new task.
function newElement(){

    if(TASK_INPUT.value == null || TASK_INPUT.value.trim() =='' ){

        // Triger livetoast error.
        $(TOAST_ERROR).toast(`show`);

        // Add red background and white text color to live toast.
        TOAST_ERROR.classList.add(`bg-danger`,`text-light`)     //! this is an extra code.
        
        // Clear the input field.
         TASK_INPUT.value = ``;
    }else{
        // push the value to array
       arrayTaskList.push(TASK_INPUT.value);

       // Update the localstorage from array
       localStorage.setItem(`Tasks`, JSON.stringify(arrayTaskList))

        // Create li element
        var liNode = document.createElement(`li`);

        // Create li value with the value of task input
        var liNodeTxt = document.createTextNode(TASK_INPUT.value);

        // Assing li element to its parrent node (ul)
        TASK_LIST.appendChild(liNode);

        // Assing li value to inside li
        liNode.appendChild(liNodeTxt);

        // Add onclick function for  toggle checked class when click on li element.
        liNode.setAttribute(`onclick`,`addCheckedClass(event)`);
        
        // Create span element as a li`s child (DELETE TASK BUTTON)
        var spanNode = document.createElement(`span`)

        // Assing span element to its parrent node (li)
        liNode.appendChild(spanNode); 

        // Write delete icon to span`s inner text
        spanNode.innerHTML= "&times;";// delete button icon

        // Add close class to span`s class attribute 
        spanNode.setAttribute(`class`,`close`);

        // Add Delete delete function to span`s onclick attribute.
        spanNode.setAttribute(`onclick`,`deleteElement(event)`);


        // Triger livetoast success.
        $(TOAST_SUCCESS).toast(`show`);

        // Add green background and white text color to live toast.
        TOAST_SUCCESS.classList.add(`bg-success`, `text-light`)    //! this is an extra code.

        // Clear the input field.
        TASK_INPUT.value = ``;
    }
    
    
    };

    // Function for delete selected tasks
function deleteElement(event){

    // Get the node name when click on the element. 
    let node = event.target; 

    // Get the array index no from the node value 
    let arrayIndexOfNodeValue = arrayTaskList.indexOf(node.parentNode.childNodes[0].nodeValue);

    // Delete from array 
    arrayTaskList.splice(arrayIndexOfNodeValue, 1);

    // Update localstorage from array
    localStorage.setItem(`Tasks`,JSON.stringify(arrayTaskList));

    // Delete li element.
    node.parentNode.remove();   
};



//Events
    // Function for add checked class event
    function addCheckedClass(event){
        // Select clicked element node  
        let node = event.target;
        // Add checked to selected node`s classList
        node.classList.toggle(`checked`);
    };
