
let tbody = document.getElementById('tbody');

fetch('http://localhost:3001/products')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            tbody.append(
                trFunction(
                    data.item_number, data.name, data.units,
                    data.unit_price,data.stock,data.kg_per_unit,data.vat_key,
                    data.id))
        });
        jumpToRow(); // ha betöltötte a táblázatot, 
                     // odaugrik az esetleg korábban szerkesztett, vagy újonnan felvett tételhez.
                     // az edit_table.js elmenti a szerkesztett tétel id-jét.
                     // minden tr elemnek meg van adva egy id érték, ami az adatbázisban
                     // szereplő id érték.
    })

function trFunction(item_number, name, units, unit_price, stock,
                    kg_per_unit, vat_key, id) {

    let tr = document.createElement('tr');
    tr.innerHTML =
        `
    <td  class="item_number" style="font-weight: bold;">${item_number}</td>
    <td class="name">${name}</td>
    <td class="units">${units}</td>
    <td class="unit_price">${unit_price}</td>
    <td class="stock">${stock}</td>
    <td class="kg_per_unit">${kg_per_unit}</td>
    <td class="vatKey">${vat_key}</td>
    <td class="id">${id}</td>
    `
    tr.ondblclick = function (event) {
        myEditFunction(event, id);
    }
    tr.setAttribute( "id", id); // hozzárendeli a tr-hez az adatbázis id értékét. 
    return tr;
}

function myEditFunction(event, id) {
    localStorage.setItem('product_id', id);
    window.location.href = `product_edit.html`;
    // console.log('product edit id ', id);
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
