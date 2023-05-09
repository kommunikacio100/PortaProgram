let tbody = document.getElementById('tbody');

fetch('http://localhost:3001/carriers')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            console.log(data);
            tbody.append(trFunction( data.name, data.ekaer_id, data.memo, data.id))
        });
        jumpToRow();
    })

function trFunction( name, ekaer_id, memo, id) {

    let tr = document.createElement('tr');
    tr.innerHTML =
        `
    <td class="carrier_name" style="font-weight: bold;">${name}</td>
    <td class="carrier_ekaer_id">${ekaer_id}</td>
    <td class="carrier_memo">${memo}</td>
    <td class="carrier_id">${id}</td>
    `

    tr.ondblclick = function (event) {
        myEditFunction(event, id);
    }
    tr.setAttribute( "id", id);
    return tr;
}

function myEditFunction(event, id) {
    localStorage.setItem('carrier_id', id);
    window.location.href = `carrier_edit.html`;
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


