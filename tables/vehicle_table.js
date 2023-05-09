let tbody = document.getElementById('tbody');

fetch('http://localhost:3001/vehicles')
    .then(response => response.json())
    .then(datas => {
        console.log(datas);
        datas.map(data => {
            console.log(data);
            tbody.append( trFunction(
                data.plate_number1, 
                data.plate_number2,
                data.empty_weight, 
                data.empty_time,
                data.id
                ))
        })
    })

function trFunction(vehicle_platenumber_1, vehicle_platenumber_2, vehicle_empty_weight, vehicle_empty_time,
    vehicle_id) {

    let tr = document.createElement('tr');
    tr.innerHTML =
        `
    <td  class="vehicle_platenumber_1" style="font-weight: bold;">${vehicle_platenumber_1}</td>
    <td  class="vehicle_platenumber_1" style="font-weight: bold;">${vehicle_platenumber_2}</td>
    <td class="vehicle_empty_weight">${vehicle_empty_weight}</td>
    <td class="vehicle_empty_weight_date">${vehicle_empty_time}</td>
    <td class="vehicle_id">${vehicle_id}</td>
    `

    tr.ondblclick = function (event) {
        
        myEditFunction(event, vehicle_id);

    }
    return tr;
}

function myEditFunction(event, vehicle_id) {

    //let td = event.target;
    //let tr = td.parentNode;

    localStorage.setItem('vehicle_edit_id', vehicle_id);
    window.location.href = `vehicle_edit.html`;
}



