async function editmovie(event) {
    debugger;
    if (event != undefined) {
        event.preventDefault();
    }

    var movie = {
        Id: $('#id').val(),
        Name: $('#name').val(),
        Genre: $('#genre').val(),
        Rating: $('#rating').val(),
        Description: $('#description').val(),
        Language: $('#language').val(),
        Actors: $('#actors').val(),
        UserId: localStorage.getItem('userId')
    };

    try {
        const result = await makeHttpPostRequest(baseurl + 'api/updatemovie', movie);
        alert('updated successfully');
        window.location.href = '/movies.html';
        console.log(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        alert(error);
        clearform();
    }
}

module.exports = editmovie;
