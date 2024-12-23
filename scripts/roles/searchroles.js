//const makeHttpPostRequest = require('../makehttpcall');

async function clearSearch() {
    $('#pageno').val('');
       await searchroles(); 
}
async function searchroles(event) {
    if (event != undefined) {
        event.preventDefault();
        $('#pageno').val('');
    }

    var userId = localStorage.getItem('userId');
    var pageNumber = $('#pageno').val() !== '' ? $('#pageno').val() : 1;

    var url = `${baseurl}api/rolelist?UserId=${userId}&pageNumber=${pageNumber}`;

    try {
        var result = await makeHttpGetRequest(url);
        if (result != undefined && result.length > 0) {
            Binddata(result);
        } else {
            alert('No data found');
            clearform();
        }
    } catch (error) {
        alert('Error searching roles');
        console.error(error);
    }
    console.log(JSON.stringify(result));
}

async function LoadRoles() {
    var requestbody = {
        //UserId: localStorage.getItem('userId')
    };

    var result = await makeHttpPostRequest(baseurl + 'api/rolelist', requestbody).catch(error => {
        console.error(error);
    }).then(data => {
        //debugger;
        if (data != undefined) {
            Binddata(data);
        } else {
            alert('no data found');
        }
    });
    console.log(JSON.stringify(result));
}

async function Binddata(data) {
    $('#lstRoles').empty();
    var rolehtml = `<table class='table table-hover table-striped table-bordered'>
    <tr>
        <td scope="col"><b>Name</b></td>
        <td></td>        
    </tr>`;

    $('#totalrecords').val(data.taskSearch.totalRecords);
    
    for (var i = 0; i < data.length; i++) {
        var role = data[i];
        var rolerow = `<tr>
                    <td>${role.name}</td>
                    <td></td>                    
                    </tr>`;
        rolehtml += rolerow;
    }
    $('#lstRoles').append(rolehtml + '</table>');

    bindPagination(data);
}

async function Binddatabypagenumber(pgno) {
    $('#pageno').val(pgno);
    await searchroles();
}

//module.exports = searchroles;
