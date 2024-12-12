function dateToString(date, format) {
    //2025-01-01T00:00:00 
    
    var returnval = '';
    var str;

    if (typeof date == 'string') {
        str = date.trim();

        str = str.replace('T00:00:00', '');
        const myArray = str.split("-");
       
        if (format == "yyyy-mm-dd") {
            returnval = myArray[0] + "-" + myArray[2] + "-" + myArray[1];
        } else {
            returnval = myArray[1] + "/" + myArray[2] + "/" + myArray[0];
        }
    }else{
        return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    }
    return returnval;
}

function diffinDays(d) {
    //  var d = new Date(2025, 3, 1);
    var d1 = new Date(d.getFullYear(), d.getMonth(), 1);
    var d2 = new Date(d.getFullYear(), d.getMonth() + 1, 1);

    var diffInMs = new Date(d2) - new Date(d1);
    var diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    console.log(diffInDays)
    return diffInDays;
}