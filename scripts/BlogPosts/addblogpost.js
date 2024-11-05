//const getUrlVars = require('../geturlvars');

async function addblogpost(event) {
     debugger;
    if (event != undefined) {
        event.preventDefault();
    }
debugger;
    var BlogPost = {
        Title: $('#title').val(),
        Description: $('#description').val(),
        UserId: localStorage.getItem('userId'),
        RepositoryUrls: $('#repositoryurls').val().split(','),
        BlogPostUrl: $('#BlogPostUrl').val(),
        Tags: $('#tags').val().split(',')
    };

    if (getUrlVars()['id'] != undefined) {
       
        BlogPost.Id = getUrlVars()['id'];
        var result = await makeHttpPostRequest(baseurl + 'api/updateBlogPost', BlogPost).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('updated successfully');
                window.location.href = '/html/blogposts/blogposts.html';
            } else {
                alert(data);
                clearform();
            }
        });
    } else { 
        var result = await makeHttpPostRequest(baseurl + 'api/addBlogPost', BlogPost).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                alert('added successfully');
                window.location.href = '/html/blogposts/blogposts.html';
            } else {
                alert(data);
                clearform();
            }
        });
    }
    console.log(JSON.stringify(result));
}

//module.exports = addBlogPost;
