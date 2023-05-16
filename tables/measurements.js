import { authToken, serverUrl, requestOptions } from './requestOptions.js';

let measurements_tbody = document.getElementById('tbody');

fetch(  serverUrl+ '/measurements', requestOptions)
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            
            measurements_tbody.append(trFunction(data.vehicle_id, data.product_id, data.first_weight, data.second_weight, data.net_weight,data.id))
            
        });
       // jumpToRow();
    })

function trFunction(vehicle_id, product_id,first_weight, second_weight, net_weight,id) {
    
    let tr = document.createElement('tr');
    tr.innerHTML = `
    <td class="vehicle_id" style="font-weight: bold;"></td>
    <td class="product_id"></td>
    <td class="first_weight">${first_weight}</td>
    <td class="second_weight">${second_weight}</td>
    <td class="net_weight">${net_weight}</td>
    <td class="id">${id}</td>
        `
        
    if(vehicle_id!=null){
    fetch( serverUrl+ `/vehicles/${vehicle_id}`,requestOptions)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
             tr.querySelector('.vehicle_id').textContent = data.plate_number1;
        })
       
    })
    }
    
    if(product_id!=null){
    fetch( serverUrl+ `/products/${product_id}`, requestOptions)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
             tr.querySelector('.product_id').textContent = data.name+" "+data.item_number;
        })
       
    })
    }
    /*
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
    return tr;
    
    
}