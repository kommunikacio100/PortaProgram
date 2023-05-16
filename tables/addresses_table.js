let addresses_tbody = document.getElementById('tbody');

import { authToken, serverUrl, requestOptions } from './requestOptions.js';

fetch(  serverUrl+ '/addresses', requestOptions)
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            if(data.to_table!="U"){
            addresses_tbody.append(trFunction(data.to_table, data.to_id, data.defaulted, data.country_code, data.zip_code, data.city,data.street_name,data.street_type,data.street_number,data.id))
            }
        });
       // jumpToRow();
    })

function trFunction(to_table, to_id,defaulted, country_code, zip_code,city,street_name, street_type,street_number, id) {
    var table="owners";
    if(to_table=="O"){
        to_table="Tulajdonosok"
    }else if(to_table=="C"){
        to_table="Szállítmányozók"
        table="carriers"
    }else{
        to_table="Partnerek"
        table="partners"
    }

    if(defaulted=="1"){
        defaulted="IGEN";

    }else{
        defaulted="NEM";
    }

    let tr = document.createElement('tr');
    tr.innerHTML = `
    <td class="to_table" style="font-weight: bold;">${to_table}</td>
    <td class="to_id"></td>
    <td class="defaulted">${defaulted}</td>
    <td class="country_code">${country_code}</td>
    <td class="zip_code">${zip_code}</td>
    <td class="city">${city}</td>
    <td class="street_name">${street_name}</td>
    <td class="street_type">${street_type}</td>
    <td class="street_number">${street_number}</td>
    <td class="id">${id}</td>
        `
    if(to_id!=null){
    fetch( serverUrl+ `/${table}/${to_id}`,requestOptions)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
             tr.querySelector('.to_id').textContent = data.name;
        })
       
    })
    }
    /*
    if(owner_id!=null){
    fetch( serverUrl+ `/owners/${owner_id}`)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
             tr.querySelector('.owner_name').textContent = data.name;
        })
       
    })
    }
    if(carrier_id!=null){
    fetch( serverUrl+ `/carriers/${carrier_id}`)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
             tr.querySelector('.carrier_name').textContent = data.name;
            
        })
       
    })
    }
        */
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

    localStorage.setItem('address_id', id);
    window.location.href = `addresses_edit.html`;
}