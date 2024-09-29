//const getUrlVars = require('../geturlvars');

async function getsugarreading(event) {
    if (event != undefined) {
        event.preventDefault();
    }
    debugger;
    var sugarreading = {
        Id: getUrlVars()['id']
    };

    var result = await makeHttpPostRequest(baseurl + 'api/getsugarreading', sugarreading).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
           
            $('#fasting').val(data.fasting);
            $('#pp').val(data.pp);
            $('#date').val(data.date);
            $('#weight').val(data.weight);
            $('#medicines').val(data.medicines);

        } else {
            alert('Failed to update sugarreading');
        }
    });

    console.log(JSON.stringify(result));
}

//module.exports = getsugarreading;
