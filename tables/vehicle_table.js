let tbody = document.getElementById('tbody');

fetch('http://localhost:3001/vehicles')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            tbody.append(trFunction(data.plate_number1, data.empty_weight, data.empty_time,
                 data.id))
        })
    })

function trFunction(vehicle_platenumber_1, vehicle_empty_weight, vehicle_empty_time,
    vehicle_id) {

        let date=vehicle_empty_time.split("T");
        let time=date[1].split("\.")
        let vehicle_empty_weight_date=date[0];
        let vehicle_empty_weight_time=time[0];


    let tr = document.createElement('tr');
    tr.innerHTML =
        `
    <td  class="vehicle_platenumber_1" style="font-weight: bold;">${vehicle_platenumber_1}</td>
    <td class="vehicle_empty_weight">${vehicle_empty_weight}</td>
    <td class="vehicle_empty_weight_date">${vehicle_empty_weight_date}</td>
    <td class="vehicle_empty_weight_time">${vehicle_empty_weight_time}</td>
    <td class="vehicle_id">${vehicle_id}</td>
    `

    tr.ondblclick = function (event) {
        
        myEditFunction(event);

    }
    return tr;
}

function myEditFunction(event) {

    let td = event.target;

    let tr = td.parentNode;

    let adatok = tr.outerText.split("\t");

    localStorage.setItem('data', adatok);
    window.location.href = `vehicle_edit.html`;
}



