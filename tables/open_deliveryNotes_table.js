let open_delivery_tbody = document.getElementById('tbody');

fetch('http://localhost:3001/delivery_notes')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            open_delivery_tbody.append(trFunction(data.serial_no, data.partner_id, data.owner_id,data.carrier_id,data.created_at,data.status,data.id))
        });
        jumpToRow();
    })

function trFunction(serial_no, partner_id,owner_id,carrier_id,created_at,status,id) {

    //csak teszt itt sokat kell még változtatni
    let tr = document.createElement('tr');
    tr.innerHTML =
        `
    <td class="vat_number">${serial_no}</td>
    <td class="name" style="font-weight: bold;">${serial_no}</td>
    <td class="bank_account">${serial_no}</td>
    <td class="memo">${serial_no}</td>
    <td class="memo">${serial_no}</td>
    <td class="memo">${serial_no}</td>
    <td class="deliveryNotes_id">${id}</td>
    `
    tr.ondblclick = function (event) {
        myEditFunction(event, id);
    }
    tr.setAttribute( "id", id);
    return tr;
}

function myEditFunction(event, id) {

    // let td = event.target;
    // let tr = td.parentNode;
    // let adatok = tr.outerText.split("\t");

    localStorage.setItem('deliveryNote_id', id);
    window.location.href = `deliveryNote_edit.html`;
}

// ha volt új, vagy szerkesztett sor, odaugrik
function jumpToRow(){
    let back_id = localStorage.getItem('back_id');
    if (back_id){
        console.log( 'back_id: ', back_id)
        let row = document.getElementById( back_id);
        if (row){
            row.scrollIntoView( true);
        }
        localStorage.clear();
    }
}


