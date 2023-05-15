
const authToken = localStorage.getItem( 'jwt');
const requestOptions = {
    method: 'GET', // vagy POST, PUT, DELETE, stb.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
    }
  };

const cached_deliveryView_id = localStorage.getItem('deliveryNote_id');

console.log(cached_deliveryView_id);

if (cached_deliveryView_id) {
    fetch('http://localhost:3001/delivery_notes/' + cached_deliveryView_id, requestOptions)
        .then(response => response.json())
        .then(datas => {
            console.log( 'view delivery note: ', cached_deliveryView_id, '  datas: ',  datas);
            datas.map(data => {

                console.log(data.owner_id);
                
                if(data.owner_id!=null && data.owner_id!=0){
                fetch('http://localhost:3001/owners/' + data.owner_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                        
                        datas.map(data => {
                            console.log(data.name);
                            document.getElementById('input_owner_name').value = data.name;
                            
                        })
                    })
                }
                if(data.owner_address_id!=null && data.owner_address_id!=0){
                fetch('http://localhost:3001/addresses/' + data.owner_address_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                        
                        datas.map(data => {
                            
                            document.getElementById('input_owner_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;
                            document.getElementById('input_location_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;

                        })
                    })
                }
                if(data.partner_id!=null && data.partner_id!=0){
                fetch('http://localhost:3001/partners/' + data.partner_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                       
                        datas.map(data => {
                            
                            document.getElementById('input_partner_name').value = data.name + " " + data.vat_number;
                            
                        })
                    })
                }
                if(data.partner_address_id!=null && data.partner_address_id!=0){
                fetch('http://localhost:3001/addresses/' + data.partner_address_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                        
                        datas.map(data => {
                            
                            document.getElementById('input_partner_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;
                            document.getElementById('input_unloadlocation_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;

                        })
                    })
                }
                if(data.carrier_id!=null && data.carrier_id!=null){
                fetch('http://localhost:3001/carriers/' + data.carrier_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                        
                        datas.map(data => {
                            
                            document.getElementById('input_carrier_name').value = data.name;
                            
                        })
                    })
                }
                if(data.carrier_address_id!=null && data.carrier_address_id!=0){
                fetch('http://localhost:3001/addresses/' + data.carrier_address_id, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                       
                        datas.map(data => {
                            
                            document.getElementById('input_carrier_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;

                        })
                    })
                }

                if(data.movement_id!=null && data.movement_id!=0){
                    let move=data.movement_id;
                fetch('http://localhost:3001/movements', requestOptions)
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
    localStorage.clear();
}

setTimeout(() => {
    window.print();
  }, 2000);
  
