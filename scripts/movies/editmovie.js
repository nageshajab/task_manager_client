async function getmovie(event) {
    //  debugger;
    if (event != undefined) {
        event.preventDefault();
    }
    var id = {
        id: getUrlVars()['id']
    };

    debugger;
    var result = await makeHttpPostRequest(baseurl + 'api/getmovie', id).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
           
            $('#name').val(data.name);
            $('#genre').val(data.genre);
            $('#rating').val(data.rating);
            $('#description').val(data.description);
            $('#language').val(data.language);
            $('#actors').val(data.actors);
        } else {
            alert('movie not found');
        }
    });
    console.log(JSON.stringify(result));
}