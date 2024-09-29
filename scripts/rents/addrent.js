//const getUrlVars = require('../geturlvars');
async function clearform() {
    $('#tenant').val('');
    $('#amount').val('');
    $('#date').val('');
}

async function addrent(event) {
     debugger;
    if (event != undefined) {
        event.preventDefault();
    }

    var rent = {
        UserId: localStorage.getItem('userId'),
        Tenant: $('#tenant').val(),
        Amount: $('#amount').val(),
        Date: $('#date').val()
    };

    if (getUrlVars()['id'] != undefined) {
       
        rent.Id = getUrlVars()['id'];
        var result = await makeHttpPostRequest(baseurl + 'api/updaterent', rent).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('updated successfully');
                window.location.href = '/html/rents/rents.html';
            } else {
                alert(data);
                clearform();
            }
        });
    } else { 
        var result = await makeHttpPostRequest(baseurl + 'api/addrent', rent).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('added successfully');
                window.location.href = '/html/rents/rents.html';
            } else {
                alert(data);
                clearform();
            }
        });
    }
    console.log(JSON.stringify(result));
}

//module.exports = addrent;
