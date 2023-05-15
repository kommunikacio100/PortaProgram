const authToken = localStorage.getItem( 'jwt');
const requestOptions = {
    method: 'GET', // vagy POST, PUT, DELETE, stb.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
    }
  };

let partner_tbody = document.getElementById('tbody');

fetch('http://localhost:3001/partners', requestOptions)
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            partner_tbody.append(trFunction( data.vat_number, data.name, data.bank_account, data.memo, data.id))
        });
        jumpToRow();
    })

function trFunction( vat_number, name, bank_account, memo, id) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
    <td  class="vat_number">${vat_number}</td>
    <td class="name" style="font-weight: bold;">${name}</td>
    <td class="bank_account">${bank_account}</td>
    <td class="memo">${memo}</td>
    <td class="id">${id}</td>
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

    localStorage.setItem('partner_id', id);
    window.location.href = `partner_edit.html`;
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

