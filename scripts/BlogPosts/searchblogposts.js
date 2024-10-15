//const makeHttpPostRequest = require('../makehttpcall');
async function clearSearch() {
    $('#pageno').val('');
    await searchBlogPosts(); 
}
async function searchBlogPosts(event) {
    //  debugger;
    if (event != undefined) {
        event.preventDefault();
        $('#pageno').val('');
    }

    var blogPostSearch = {
        UserId: localStorage.getItem('userId')
    };
   
    if ($('#pageno').val() !== '') {
        blogPostSearch.pageNumber = $('#pageno').val();
    }
  //  debugger;
    var result = await makeHttpPostRequest(baseurl + 'api/BlogPostlist', blogPostSearch).catch(error => {
        console.error(error);
    }).then(data => {
    //    debugger;
        if (data != undefined) {
            Binddata(data);
        } else {
            alert(data);
            clearform();
        }
    });
    console.log(JSON.stringify(result));
}

async function LoadBlogPosts() {
    var requestbody = {
        UserId: localStorage.getItem('userId')
        //email: document.getElementById('email').value,
        //PasswordHash: document.getElementById('pwd').value
    };
    $('#pageno').val('1');
    var result = await makeHttpPostRequest(baseurl + 'api/BlogPostlist', requestbody).catch(error => {
        console.error(error);
    }).then(data => {
    //    debugger;
        if (data != undefined) {
            console.log(JSON.stringify(data));
            Binddata(data);
        } else {
            alert('no data found');
        }
    });
    
}

async function Binddata(data) {
    $('#lstBlogPosts').empty();
    var BlogPosthtml = `<table class='table table-hover table-striped table-bordered'>
    <tr>
        <td scope="col"><b>Title</b></td>
        <td scope="col"><b>Description</b></td>
        <td scope="col"><b>BlogPostUrl</b></td>
        <td scope="col"><b>Tags</b></td>
        <td></td>        
    </tr>`;
    
    $('#totalrecords').val(data.blogPostSearch.totalRecords);
    
    for (var i = 0; i < data.listOfBlogPosts.length; i++) {
        var BlogPost = data.listOfBlogPosts[i];
        var BlogPostrow = `<tr>
                    <td>${BlogPost.title}</td>
                    <td>${BlogPost.description}</td>
                    <td><a href= "${BlogPost.blogPostUrl}" target="_blank">Open</a></td>
                    <td>${BlogPost.tags}</td>
                    <td><a href="/addBlogPost.html?id=${BlogPost.id}">Edit</a> 
                    <button class="btn " onclick='DeleteBlogPost("${BlogPost.id}")'>Delete</button></td>
                    
                    </tr>`;
        BlogPosthtml += BlogPostrow;
    }
    debugger;
    $('#lstBlogPosts').append(BlogPosthtml + '</table>');

    bindPagination(data);
}

async function DeleteBlogPost(id){
    if(!confirm('are u sure?'))
        return;
    
    var requestbody = {
        Id: id
    };
    var result = await makeHttpPostRequest(baseurl + 'api/deleteBlogPost', requestbody).catch(error => {
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

async function Binddatabypagenumber(pgno) {
    $('#pageno').val(pgno);
    await searchBlogPosts();
}



//module.exports = searchBlogPosts;
