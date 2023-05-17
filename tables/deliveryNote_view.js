
import { authToken, serverUrl, requestOptions } from './requestOptions.js';

const cached_deliveryView_id = localStorage.getItem('deliveryNote_id');

console.log(cached_deliveryView_id);

if (cached_deliveryView_id) {
    fetch( serverUrl + '/delivery_notes/' + cached_deliveryView_id, requestOptions)
        .then(response => response.json())
        .then(datas => {
            console.log( 'view delivery note: ', cached_deliveryView_id, '  datas: ',  datas);
            datas.map(data => {

                console.log(data.owner_id);
                
                if(data.owner_id!=null && data.owner_id!=0){
                fetch( serverUrl + '/owners/' + data.owner_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                        
                        datas.map(data => {
                            console.log(data.name);
                            document.getElementById('input_owner_name').value = data.name;
                            
                        })
                    })
                }
                if(data.owner_address_id!=null && data.owner_address_id!=0){
                fetch( serverUrl + '/addresses/' + data.owner_address_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                        
                        datas.map(data => {
                            
                            document.getElementById('input_owner_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;
                            document.getElementById('input_location_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;

                        })
                    })
                }
                if(data.partner_id!=null && data.partner_id!=0){
                fetch( serverUrl + '/partners/' + data.partner_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                       
                        datas.map(data => {
                            
                            document.getElementById('input_partner_name').value = data.name + " " + data.vat_number;
                            
                        })
                    })
                }
                if(data.partner_address_id!=null && data.partner_address_id!=0){
                fetch( serverUrl + '/addresses/' + data.partner_address_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                        
                        datas.map(data => {
                            
                            document.getElementById('input_partner_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;
                            document.getElementById('input_unloadlocation_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;

                        })
                    })
                }
                if(data.carrier_id!=null && data.carrier_id!=null){
                fetch( serverUrl + '/carriers/' + data.carrier_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                        
                        datas.map(data => {
                            
                            document.getElementById('input_carrier_name').value = data.name;
                            
                        })
                    })
                }
                if(data.carrier_address_id!=null && data.carrier_address_id!=0){
                fetch( serverUrl + '/addresses/' + data.carrier_address_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                       
                        datas.map(data => {
                            
                            document.getElementById('input_carrier_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;

                        })
                    })
                }

                if(data.movement_id!=null && data.movement_id!=0){
                    let move=data.movement_id;
                fetch( serverUrl + '/movements', requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                       
                        datas.map(data => {
                            
                            if(data.id==move){
                                document.getElementById('input_movement').value = data.name;
                            }

                        })
                    })
                }


                document.getElementById('input_status').value = data.status;
                //document.getElementById('input_deliveryNote_id').value = data.id;
                document.getElementById('serial_no').value = data.serial_no;
                document.getElementById('date').value = data.created_at.substring(0, data.created_at.length-5);


            })
        })
    
}

setTimeout(() => {
    window.print();
  }, 2000);

  Measurements();

  function Measurements() {

    let measures_tbody = document.getElementById('tbody');
    var id_for = cached_deliveryView_id;

    console.log(id_for);

    fetch( serverUrl + '/measurements', requestOptions)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                // console.log(data);
                if (data.delivery_note_id == id_for) {
                    measures_tbody.append(trFunction(data.vehicle_id, data.product_id, data.first_weight, data.second_weight, data.net_weight, data.id))
                }
            });
            //jumpToRow();
        })

    function trFunction(vehicle_id, product_id, first_weight, second_weight, net_weight, id) {

        let tr = document.createElement('tr');
        tr.innerHTML = `
    <td class="plate_number1" style="font-weight: bold;"></td>
    <td class="product_name"></td>
    <td class="owner_name">${first_weight}</td>
    <td class="carrier_name">${second_weight}</td>
    <td class="creation_date">${net_weight}</td>
    <td class="deliveryNotes_id">${id}</td>
        `

        if (vehicle_id != null) {
            fetch( serverUrl + `/vehicles/${vehicle_id}`, requestOptions)
                .then(response => response.json())
                .then(datas => {
                    datas.map(data => {
                        //console.log(data.name);
                        tr.querySelector('.plate_number1').textContent = data.plate_number1;
                    })

                })
        }
        if (product_id != null) {
            fetch( serverUrl + `/products`, requestOptions)
                .then(response => response.json())
                .then(datas => {
                    datas.map(data => {
                        //console.log(data.name);
                        tr.querySelector('.product_name').textContent = data.name;
                    })

                })

        }
        /*
        if(carrier_id!=null){
        
        }
        */
        tr.ondblclick = function (event) {
            myEditFunction(event, id);
        }
        tr.setAttribute("id", id);


        return tr;


    }

}

localStorage.removeItem("deliveryNote_id");
  
