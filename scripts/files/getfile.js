//const getUrlVars = require('../geturlvars');

async function getfile(event) {
    if (event != undefined) {
        event.preventDefault();
    }
    var task = {
        Id: getUrlVars()['id']
    };
  
    var result = await makeHttpPostRequest(baseurl + 'api/getfile', task).catch(error => {
        console.error(error);
    }).then(data => {
        if (data != undefined) {

            $('#id').val(data.id);
            $('#name').val(data.name);
            $('#description').val(data.description);
            bindtags(data.tags);
            $('#parentfolder').val(data.parentFolder);
            $('#googledrivepath').val(data.googleDrivePath);
            $('#azurepath').val(data.azurePath);
        } else {
            alert('Failed to get file details');
        }
    });
}

function bindtags(tags) {
    debugger;
    if (tags) {
        for (var i = 0; i < tags.length; i++) {
            $(`input[type=checkbox][value='${tags[i].trim() }']`).prop("checked", true);
        }
    }
}
//module.exports = gettask;
async function gettagsfromdatabase() {
    var filesearch = {
        UserId: localStorage.getItem('userId')
    };

    try {
        var result = await makeHttpPostRequest(baseurl + 'api/taglist', filesearch).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                console.log(JSON.stringify(data));

                $('#tagsfromdb').empty();
                var taghtml = '';
                for (var i = 0; i < data.length; i++) {
                    taghtml += `&nbsp;<input type=checkbox value="${data[i]}" />&nbsp; ${data[i]}`;
                }
                $('#tagsfromdb').append(taghtml);

            } else {
                alert('Failed to get file details');
            }
        });
    } catch (error) {
        console.error(error);
    }
}
