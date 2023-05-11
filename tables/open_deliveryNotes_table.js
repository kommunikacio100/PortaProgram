let open_delivery_tbody = document.getElementById('tbody');

fetch('http://localhost:3001/delivery_notes')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            if (data.status == "Nyitott") {
               trFunction(data.serial_no, data.partner_id, data.owner_id, data.carrier_id, data.created_at, data.status, data.id)
            }
        });
        jumpToRow();
    })

function trFunction(serial_no, partner_id, owner_id, carrier_id, created_at, status, id) {
    
    fetch(`http://localhost:3001/partners/${partner_id}`)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
            GetOwnerName(serial_no,data.name,owner_id,carrier_id,created_at,status, id)
        })
       
    })
    
    
}

function myEditFunction(event, id) {

    // let td = event.target;
    // let tr = td.parentNode;
    // let adatok = tr.outerText.split("\t");

    localStorage.setItem('deliveryNote_id', id);
    window.location.href = `deliveryNote_edit.html`;
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

function  GetOwnerName(serial_no,partner_name,owner_id,carrier_id,created_at,status, id) {

    console.log();
    fetch(`http://localhost:3001/owners/${owner_id}`)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
            GetCarrierName(serial_no,partner_name,data.name,carrier_id,created_at,status, id)
        })
       
    })
}

function  GetCarrierName(serial_no,partner_name,owner_name,carrier_id,created_at,status, id) {

    console.log();
    fetch(`http://localhost:3001/carriers/${carrier_id}`)
    .then(response => response.json())
    .then(datas => {
        datas.map(data => {
             //console.log(data.name);
            Table(serial_no,partner_name,owner_name,data.name,created_at,status, id)
        })
       
    })
}

function Table(serial_no,partner_name,owner_name,carrier_name,created_at,status, id) {

    //console.log(serial_no,partner_name,owner_name,carrier_name,created_at,status, id);
    let tr = document.createElement('tr');
    tr.innerHTML =
        `
    <td class="serial_no"style="font-weight: bold;">${serial_no}</td>
    <td class="partner_name" >${partner_name}</td>
    <td class="owner_name">${owner_name}</td>
    <td class="carrier_name">${carrier_name}</td>
    <td class="creation_date">${created_at}</td>
    <td class="status">${status}</td>
    <td class="deliveryNotes_id">${id}</td>
    `
    tr.ondblclick = function (event) {
        myEditFunction(event, id);
    }
    tr.setAttribute("id", id);
    open_delivery_tbody.append(tr);
    
}



