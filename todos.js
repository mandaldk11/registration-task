showTask();
let addTaskInput = document.getElementById("floatingTextarea2");
let addTaskBtn = document.getElementById("addBtn");

addTaskBtn.addEventListener("click", () => {
    inputVal = addTaskInput.value;
    if (inputVal.trim() != 0) {
        let webtask = localStorage.getItem("localtask");
        if (webtask == null) {
            taskObj = [];
        } else {
            taskObj = JSON.parse(webtask);
        }
        taskObj.push(inputVal);
        addTaskInput.value = "";
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        sessionStorage.setItem("sessionTask", JSON.stringify(taskObj));
    }


    showTask();

});

// show task functionality --

function showTask() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webtask);
    }
    let cardHtml = "";
    let addTaskList = document.getElementById("taskCard");
    taskObj.forEach((item, index) => {
        cardHtml += `
        <tr>
        <th scope='row' class='mx-4'>${index + 1}. </th>
        <td >
          ${item}
        </td>
       <td> <button type="button" class="btn btn-success mx-2 my-2"style="width: 5rem" onclick="editTask(${index})"> <i class="fa-solid fa-pen-to-square"></i>Edit</button></td>
       <td> <button type="button" class="btn btn-danger mx-2 my-2"style="width: 5rem" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i>Delete</button></td>
      </tr> 

      `;
        addTaskList.innerHTML = cardHtml;
    });
}

// edit your task--

function editTask(index) {
    let saveIndex = document.getElementById("saveIndex");
    let addTaskBtn = document.getElementById("addBtn");
    let saveTaskBtn = document.getElementById("saveBtn");
    saveIndex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    addTaskInput.value = taskObj[index];
    addTaskBtn.style.display = "none";
    saveTaskBtn.style.display = "inline";
}

// save task button--
let saveTaskBtn = document.getElementById("saveBtn");

saveTaskBtn.addEventListener("click", () => {
    let addTaskBtn = document.getElementById("addBtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    let saveIndex = document.getElementById("saveIndex").value;
    addTaskBtn.style.display = "inline";
    saveTaskBtn.style.display = "none";
    taskObj[saveIndex] = addTaskInput.value;
    addTaskInput.value = "";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    sessionStorage.setItem("sessionTask", JSON.stringify(taskObj));
    showTask();
});

// delete particular items--

function deleteTask(index) {
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    sessionStorage.setItem("sessionTask", JSON.stringify(taskObj));
    let addTaskList = document.getElementById("taskCard");
    addTaskList.innerHTML = "";
    addTaskInput.value = "";
    showTask();
}

// delete all at once--

let deleteAll = document.getElementById("delBtn");
deleteAll.addEventListener("click", () => {
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    if (webtask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webtask);
        taskObj = [];
        document.cookie = "todo_data=;expires=Thu, 18 Dec 2013 12:00:00 UTC"
    }
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    sessionStorage.setItem("sessionTask", JSON.stringify(taskObj));
    addTaskInput.value = "";
    let addTaskList = document.getElementById("taskCard");
    addTaskList.innerHTML = "";

    showTask();
});


// search functionality ---

let searchBox = document.getElementById('searchInput');
searchBox.addEventListener('input', () => {
    let trList = document.querySelectorAll('tr');
    Array.from(trList).forEach((item) => {
        console.log(item);
        let searchTxt = item.getElementsByTagName('td')[0].innerText;
        console.log(searchTxt)
        let searchBoxVal = searchBox.value;
        let re = new RegExp(searchBoxVal, 'gi');
        if (searchTxt.match(re)) {
            item.style.display = 'table-row'
        } else {
            item.style.display = 'none'
        }
    })

});

// logout and redirect to login page ----
let logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', () => {
    // document.cookie = "todo_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    document.cookie = "userMobileNo=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    document.cookie = "userPass=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    setTimeout(() => {
        location.href = "login.html"
    }, 0);

});

//get value of cookies cookies --

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let todoList = getCookie("todo_data");

taskObj.push({
    task: addTaskInput.value
})
let dataStr = JSON.stringify(taskObj);
document.cookie = `todo_data=${dataStr}`

