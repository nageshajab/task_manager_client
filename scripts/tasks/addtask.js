const getUrlVars = require('../geturlvars');

async function addtask(event) {
     debugger;
    if (event != undefined) {
        event.preventDefault();
    }

    var task = {
        Title: $('#title').val(),
        Description: $('#description').val(),
        UserId: localStorage.getItem('userId'),
        DueDate: $('#duedate').val(),
        Priority: $('#priority').val(),
        Status: $('#status').val()
    };

    if (getUrlVars()['id'] != undefined) {
       
        task.Id = getUrlVars()['id'];
        var result = await makeHttpPostRequest(baseurl + 'api/updatetask', task).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('updated successfully');
                window.location.href = '/tasks.html';
            } else {
                alert(data);
                clearform();
            }
        });
    } else { 
        var result = await makeHttpPostRequest(baseurl + 'api/addtask', task).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('added successfully');
                window.location.href = '/tasks.html';
            } else {
                alert(data);
                clearform();
            }
        });
    }
    console.log(JSON.stringify(result));
}

//module.exports = addtask;