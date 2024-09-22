//debugger;
// Check if the authenticationToken key exists in localStorage
if (localStorage.getItem('authenticationToken') == null || localStorage.getItem('authenticationToken')=='undefined') {
    // Redirect to the login.html page
    window.location.href = 'login.html';
} else {
    $('#username').text(localStorage.getItem('username'));
    $('#btnlogin').hide();
    $('#btnlogout').show();
}
