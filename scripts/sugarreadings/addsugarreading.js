//const getUrlVars = require('../geturlvars');

async function clearform() {
    $('#fasting').val('');
    $('#pp').val('');
    $('#date').val('');
    $('#weight').val('');
    $('#medicines').val('');
}

async function addsugarreading(event) {
    debugger;
    if (event != undefined) {
        event.preventDefault();
    }

    var sugarreading = {
        Fasting: $('#fasting').val(),
        PP: $('#pp').val(),
        UserId: localStorage.getItem('userId'),
        Date: $('#date').val(),
        Weight: $('#weight').val(),
        Medicines: $('#medicines').val().split(',')
    };
    
    if (sugarreading.Weight == "")
        sugarreading.Weight = 0;
    debugger;

    if (getUrlVars()['id'] != undefined) {

        sugarreading.Id = getUrlVars()['id'];
        var result = await makeHttpPostRequest(baseurl + 'api/updatesugarreading', sugarreading).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('updated successfully');
                window.location.href = '/html/sugarreadings/sugarreadings.html';
            } else {
                alert(data);
                clearform();
            }
        });
    } else {
        var result = await makeHttpPostRequest(baseurl + 'api/addsugarreading', sugarreading).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('added successfully');
                window.location.href = '/html/sugarreadings/sugarreadings.html';
            } else {
                alert(data);
                clearform();
            }
        });
    }
    console.log(JSON.stringify(result));
}

//module.exports = addsugarreading;
