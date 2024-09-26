async function clearSearch(){
    $('#pageno').val('');
       await searchusers(); 
}

async function searchusers(event) {
    //  debugger;
    if (event != undefined) {
        event.preventDefault();
        $('#pageno').val('');
    }

    var usersearch = {
        //UserId: localStorage.getItem('userId')
    };
    if ($('#pageno').val() !== '') {
        usersearch.pageNumber = $('#pageno').val();
    }
    debugger;
    var result = await makeHttpPostRequest(baseurl + 'api/userlist', usersearch).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
            Binddata(data);
        } else {
            alert(data);
            clearform();
        }
    });
    console.log(JSON.stringify(result));
}

async function LoadUsers() {
    var requestbody = {
        //UserId: localStorage.getItem('userId')
    };

    var result = await makeHttpPostRequest(baseurl + 'api/userlist', requestbody).catch(error => {
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
    $('#lstUsers').empty();
    var userhtml = `<table class='table table-hover table-striped table-bordered'>
    <tr>
        <td scope="col"><b>Email</b></td>
        <td scope="col"><b>Roles</b></td>
        <td></td>        
    </tr>`;
debugger;
    for (var i = 0; i < data.length; i++) {
        var user = data[i];
        var userrow = `<tr>
                    <td>${user.email}</td>
                    <td>${user.roles}</td>
                    <td></td>                    
                    </tr>`;
        userhtml += userrow;
    }
    $('#lstUsers').append(userhtml + '</table>');

    bindPagination(data);
}

function bindPagination(data) {
 //   debugger;

    // var numberofpages = Math.ceil(data.taskSearch.totalRecords / 10);

    // $('#pagination').empty();

    // var link = `<button onclick=Binddatabypagenumber(1)> First</button> `;
    // $('#pagination').append(link);

    // for (var i = 0; i < numberofpages; i++) {
    //     var link = `<button onclick=Binddatabypagenumber(${i + 1})> ${i + 1}</button> `;
    //     $('#pagination').append(link);
    // }
    // var link = `<button onclick=Binddatabypagenumber(${numberofpages})> Last</button> `;
    // $('#pagination').append(link);
}

async function Binddatabypagenumber(pgno) {
    $('#pageno').val(pgno);
    await searchtasks();
}

//module.exports = searchusers;