async function clearform() {
    $('#id').val('');
    $('#name').val('');
    $('#description').val('');
    $('#tags').val('');
    $('#parentfolder').val('');
    $('#googledrivepath').val('');
    $('#azurepath').val('');

    $('input[type=checkbox]').each(function () {
        this.checked = false;
    });
}

function readselectedtags() {
    debugger;
    var taglist = "";
    $('input[type=checkbox]').each(function () {
        if (this.checked) {
            taglist += $(this).val() + ",";
        }
        //taglist += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
    });
    taglist = taglist + $('#tags').val();
    return taglist.split(',');
}

async function addfile(event) {
    debugger;
    if (event != undefined) {
        event.preventDefault();
    }

    var file = {
        Name: $('#name').val(),
        Description: $('#description').val(),
        ParentFolder: $('#parentfolder').val(),
        GoogleDrivePath: $('#googledrivepath').val(),
        AzurePath: $('#azurepath').val(),
        UserId: localStorage.getItem('userId')
    };

    file.Tags=await readselectedtags();

    try {
        let result;
        if (getUrlVars()['id'] != undefined) {
            file.Id = getUrlVars()['id'];
            result = await makeHttpPostRequest(baseurl + 'api/updatefile', file);
            alert('updated successfully');
        } else {
            result = await makeHttpPostRequest(baseurl + 'api/addfile', file);
            alert('added successfully');
        }
        window.location.href = '/html/files/files.html';
        console.log(JSON.stringify(result)); // Ensure result is logged here
    } catch (error) {
        console.error(error);
        alert(error);
        clearform();
    }
}

//module.exports = addmovie;
