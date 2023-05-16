let closed_delivery_tbody = document.getElementById('tbody');

import { authToken, serverUrl, requestOptions } from './requestOptions.js';

fetch(  serverUrl+ '/delivery_notes', requestOptions)
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            if (data.status != "NYITVA") {
            closed_delivery_tbody.append(trFunction(data.serial_no, data.partner_id, data.owner_id, data.carrier_id, data.created_at, data.status, data.id))
            }
        });
        jumpToRow();
    })

function trFunction(serial_no, partner_id, owner_id, carrier_id, created_at, status, id) {

    let tr = document.createElement('tr');
    tr.innerHTML = `
    <td class="serial_no" style="font-weight: bold;">${serial_no}</td>
    <td class="partner_name"></td>
    <td class="owner_name"></td>
    <td class="carrier_name"></td>
    <td class="creation_date">${created_at}</td>
    <td class="status">${status}</td>
    <td class="deliveryNotes_id">${id}</td>
        `
    if(partner_id!=null){
    fetch( serverUrl+ `/partners/${partner_id}`, requestOptions)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
             tr.querySelector('.partner_name').textContent = data.name;
        })
       
    })
    }
    if(owner_id!=null){
    fetch( serverUrl+ `/owners/${owner_id}`, requestOptions)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
             tr.querySelector('.owner_name').textContent = data.name;
        })
       
    })
    }
    if(carrier_id!=null){
    fetch( serverUrl+ `/carriers/${carrier_id}`, requestOptions)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
             tr.querySelector('.carrier_name').textContent = data.name;
            
        })
       
    })
    }

    tr.ondblclick = function (event) {
        myEditFunction(event, id);
    }
    tr.setAttribute("id", id);
   

    return tr;
    
    
}

function myEditFunction(event, id) {

    // let td = event.target;
    // let tr = td.parentNode;
    // let adatok = tr.outerText.split("\t");

    localStorage.setItem('deliveryNote_id', id);
    window.location.href = `deliveryNote_view.html`;
}

// ha volt új, vagy szerkesztett sor, odaugrik
function jumpToRow() {
    let back_id = localStorage.getItem('back_id');
    if (back_id) {
        console.log('back_id: ', back_id)
        let row = document.getElementById(back_id);
        if (row) {
            row.scrollIntoView(true);
        }
        localStorage.clear();
    }
}