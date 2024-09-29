//const makeHttpPostRequest = require('../makehttpcall');


async function clearSearch() {
    $('#pageno').val('');
  
    await searchrents(); 
}
async function searchrents(event) {
    //  debugger;
    if (event != undefined) {
        event.preventDefault();
        $('#pageno').val('');
    }

    var rentsearch = {
        UserId: localStorage.getItem('userId')
    };
 
    if ($('#pageno').val() !== '') {
        rentsearch.pageNumber = $('#pageno').val();
    }
    debugger;
    var result = await makeHttpPostRequest(baseurl + 'api/rentlist', rentsearch).catch(error => {
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

async function LoadRents() {
    var requestbody = {
        UserId: localStorage.getItem('userId')
    };

    var result = await makeHttpPostRequest(baseurl + 'api/rentlist', requestbody).catch(error => {
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
    $('#lstrents').empty();
    var renthtml = `<table class='table table-hover table-striped table-bordered'>
    <tr>
        <td scope="col"><b>Tenant</b></td>
        <td scope="col"><b>Amount</b></td>
        <td scope="col"><b>Date</b></td>
        <td></td>        
    </tr>`;

    for (var i = 0; i < data.rents.length; i++) {
        var rent = data.rents[i];
        var rentrow = `<tr>
                    <td>${rent.tenant}</td>
                    <td>${rent.amount}</td>
                    <td>${rent.date}</td>
                    <td><a href="/html/rents/addrent.html?id=${rent.id}">Edit</a> 
                    <button class="btn " onclick='Deleterent("${rent.id}")'>Delete</button></td>
                    
                    </tr>`;
        renthtml += rentrow;
    }
    $('#lstrents').append(renthtml + '</table>');

    bindPagination(data);
}

async function Deleterent(id){
    if(!confirm('are u sure?'))
        return;
    
    var requestbody = {
        Id: id
    };
    var result = await makeHttpPostRequest(baseurl + 'api/deleterent', requestbody).catch(error => {
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

    var numberofpages = Math.ceil(data.rentSearch.totalRecords / 10);

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
    await searchrents();
}

function printStatus(status) {
    switch (status) {
        case 0: return 'Pending';
        case 1: return 'In Progress';
        case 2: return 'Completed';
        default: return ''
    }
}

function printPriority(priority) {
    switch (priority) {
        case 0: return 'High';
        case 1: return 'Medium';
        case 2: return 'Low';
        default: return ''
    }
}

//module.exports = searchrents;
