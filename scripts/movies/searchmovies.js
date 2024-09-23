async function clearSearch() {
    $('#pageno').val('');
    await searchmovie();
}
async function searchmovies(event) {
    //  debugger;
    if (event != undefined) {
        event.preventDefault();
        $('#pageno').val('');
    }

    var moviesearch = {
        UserId: localStorage.getItem('userId')
    };

    if ($('#pageno').val() !== '') {
        moviesearch.pageNumber = $('#pageno').val();
    }
    debugger;
    var result = await makeHttpPostRequest(baseurl + 'api/movielist', moviesearch).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
            Binddata(data);
        } else {
            alert(data);
            clearform();
        }
    });
    console.log(JSON.stringify(result));
}

async function Loadmovies() {
    debugger;
    var requestbody = {
        UserId: localStorage.getItem('userId')
        //email: document.getElementById('email').value,
        //PasswordHash: document.getElementById('pwd').value
    };

    var result = await makeHttpPostRequest(baseurl + 'api/movielist', requestbody).catch(error => {
        console.error(error);
    }).then(data => {
        //debugger;
        if (data != undefined) {
            console.log(JSON.stringify(data));
            Binddata(data);
        } else {
            alert('no data found');
        }
    });

}

async function Binddata(data) {
    debugger;
    $('#lstMovies').empty();
    if (data.listOfMovies != undefined) {
        var moviehtml = `<table class='table table-hover table-striped table-bordered'>
    <tr>
        <td scope="col"><b>Name</b></td>
        <td scope="col"><b>Genre</b></td>
        <td scope="col"><b>Rating</b></td>
        <td scope="col"><b>Description</b></td>
        <td scope="col"><b>Language</b></td>
        <td scope="col"><b>Actors</b></td>
        <td></td>        
    </tr>`;
        debugger;

        for (var i = 0; i < data.listOfMovies.length; i++) {
            var movie = data.listOfMovies[i];
            var movierow = `<tr>
                    <td>${movie.name}</td>
                    <td>${ printGenre( movie.genre)}</td>
                    <td>${movie.rating}</td>
                    <td>${movie.description}</td>
                    <td>${printLanguage( movie.language)}</td>
                    <td>${movie.actors}</td>
                    <td><a href="/addmovie.html?id=${movie.id}">Edit</a> 
                    <button class="btn " onclick='Deletemovie("${movie.id}")'>Delete</button></td>
                    
                    </tr>`;
            moviehtml += movierow;
        }

        $('#lstMovies').append(moviehtml + '</table>');

        bindPagination(data);
    }
}

async function Deletemovie(id) {
    if (!confirm('are u sure?'))
        return;

    var requestbody = {
        Id: id
    };
    var result = await makeHttpPostRequest(baseurl + 'api/deletemovie', requestbody).catch(error => {
        console.error(error);
    }).then(data => {
        //        debugger;
        if (data != undefined) {
            clearSearch();
        } else {
            alert('something went wrong');
        }
    });
}

function bindPagination(data) {
    //   debugger;

    var numberofpages = Math.ceil(data.movieSearch.totalRecords / 10);

    $('#pagination').empty();

    var link = `<button onclick=Binddatabypagenumber(1)> First</button> `;
    $('#pagination').append(link);

    for (var i = 0; i < numberofpages; i++) {
        var link = `<button onclick=Binddatabypagenumber(${i + 1})> ${i + 1}</button> `;
        $('#pagination').append(link);
    }
    var link = `<button onclick=Binddatabypagenumber(${numberofpages})> Last</button> `;
    $('#pagination').append(link);
}

async function Binddatabypagenumber(pgno) {
    $('#pageno').val(pgno);
    await searchmovie();
}

function printGenre(status) {
    debugger;
    switch (status) {
    
        case 0: return 'Suspense';
        case 1: return 'Action';
        case 2: return 'Comedy';
        case 3: return 'Romance';
        case 4: return 'Drama';
        case 5: return 'Horror';
        case 6: return 'SciFi';
        case 7: return 'Documentary';
        case 8: return 'Animation';
        default: return ''
    }
}

function printLanguage(language) {
    debugger;
    switch (language) {

        case 0: return 'Hindi';
        case 1: return 'English';
        case 2: return 'Tamil';
        case 3: return 'Telugu';
        case 4: return 'Malayalam';
        case 5: return 'Kannada';
        case 6: return 'Marathi';
        default: return ''
    }
}       
