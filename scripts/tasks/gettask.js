//const getUrlVars = require('../geturlvars');

async function gettask(event) {
    if (event != undefined) {
        event.preventDefault();
    }
    debugger;
    var task = {
        Id: getUrlVars()['id']
    };

    var result = await makeHttpPostRequest(baseurl + 'api/gettask', task).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
            let text = data.dueDate;
            if (text != undefined) {
                const myArray = text.split("-");
                var year = myArray[0];
                var month = myArray[1];
                var day = myArray[2].split('T')[0];
                $('#duedate').val('' + year + '-' + month + '-' + day + '');
            }
            $('#title').val(data.title);
            $('#description').val(data.description);
            // $('#duedate').val(data.dueDate);
            $('#priority').val(data.priority);
            $('#status').val(data.status);

        } else {
            alert('Failed to update task');
        }
    });

    console.log(JSON.stringify(result));
}

//module.exports = gettask;
