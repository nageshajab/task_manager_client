async function editfile(event) {
    debugger;
    if (event != undefined) {
        event.preventDefault();
    }

    var file = {
        Id: $('#id').val(),
        Name: $('#name').val(),
        Description: $('#description').val(),
        Tags: $('#tags').val(),
        ParentFolder: $('#parentfolder').val(),        
        GoogleDrivePath: $('#googledrivepath').val(),
        AzurePath: $('#azurepath').val(),
        UserId: localStorage.getItem('userId')
    };

    try {
        const result = await makeHttpPostRequest(baseurl + 'api/updatefile', file);
        alert('updated successfully');
        window.location.href = '/files.html';
        console.log(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        alert(error);
        clearform();
    }
}

//module.exports = editmovie;
