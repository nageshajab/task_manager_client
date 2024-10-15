//const makeHttpPostRequest = require('../makehttpcall');

async function clearSearch() {
    $('#pageno').val('');
    await searchsugarreadings();
}
async function searchsugarreadings(event) {
    //  debugger;
    if (event != undefined) {
        event.preventDefault();
        $('#pageno').val('');
    }

    var sugarreadingsearch = {
        UserId: localStorage.getItem('userId')
    };

    if ($('#pageno').val() !== '') {
        sugarreadingsearch.pageNumber = $('#pageno').val();
    }
    debugger;
    var result = await makeHttpPostRequest(baseurl + 'api/sugarreadinglist', sugarreadingsearch).catch(error => {
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

async function LoadSugarReadings(param) {
    var requestbody = {
        UserId: localStorage.getItem('userId')
        //email: document.getElementById('email').value,
        //PasswordHash: document.getElementById('pwd').value
    };
    $('#pageno').val('1');
    var result = await makeHttpPostRequest(baseurl + 'api/sugarreadinglist', requestbody).catch(error => {
        console.error(error);
    }).then(data => {
        //debugger;
        if (data != undefined) {
            console.log(JSON.stringify(data));
            if (!param)
                Binddata(data);
            else{
                BindDataForGraph(data);
            }
        } else {
            alert('no data found');
        }
    });

}

async function Binddata(data) {
    debugger;
    $('#lstsugarreadings').empty();
    var sugarreadinghtml = `<table class='table table-hover table-striped table-bordered'>
    <tr>
        <td scope="col"><b>Fasting</b></td>
        <td scope="col"><b>PP</b></td>
        <td scope="col"><b>Date</b></td>
        <td scope="col"><b>Weight</b></td>
        <td scope="col"><b>Medicines</b></td>
        <td></td>        
    </tr>`;
   
    $('#totalrecords').val(data.sugarReadingSearch.totalRecords);

    for (var i = 0; i < data.listOfSugarReadings.length; i++) {
        var sugarreading = data.listOfSugarReadings[i];
        var sugarreadingrow = `<tr>
                    <td>${sugarreading.fasting}</td>
                    <td>${sugarreading.pp}</td>
                    <td>${sugarreading.date}</td>
                    <td>${sugarreading.weight}</td>
                    <td>${sugarreading.medicines}</td>
                    <td><a href="/html/sugarreadings/addsugarreading.html?id=${sugarreading.id}">Edit</a> 
                    <button class="btn " onclick='Deletesugarreading("${sugarreading.id}")'>Delete</button></td>
                    
                    </tr>`;
        sugarreadinghtml += sugarreadingrow;
    }
    $('#lstsugarreadings').append(sugarreadinghtml + '</table>');

    bindPagination(data);
}

async function Deletesugarreading(id) {
    if (!confirm('are u sure?'))
        return;

    var requestbody = {
        Id: id
    };
    var result = await makeHttpPostRequest(baseurl + 'api/deletesugarreading', requestbody).catch(error => {
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
    await searchsugarreadings();
}


//module.exports = searchsugarreadings;
