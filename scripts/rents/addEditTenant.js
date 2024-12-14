async function addtenant(event) {
    debugger;
    $('#progressbar').show();
    if (event != undefined) {
        event.preventDefault();
    }

    var tenant = {
        name: $('#tenantname').val(),
        rent: $('#rent').val(),
        UserId: localStorage.getItem('userId'),
        roomlocation: $('#roomlocation').val()
    };

    var result = await makeHttpPostRequest(baseurl + 'api/addtenant', tenant).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
            alert('added successfully');
            window.location.href = '/html/rents/tenants.html';
        } else {
            alert(data);
            clearform();
        }
    });

    console.log(JSON.stringify(result));
    $('#progressbar').hide();
}