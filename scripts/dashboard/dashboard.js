

async function LoadDashboard() {
    debugger;
    var duration = $('#duration').find(":selected").val();
    var fromdate, todate, tempfromdate;
    fromdate = new Date();
    tempfromdate = new Date();
    todate = new Date(tempfromdate.setDate(tempfromdate.getDate() + duration));

    var frommonth = fromdate.getMonth() + 1;
    var tomonth = todate.getMonth() + 1;

    var requestbody = {
        UserId: localStorage.getItem('userId'),
        DueFromDate: frommonth + "/" + fromdate.getDate() + "/" + fromdate.getFullYear(),
        DueToDate: tomonth + "/" + todate.getDate() + "/" + todate.getFullYear()
    };

    var result = await makeHttpPostRequest(baseurl + 'api/tasklist', requestbody).catch(error => {
        console.error(error);
    }).then(data => {
        //debugger;
        if (data != undefined) {
            console.log(JSON.stringify(data));
            BindDashboarddata(data);
        } else {
            alert('no data found');
        }
    });
}

async function BindDashboarddata(data) {
    $('#vehicleinfo').empty();
    var vehiclehtml = `<ul>`;
    var renthtml = `<ul>`;
    debugger;

    var morehtml = "";

    var vehiclecount = 0, rentcount = 0;
    for (var i = 0; i < data.listOfTasks.length; i++) {
        var task = data.listOfTasks[i];
        if (task.type == 'vehicle') {
            var taskrow = `<li >
              <a href="/html/tasks/tasks.html">      
              ${task.title} ${task.dueDate}                    
              </a>
                    </li>`;

            vehiclecount += 1;
            if (vehiclecount > 5){
                continue;
            }
            vehiclehtml += taskrow;
        }
        else if (task.type == 'rent') {
            var taskrow = `<li >
            <a href="/html/tasks/tasks.html">      
            ${task.title} ${task.dueDate}                    
            </a>
                  </li>`;
            rentcount += 1;
            if (rentcount > 5){
                continue;
            }
            renthtml += taskrow;
        }
        if(vehiclecount>5 & rentcount>5)
            break;
    }
    if(vehiclecount>5){
        $('#vehicleinfo').append(vehiclehtml +'<li>more..</li></ul>');    
    }else{
        $('#vehicleinfo').append(vehiclehtml + '</ul>');
    }

    if(rentcount>5){
        $('#rents').append(renthtml+'<li>more..</li></ul>');
    }else{
        $('#rents').append(renthtml + '</ul>');
    }

    if(vehiclecount==0)
        $('#vehiclecard').hide();

    if(rentcount==0)
        $('#rentcard').hide();
}

