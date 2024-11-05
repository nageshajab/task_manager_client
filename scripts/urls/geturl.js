//const getUrlVars = require('../geturlvars');

async function geturl(event) {
    if (event != undefined) {
        event.preventDefault();
    }
    var task = {
        Id: getUrlVars()['id']
    };
  
    var result = await makeHttpPostRequest(baseurl + 'api/geturl', task).catch(error => {
        console.error(error);
    }).then(data => {
        if (data != undefined) {

            $('#id').val(data.id);
            $('#link').val(data.link);
            $('#description').val(data.description);
            bindtags(data.tags);
            $('#actress').val(data.actress);
            $('#actressurl').val(data.actressUrl);
        } else {
            alert('Failed to get url details');
        }
    });
}

function bindtags(tags) {
    debugger;
    if (tags) {
        for (var i = 0; i < tags.length; i++) {
            $(`input[type=checkbox][value='${tags[i].trim() }']`).prop("checked", true);
        }
    }
}
//module.exports = gettask;
async function gettagsfromdatabase() {
    var urlsearch = {
        UserId: localStorage.getItem('userId')
    };

    try {
        var result = await makeHttpPostRequest(baseurl + 'api/urltaglist', urlsearch).catch(error => {
            console.error(error);
        }).then(data => {
            debugger;
            if (data != undefined) {
                console.log(JSON.stringify(data));

                $('#tagsfromdb').empty();
                var taghtml = '';
                for (var i = 0; i < data.length; i++) {
                    taghtml += `&nbsp;<input type=checkbox value="${data[i]}" />&nbsp; ${data[i]}`;
                }
                $('#tagsfromdb').append(taghtml);

            } else {
                alert('Failed to get url details');
            }
        });
    } catch (error) {
        console.error(error);
    }
}
