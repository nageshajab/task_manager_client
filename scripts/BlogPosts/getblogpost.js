//const getUrlVars = require('../geturlvars');

async function getBlogPost(event) {
    if (event != undefined) {
        event.preventDefault();
    }
    debugger;
    var BlogPost = {
        Id: getUrlVars()['id']
    };

    var result = await makeHttpPostRequest(baseurl + 'api/getBlogPost', BlogPost).catch(error => {
        console.error(error);
    }).then(data => {
        debugger;
        if (data != undefined) {
            $('#title').val(data.title);
            $('#description').val(data.description);
             $('#RepositoryUrls').val(data.repositoryUrls);
            $('#BlogPostUrl').val(data.blogPostUrl);
            $('#Tags').val(data.tags);

        } else {
            alert('Failed to update BlogPost');
        }
    });

    console.log(JSON.stringify(result));
}

//module.exports = getBlogPost;
