//debugger;
// Check if the authenticationToken key exists in localStorage
if (localStorage.getItem('authenticationToken') == null || localStorage.getItem('authenticationToken') == 'undefined') {
    // Redirect to the login.html page
    window.location.href = 'html/admin/login.html';
} else {
    $('#username').text(localStorage.getItem('username'));
    $('#btnlogin').hide();
    $('#btnlogout').show();
}

var roles = localStorage.getItem('roles');

if (roles != null || roles != 'undefined') {
    var rolearray=roles.split(',');
    if(rolearray.indexOf('admin')==-1)
        $('#adminmenu').hide();
    else
        $('#adminmenu').show();
}


async function logout(){
    localStorage.clear();
    window.location.href = '/html/admin/login.html';
}

