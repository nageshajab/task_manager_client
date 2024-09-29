//const getUrlVars = require('../geturlvars');

async function getfile(event) {
    if (event != undefined) {
        event.preventDefault();
    }
    debugger;
    var task = {
        Id: getUrlVars()['id']
    };

    var result = await makeHttpPostRequest(baseurl + 'api/getfile', task).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
           
            $('#id').val(data.id);
            $('#name').val(data.name);
            $('#description').val(data.description);
            $('#tags').val(data.tags);
            $('#parentfolder').val(data.parentFolder);        
            $('#googledrivepath').val(data.googleDrivePath);
            $('#azurepath').val(data.azurePath);
        } else {
            alert('Failed to get file details');
        }
    });

    console.log(JSON.stringify(result));
}

//module.exports = gettask;
