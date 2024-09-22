async function gettask(event) {
    //  debugger;
    if (event != undefined) {
        event.preventDefault();
    }
    var id = {
        id: getUrlVars()['id']
    };

    debugger;
    var result = await makeHttpPostRequest(baseurl + 'api/gettask', id).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
            $('#title').val(data.title);
            $('#description').val(data.description);
            $('#duedate').val(data.dueDate);
            $('#priority').val(data.priority);
            $('#status').val(data.status);
        } else {
            alert('task not found');
        }
    });
    console.log(JSON.stringify(result));
}