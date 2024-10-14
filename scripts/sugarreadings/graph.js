async function BindDataForGraph(data) {
  const xValues = [];
  const fasting = [];
  const pp = [];

  for (var i = 0; i < data.listOfSugarReadings.length; i++) {
    var sugarreading = data.listOfSugarReadings[i];

    if (sugarreading.fasting && sugarreading.pp) {
      fasting.push(sugarreading.fasting);
      pp.push(sugarreading.pp);
      xValues.push(sugarreading.date);
    }
  }

  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: 'fasting',
        data: fasting,
        borderColor: "red",
        fill: false      
      }, {
        label: 'pp',
        data: pp,
        borderColor: "green",
        fill: false
      }]
    },
    options: {
      legend: { display: true },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }]
      }
    }
  });
}
Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};

async function LoadAllSugarReadings(param) {
  var requestbody = {
      UserId: localStorage.getItem('userId'),
      PageNumber:0,
      PageSize:1000
  };

  var result = await makeHttpPostRequest(baseurl + 'api/sugarreadinglist', requestbody).catch(error => {
      console.error(error);
  }).then(data => {
      //debugger;
      if (data != undefined) {
          console.log(JSON.stringify(data));
          if (!param)
              Binddata(data);
          else{
              BindDataForGraph(data);
          }
      } else {
          alert('no data found');
      }
  });

}