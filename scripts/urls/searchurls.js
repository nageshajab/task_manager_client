async function clearSearch() {
    $('#pageno').val('');
    $('input[type=checkbox]').each(function () {
       this.checked=false;
    });
    await searchurls();
}

async function searchurls(event) {
    if (event != undefined) {
        event.preventDefault();
        $('#pageno').val('');
    }
    var urlsearch = {
        UserId: localStorage.getItem('userId')
    };

    if ($('#pageno').val() !== '') {
        urlsearch.pageNumber = $('#pageno').val() !== '' ? $('#pageno').val() : 1;
    }
    //read selected tags
    var taglist = "";
    $('input[type=checkbox]').each(function () {
        if (this.checked) {
            taglist += $(this).val() + ",";
        }
        //taglist += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
    });
    urlsearch.tags = taglist.split(',');

    var url = `${baseurl}api/urllist?UserId=${urlsearch.UserId}&pageNumber=${urlsearch.pageNumber}`;

    try {
        var result = await makeHttpPostRequest(url, urlsearch).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                Binddata(data);

                console.log(JSON.stringify(data));

            } else {
                alert('No data found');
                clearform();
            }
        });
    } catch (error) {
        alert('Error searching movies');
        console.error(error);
    }

}

function clearform() {
    $('input[type=checkbox]').each(function () {
        this.checked = false;
    });
}

async function Loadurls() {
    //  debugger;
    var requestbody = {
        UserId: localStorage.getItem('userId')
        //email: document.getElementById('email').value,
        //PasswordHash: document.getElementById('pwd').value
    };

    var result = await makeHttpPostRequest(baseurl + 'api/urllist', requestbody).catch(error => {
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
    // debugger;
    $('#lsturls').empty();
    if (data.listOfUrls != undefined) {
        var urlhtml = `<table class='table table-hover table-striped table-bordered'>
    <tr>
        <td scope="col"><b>Link</b></td>
        <td scope="col"><b>Description</b></td>
        <td scope="col"><b>Tags</b></td>
        <td scope="col"><b>Actress</b></td>        
        <td></td>        
    </tr>`;
        //   debugger;

        for (var i = 0; i < data.listOfUrls.length; i++) {
            var url = data.listOfUrls[i];
            var urlrow = `<tr>
                    <td><a target="_blank" href='${url.link}'> ${url.link}</a> </td>
                    <td>${url.description}</td>
                    <td>${url.tags}</td>
                    <td>${url.actress}</td>                   
                    <td><a href="/html/urls/addurl.html?id=${url.id}">Edit</a> 
                    <button class="btn " onclick='Deleteurl("${url.id}")'>Delete</button></td>
                    
                    </tr>`;
            urlhtml += urlrow;
        }

        $('#lsturls').append(urlhtml + '</table>');

        bindPagination(data);

        $('#tagsfromdb').empty();
        var taghtml = '';
        for (var i = 0; i < data.tags.length; i++) {
            taghtml += `&nbsp;<input type=checkbox value="${data.tags[i]}" />&nbsp; ${data.tags[i]}`;
        }
        $('#tagsfromdb').append(taghtml);

        if (data.urlSearch.tags) {
            for (var i = 0; i < data.urlSearch.tags.length; i++) {
                $(`input[type=checkbox][value='${data.urlSearch.tags[i]}']`).prop("checked", true);
            }
        }
    }
}

async function Deleteurl(id) {
    if (!confirm('are u sure?'))
        return;

    var requestbody = {
        Id: id
    };
    var result = await makeHttpPostRequest(baseurl + 'api/deleteurl', requestbody).catch(error => {
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

    var numberofpages = Math.ceil(data.urlSearch.totalRecords / 10);

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
    await searchurls();
}


//module.exports = searchmovies;
