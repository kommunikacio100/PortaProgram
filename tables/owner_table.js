let owner_tbody = document.getElementById('tbody');

fetch('http://localhost:3001/owners')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            owner_tbody.append(trFunction(data.vat_number, data.name, data.bank_account,data.memo ,data.id))
        })
    })

function trFunction(vat_number, name, bank_account,memo ,id) {

    let tr = document.createElement('tr');
    tr.innerHTML =
        `
    <td  class="owner_vat_number" style="font-weight: bold;">${vat_number}</td>
    <td class="owner_name">${name}</td>
    <td class="owner_bank_account">${bank_account}</td>
    <td class="owner_memo">${memo}</td>
    <td class="owner_id">${id}</td>
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
    window.location.href = `owner_edit.html`;
}



