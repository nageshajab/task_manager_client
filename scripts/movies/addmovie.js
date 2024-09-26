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

    try {
        let result;
        if (getUrlVars()['id'] != undefined) {
            movie.Id = getUrlVars()['id'];
            result = await makeHttpPostRequest(baseurl + 'api/updatemovie', movie);
            alert('updated successfully');
        } else {
            result = await makeHttpPostRequest(baseurl + 'api/addmovie', movie);
            alert('added successfully');
        }
        window.location.href = '/movies.html';
        console.log(JSON.stringify(result)); // Ensure result is logged here
    } catch (error) {
        console.error(error);
        alert(error);
        clearform();
    }
}
module.exports = addmovie;
