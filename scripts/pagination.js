
function bindPagination(data) {

    var totalrecords=parseInt($('#totalrecords').val());

    var numberofpages = Math.ceil( totalrecords/ 10);

    $('#pagination').empty();

    var currentPageno = parseInt($('#pageno').val());
    var link;

    link = `<button onclick=Binddatabypagenumber(1)> First </button> `;
    $('#pagination').append(link);

    if (currentPageno != 1) {
        link = `<button onclick=Binddatabypagenumber(${currentPageno-1})> Previous </button> `;
        $('#pagination').append(link);
    }

    var msg = ` ${currentPageno} of ${numberofpages} `;
    $('#pagination').append(msg);

    if (currentPageno != numberofpages) {
        var nextlink = `<button onclick=Binddatabypagenumber(${currentPageno+1})> Next </button> `;
        $('#pagination').append(nextlink);
    }

    link = `<button onclick=Binddatabypagenumber(${numberofpages})> Last </button> `;
    $('#pagination').append(link);
}