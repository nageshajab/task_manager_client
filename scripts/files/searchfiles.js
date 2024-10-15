async function clearSearch() {
    $('#pageno').val('');
    $('input[type=checkbox]').each(function () {
       this.checked=false;
    });
    await searchfiles();
}

async function searchfiles(event) {
    if (event != undefined) {
        event.preventDefault();
        $('#pageno').val('');
    }
    var filesearch = {
        UserId: localStorage.getItem('userId')
    };

    if ($('#pageno').val() !== '') {
        filesearch.pageNumber = $('#pageno').val() !== '' ? $('#pageno').val() : 1;
    }
    //read selected tags
    var taglist = "";
    $('input[type=checkbox]').each(function () {
        if (this.checked) {
            taglist += $(this).val() + ",";
        }
        //taglist += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
    });
    filesearch.tags = taglist.split(',');

    var url = `${baseurl}api/filelist?UserId=${filesearch.UserId}&pageNumber=${filesearch.pageNumber}`;

    try {
        var result = await makeHttpPostRequest(url, filesearch).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                Binddata(data);

                console.log(JSON.stringify(data));

            } else {
                alert('No data found');
                clearform();
            }
        });
    } catch (error) {
        alert('Error searching movies');
        console.error(error);
    }

}

function clearform() {
    $('input[type=checkbox]').each(function () {
        this.checked = false;
    });
}

async function LoadFiles() {
    //  debugger;
    var requestbody = {
        UserId: localStorage.getItem('userId')
        //email: document.getElementById('email').value,
        //PasswordHash: document.getElementById('pwd').value
    };
    $('#pageno').val('1');
    var result = await makeHttpPostRequest(baseurl + 'api/filelist', requestbody).catch(error => {
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

async function Binddata(data) {
    // debugger;
    $('#lstFiles').empty();
    if (data.listOfFiles != undefined) {
        var filehtml = `<table class='table table-hover table-striped table-bordered'>
    <tr>
        <td scope="col"><b>Name</b></td>
        <td scope="col"><b>Description</b></td>
        <td scope="col"><b>Tags</b></td>
        <td scope="col"><b>ParentFolder</b></td>        
        <td scope="col"><b>GoogleDrivePath</b></td>
        <td scope="col"><b>AzurePath</b></td>
        <td></td>        
    </tr>`;
    
   
    $('#totalrecords').val(data.fileSearch.totalRecords);

        for (var i = 0; i < data.listOfFiles.length; i++) {
            var file = data.listOfFiles[i];
            var filerow = `<tr>
                    <td>${file.name}</td>
                    <td>${file.description}</td>
                    <td>${file.tags}</td>
                    <td>${file.parentFolder}</td>                   
                    <td><a href="${file.googleDrivePath}" target="_blank">Open</a></td>
                    <td><a href="${file.azurePath}" target="_blank">Open</a></td>
                    <td><a href="/html/files/addfile.html?id=${file.id}">Edit</a> 
                    <button class="btn " onclick='Deletefile("${file.id}")'>Delete</button></td>
                    
                    </tr>`;
            filehtml += filerow;
        }

        $('#lstFiles').append(filehtml + '</table>');

        bindPagination(data);

        $('#tagsfromdb').empty();
        var taghtml = '';
        for (var i = 0; i < data.tags.length; i++) {
            taghtml += `&nbsp;<input type=checkbox value="${data.tags[i]}" />&nbsp; ${data.tags[i]}`;
        }
        $('#tagsfromdb').append(taghtml);

        if (data.fileSearch.tags) {
            for (var i = 0; i < data.fileSearch.tags.length; i++) {
                $(`input[type=checkbox][value='${data.fileSearch.tags[i]}']`).prop("checked", true);
            }
        }
    }
}

async function Deletefile(id) {
    if (!confirm('are u sure?'))
        return;

    var requestbody = {
        Id: id
    };
    var result = await makeHttpPostRequest(baseurl + 'api/deletefile', requestbody).catch(error => {
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
    await searchfiles();
}


//module.exports = searchmovies;
