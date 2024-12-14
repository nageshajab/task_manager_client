async function ShowPendingRents() {
    var requestbody = {
        UserId: localStorage.getItem('userId')
    };

    var result = await makeHttpPostRequest(baseurl + 'api/tenantlist', requestbody).catch(error => {
        console.error(error);
    }).then(data => {
        //debugger;
        if (data != undefined) {
            console.log(JSON.stringify(data));
            if (data.tenants.length > 0) {
                Binddata(data);
            }
        } else {
            alert('no data found');
        }
    });
}