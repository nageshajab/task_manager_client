async function clearform() {
    $('#id').val('');
    $('#link').val('');
    $('#description').val('');
    $('#tags').val('');
    $('#actress').val('');
    $('#actressurl').val('');

    $('input[type=checkbox]').each(function () {
        this.checked = false;
    });
}

function readselectedtags() {
    debugger;
    var taglist = "";
    $('input[type=checkbox]').each(function () {
        if (this.checked) {
            taglist += $(this).val() + ",";
        }
        //taglist += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
    });
    taglist = taglist + $('#tags').val();
    return taglist.split(',');
}

async function addurl(event) {
    debugger;
    if (event != undefined) {
        event.preventDefault();
    }

    var url = {
        link: $('#link').val(),
        Description: $('#description').val(),
        Actress: $('#actress').val(),
        ActressUrl: $('#actressurl').val(),
        UserId: localStorage.getItem('userId')
    };
   
    url.Tags=await readselectedtags();

    try {
        let result;
        if (getUrlVars()['id'] != undefined) {
            url.Id = getUrlVars()['id'];
            result = await makeHttpPostRequest(baseurl + 'api/updateurl', url);
            alert('updated successfully');
        } else {
            result = await makeHttpPostRequest(baseurl + 'api/addurl', url);
            alert('added successfully');
        }
        window.location.href = '/html/urls/urls.html';
        console.log(JSON.stringify(result)); // Ensure result is logged here
    } catch (error) {
        console.error(error);
        alert(error);
        clearform();
    }
}

//module.exports = addmovie;
