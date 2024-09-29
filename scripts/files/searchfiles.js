async function clearSearch() {
    $('#pageno').val('');
    await searchfiles();
}
async function searchfiles(event) {
    if (event != undefined) {
        event.preventDefault();
        $('#pageno').val('');
    }

    var userId = localStorage.getItem('userId');
    var pageNumber = $('#pageno').val() !== '' ? $('#pageno').val() : 1;

    var url = `${baseurl}api/filelist?UserId=${userId}&pageNumber=${pageNumber}`;

    try {
        var result = await makeHttpGetRequest(url);
        if (result != undefined && result.length > 0) {
            Binddata(result);
        } else {
            alert('No data found');
            clearform();
        }
    } catch (error) {
        alert('Error searching movies');
        console.error(error);
    }
    console.log(JSON.stringify(result));
}

async function LoadFiles() {
  //  debugger;
    var requestbody = {
        UserId: localStorage.getItem('userId')
        //email: document.getElementById('email').value,
        //PasswordHash: document.getElementById('pwd').value
    };

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
     //   debugger;

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
            filehtml +=filerow;
        }

        $('#lstFiles').append(filehtml + '</table>');

        bindPagination(data);
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

function bindPagination(data) {
    //   debugger;

    var numberofpages = Math.ceil(data.fileSearch.totalRecords / 10);

    $('#pagination').empty();

    var link = `<button onclick=Binddatabypagenumber(1)> First</button> `;
    $('#pagination').append(link);

    for (var i = 0; i < numberofpages; i++) {
        var link = `<button onclick=Binddatabypagenumber(${i + 1})> ${i + 1}</button> `;
        $('#pagination').append(link);
    }
    var link = `<button onclick=Binddatabypagenumber(${numberofpages})> Last</button> `;
    $('#pagination').append(link);
}

async function Binddatabypagenumber(pgno) {
    $('#pageno').val(pgno);
    await searchfiles();
}

 
//module.exports = searchmovies;
