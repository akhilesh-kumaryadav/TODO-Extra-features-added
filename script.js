(function(){
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add-task');
    const taskCounter = document.getElementById('task-counter');

    function showNotification(text){
        alert(text);
    }

    function addTaskToDOM(task){
        const li = document.createElement('li');
        li.setAttribute('id', 'one-task-list');
        li.innerHTML = `
            <div id="check-box"><input type="checkbox" class="custom-checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}></div>
            <div id="main-detail-of-task">
                <div id="task-detail"><p>${task.title}</p></div>
                <div id="task-deadline-date">
                    <i class="fa-solid fa-calendar-days"></i>
                    <p id="deadline">${task.deadline}</p>
                </div>
            </div>
            <div id="task-type"><div class="${task.backcolor}">${task.category}</div></div>
        `;

        tasksList.append(li);
    }

    function renderList(){
        tasksList.innerHTML = '';

        for(var i = 0 ; i < tasks.length ; i++){
            addTaskToDOM(tasks[i]);
        }

        taskCounter.innerHTML = tasks.length;
    }

    function markTaskCompleted(taskId){
        const task = tasks.filter(function(task){
            return task.id == taskId;
        });

        if(task.length > 0){
            const currentTask = task[0];

            currentTask.completed = !currentTask.completed;
            renderList();
            // showNotification("Task Toggled Successfully");
            return;
        }

        showNotification("Task Toggling was Unsuccessful");
        return;
    }

    function deleteAllCompletedTasks(){
        const newTasks = tasks.filter(function(task){
            return task.completed == false;
        });

        if(newTasks.length != tasks.length){
            tasks = newTasks;
            renderList();
            // showNotification("Task deleted successfully");   
            return;
        }

        showNotification("Select the Task to be deleted first")
    }

    function addTask(task){
        if(task){
            tasks.push(task);
            renderList();
            // showNotification("Task added successfully");
            return;
        }

        showNotification("ERROR !!! Task cannot be added");
        return;
    }

    function formatedDate(dl){
        let year = dl.slice(0, 4);
        let month = dl.slice(5, 7);
        let day = dl.slice(8, 10);

        switch(month){
            case "01" : month = "JANUARY"; break;
            case "02" : month = "FEBUARY"; break;
            case "03" : month = "MARCH"; break;
            case "04" : month = "APRIL"; break;
            case "05" : month = "MAY"; break;
            case "06" : month = "JUNE"; break;
            case "07" : month = "JULY"; break;
            case "08" : month = "AUGUST"; break;
            case "09" : month = "SEPTEMBER"; break;
            case "10" : month = "OCTOBER"; break;
            case "11" : month = "NOVEMBER"; break;
            case "12" : month = "DECEMBER"; break;
        }

        return month + " " + day + ", " + year;
    }

    function addTaskByProperWay(){
        const taskInput = document.getElementById('add');
        const category = document.getElementById('select-drop-down');
        const deadline = document.getElementById('task-date');

        const text = taskInput.value;

        let cate = category.value;
        if(cate == "ChooseACategory")
            cate = '';

        let dl = deadline.value;
        if(dl == '')
            dl = "NO DEADLINE";
        else{
            dl = formatedDate(dl);
        }
        

        if(!text){
            showNotification("Task cannot be empty");
            return;
        }

        const task = {
            title : text,
            id : Date.now().toString(),
            deadline : dl,
            category : cate,
            backcolor : cate,
            completed : false
        }

        category.value = "Choose a Category";
        deadline.value = '';
        taskInput.value = '';
        addTask(task);
    }

    function handleClickEvent(e){
        const tar = e.target;

        if(tar.className == "add-task"){
            addTaskByProperWay();
            return;
        }
        else if(tar.className == "delete-task"){
            deleteAllCompletedTasks();
            return;
        }
        else if(tar.className == "custom-checkbox"){
            const taskId = tar.id;
            markTaskCompleted(taskId);
            return;
        }
    }

    function startOurProject(){
        document.addEventListener('click', handleClickEvent);
    }

    startOurProject();
})();