//const getUrlVars = require('../geturlvars');

async function addtask(event) {
    debugger;
    $('#progressbar').show();
    if (event != undefined) {
        event.preventDefault();
    }

    var task = {
        Title: $('#title').val(),
        Description: $('#description').val(),
        UserId: localStorage.getItem('userId'),
        DueDate: $('#duedate').val(),
        Priority: $('#priority').val(),
        Status: $('#status').val(),
        RepeatType: $("#repeat").val(),
        Enddate: $("#enddate").val(),
        Type: $("#type").val(),
        SubType: $("#subtype").val()
    };

    if (getUrlVars()['id'] != undefined) {

        task.Id = getUrlVars()['id'];
        var result = await makeHttpPostRequest(baseurl + 'api/updatetask', task).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('updated successfully');
                window.location.href = '/html/tasks/tasks.html';
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
                window.location.href = '/html/tasks/tasks.html';
            } else {
                alert(data);
                clearform();
            }
        });
    }
    console.log(JSON.stringify(result));
    $('#progressbar').hide();
}

$('#type').on('change', function () {

    var type = $('#type').find(":selected").val();

    if (type == 'vehicle') {
        $('#subtype').empty();

        $('#subtype').append('<option selected="selected" value="swift">swift</option>');
        $('#subtype').append('<option value="chetak">chetak</option>');
        $('#subtype').append('<option value="avenger">avenger</option>');
    }
    else if (type == 'other') {
        $('#subtype').empty();
        $('#subtype').append('<option selected="selected" value="other">other</option>');
    }
});

async function updatetaskfrompopup(event) {
    debugger;
    $('#progressbar').show();
    if (event != undefined) {
        event.preventDefault();
    }

    var task = {
        id: $('#todoid').val(),
        Status: $('#todostatus').val(),
    };

    task.Id = getUrlVars()['id'];
    var result = await makeHttpPostRequest(baseurl + 'api/updatetaskstatus', task).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
            alert('updated successfully');
            window.location.href = '/html/tasks/tasks.html';
        } else {
            alert(data);
            clearform();
        }
    });

    console.log(JSON.stringify(result));
    $('#progressbar').hide();
}