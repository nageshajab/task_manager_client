const getUrlVars = require('../geturlvars');

async function edittask(event) {
    if (event != undefined) {
        event.preventDefault();
    }

    var task = {
        Id: $('#taskId').val(),
        Title: $('#title').val(),
        Description: $('#description').val(),
        UserId: localStorage.getItem('userId'),
        DueDate: $('#duedate').val(),
        Priority: $('#priority').val(),
        Status: $('#status').val()
    };

    var result = await makeHttpPostRequest(baseurl + 'api/updatetask', task).catch(error => {
        console.error(error);
    }).then(data => {
        if (data != undefined) {
            alert('updated successfully');
            window.location.href = '/tasks.html';
        } else {
            alert('Failed to update task');
        }
    });

    console.log(JSON.stringify(result));
}

//module.exports = edittask;
