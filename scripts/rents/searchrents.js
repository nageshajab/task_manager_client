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
    if ($('#duration').val() !== 'None') {
        var d = new Date();

        if ($('#duration').val() == 'Last Month') 
            tasksearch.DueFromDate = new Date(d.getFullYear(), d.getMonth() - 1, 1);        
        else if ($('#duration').val() == 'This Month') 
            tasksearch.DueFromDate = new Date(d.getFullYear(), d.getMonth(), 1);
        
        var noofdays = diffinDays(tasksearch.DueFromDate);

        tasksearch.DueToDate = new Date(tasksearch.DueFromDate.getFullYear(), tasksearch.DueFromDate.getMonth(), noofdays);
    }

    if(tasksearch.DueFromDate!=undefined && tasksearch.DueFromDate!='')
        tasksearch.DueFromDate = dateToString(tasksearch.DueFromDate);
    if(tasksearch.DueToDate!=undefined && tasksearch.DueToDate!='')
        tasksearch.DueToDate = dateToString(tasksearch.DueToDate);

    var result = await makeHttpPostRequest(baseurl + 'api/tasklist', tasksearch).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
            Binddata(data);
        } else {
            alert(data);
            clearSearch();
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
    debugger;
    if ($('#duration').val() !== 'None') {
        var d = new Date();

        if ($('#duration').val() == 'Last Month') 
            requestbody.DueFromDate = new Date(d.getFullYear(), d.getMonth() - 1, 1);        
        else if ($('#duration').val() == 'This Month') 
            requestbody.DueFromDate = new Date(d.getFullYear(), d.getMonth(), 1);
        var noofdays = diffinDays(requestbody.DueFromDate);

        requestbody.DueToDate = new Date(requestbody.DueFromDate.getFullYear(), requestbody.DueFromDate.getMonth(), noofdays);
    }
    
    if(requestbody.DueFromDate!=undefined && requestbody.DueFromDate!='')
        requestbody.DueFromDate = dateToString(requestbody.DueFromDate);
    if(requestbody.DueToDate!=undefined && requestbody.DueToDate!='')
        requestbody.DueToDate = dateToString(requestbody.DueToDate);

    $('#pageno').val('1');
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

function settododetails(id, title, description, duedate, priority, status) {
    debugger;
    $('#todoid').val(id);
    $('#todotitle').text(title);
    $('#tododesc').text(description);
    var dt = dateToString(duedate, 'yyyy-mm-dd');
    $('#tododuedate').val(dt);
    $('#todopriority').val(priority);
    $('#todostatus').val(status);
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
    debugger;
    $('#totalrecords').val(data.taskSearch.totalRecords);

    for (var i = 0; i < data.listOfTasks.length; i++) {
        var task = data.listOfTasks[i];
        var taskrow = `<tr onclick="settododetails('${task.id}','${task.title}','${task.description}','${task.dueDate}','${task.priority}','${task.status}')" data-bs-toggle="modal" data-bs-target="#myModal">
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${dateToString(task.dueDate)}</td>
                    <td>${printPriority(task.priority)}</td>
                    <td>${printStatus(task.status)}</td>
                    <td><a href="/html/tasks/addtask.html?id=${task.id}">Edit</a> 
                    <button class="btn " onclick='DeleteTask("${task.id}")'>Delete</button></td>
                    
                    </tr>`;
        taskhtml += taskrow;
    }
    $('#lstTasks').append(taskhtml + '</table>');

    bindPagination(data);
}

async function DeleteTask(id) {
    if (!confirm('are u sure?'))
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

$('#duration').on('change', function () {
    searchtasks();
});
