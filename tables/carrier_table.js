let carrier_tbody = document.getElementById('tbody');

fetch('http://localhost:3001/carriers')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            carrier_tbody.append(trFunction(data.ekaer_id, data.name,data.memo ,data.id))
        })
    })

function trFunction(carrier_ekaer_id,carrier_name, carrier_memo,id) {

    let tr = document.createElement('tr');
    tr.innerHTML =
        `
    <td  class="carrier_ekaer_id" style="font-weight: bold;">${carrier_ekaer_id}</td>
    <td class="carrier_name">${carrier_name}</td>
    <td class="carrier_memo">${carrier_memo}</td>
    <td class="carrier_id">${id}</td>
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
    window.location.href = `carrier_edit.html`;
}



