

async function LoadDashboard() {
    debugger;
    var DueFromDate, DueToDate, tempduetodate;
    DueToDate = new Date();
    tempduetodate = new Date();
    DueFromDate = new Date(tempduetodate.setDate(tempduetodate.getDate() - 7));

    var requestbody = {
        UserId: localStorage.getItem('userId'),
        DueFromDate: DueFromDate.getMonth() + "/" + DueFromDate.getDate() + "/" + DueFromDate.getFullYear(),
        DueToDate: DueToDate.getMonth() + "/" + DueToDate.getDate() + "/" + DueToDate.getFullYear()
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
    var taskhtml = `<ul>`;
    debugger;
    for (var i = 0; i < data.listOfTasks.length; i++) {
        var task = data.listOfTasks[i];
        if (task.type == 'vehicle') {
            var taskrow = `<li >
              <a href="/html/tasks/tasks.html">      
              ${task.title} ${task.dueDate}                    
              </a>
                    </li>`;
            taskhtml += taskrow;
        }
    }
    $('#vehicleinfo').append(taskhtml + '</ul>');
}