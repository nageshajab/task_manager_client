//const makeHttpPostRequest = require('../makehttpcall');


async function clearSearch() {
    $('#pageno').val('');
    $('#Status').val('None');
    $('#DueFromDate').val('');
    $('#DueToDate').val('');
    await searchtasks(); 
}
async function searchtasks(event) {
    //  debugger;
    if (event != undefined) {
        event.preventDefault();
        $('#pageno').val('');
    }

    var tasksearch = {
        UserId: localStorage.getItem('userId')
    };
    if ($('#Status').val() != 'None') {
        tasksearch.Status = $('#Status').val();
    }
    if ($('#DueFromDate').val() != '') {
        tasksearch.DueFromDate = $('#DueFromDate').val();
    }
    if ($('#DueToDate').val() != '') {
        tasksearch.DueToDate = $('#DueToDate').val();
    }
    if ($('#pageno').val() !== '') {
        tasksearch.pageNumber = $('#pageno').val();
    }
    debugger;
    var result = await makeHttpPostRequest(baseurl + 'api/tasklist', tasksearch).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
            Binddata(data);
        } else {
            alert(data);
            clearform();
        }
    });
    console.log(JSON.stringify(result));
}

async function LoadTasks() {
    var requestbody = {
        UserId: localStorage.getItem('userId')
        //email: document.getElementById('email').value,
        //PasswordHash: document.getElementById('pwd').value
    };

    var result = await makeHttpPostRequest(baseurl + 'api/tasklist', requestbody).catch(error => {
        console.error(error);
    }).then(data => {
        //debugger;
        if (data != undefined) {
            console.log(JSON.stringify(data));
            Binddata(data);
        } else {
            alert('no data found');
        }
    });
    
}

async function Binddata(data) {
    $('#lstTasks').empty();
    var taskhtml = `<table class='table table-hover table-striped table-bordered'>
    <tr>
        <td scope="col"><b>Title</b></td>
        <td scope="col"><b>Description</b></td>
        <td scope="col"><b>Due Date</b></td>
        <td scope="col"><b>Priority</b></td>
        <td scope="col"><b>Status</b></td>
        <td></td>        
    </tr>`;

    for (var i = 0; i < data.listOfTasks.length; i++) {
        var task = data.listOfTasks[i];
        var taskrow = `<tr>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.dueDate}</td>
                    <td>${printPriority(task.priority)}</td>
                    <td>${printStatus(task.status)}</td>
                    <td><a href="/addtask.html?id=${task.id}">Edit</a> 
                    <button class="btn " onclick='DeleteTask("${task.id}")'>Delete</button></td>
                    
                    </tr>`;
        taskhtml += taskrow;
    }
    $('#lstTasks').append(taskhtml + '</table>');

    bindPagination(data);
}

async function DeleteTask(id){
    if(!confirm('are u sure?'))
        return;
    
    var requestbody = {
        Id: id
    };
    var result = await makeHttpPostRequest(baseurl + 'api/deletetask', requestbody).catch(error => {
        console.error(error);
    }).then(data => {
//        debugger;
        if (data != undefined) {
            clearSearch();
        } else {
            alert('something went wrong');
        }
    });
}

function bindPagination(data) {
 //   debugger;

    var numberofpages = Math.ceil(data.taskSearch.totalRecords / 10);

    $('#pagination').empty();

    var link = `<button onclick=Binddatabypagenumber(1)> First</button> `;
    $('#pagination').append(link);

    for (var i = 0; i < numberofpages; i++) {
        var link = `<button onclick=Binddatabypagenumber(${i + 1})> ${i + 1}</button> `;
        $('#pagination').append(link);
    }
    var link = `<button onclick=Binddatabypagenumber(${numberofpages})> Last</button> `;
    $('#pagination').append(link);
}

async function Binddatabypagenumber(pgno) {
    $('#pageno').val(pgno);
    await searchtasks();
}

function printStatus(status) {
    switch (status) {
        case 0: return 'Pending';
        case 1: return 'In Progress';
        case 2: return 'Completed';
        default: return ''
    }
}

function printPriority(priority) {
    switch (priority) {
        case 0: return 'High';
        case 1: return 'Medium';
        case 2: return 'Low';
        default: return ''
    }
}

//module.exports = searchtasks;