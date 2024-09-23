async function addmovie(event) {
     debugger;
    if (event != undefined) {
        event.preventDefault();
    }

    var movie = {
        Name: $('#name').val(),
        Genre: $('#genre').val(),
        Rating: $('#rating').val(),
        Description: $('#description').val(),
        Language: $('#language').val(),
        Actors: $('#actors').val(),
        UserId: localStorage.getItem('userId')
    };

    if (getUrlVars()['id'] != undefined) {
       
        movie.Id = getUrlVars()['id'];
        var result = await makeHttpPostRequest(baseurl + 'api/updatemovie', movie).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('updated successfully');
                window.location.href = '/movies.html';
            } else {
                alert(data);
                clearform();
            }
        });
    } else { 
        var result = await makeHttpPostRequest(baseurl + 'api/addmovie', movie).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('added successfully');
                window.location.href = '/movies.html';
            } else {
                alert(data);
                clearform();
            }
        });
    }
    console.log(JSON.stringify(result));
}