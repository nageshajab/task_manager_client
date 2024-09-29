//const getUrlVars = require('../geturlvars');

async function getrent(event) {
    if (event != undefined) {
        event.preventDefault();
    }
    debugger;
    var rent = {
        Id: getUrlVars()['id']
    };

    var result = await makeHttpPostRequest(baseurl + 'api/getrent', rent).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
            
            $('#tenant').val(data.tenant);
            $('#amount').val(data.amount);
            $('#date').val(data.date);
        } else {
            alert('Failed to update rent');
        }
    });

    console.log(JSON.stringify(result));
}

//module.exports = getrent;
