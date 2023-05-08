let product_tbody = document.getElementById('tbody');

fetch('http://localhost:3001/products')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            product_tbody.append(trFunction(data.item_number, data.name, data.units,data.unit_price,data.stock,data.kg_per_unit,data.vat_key,
                 data.id))
        })
    })

function trFunction(item_number, name, units,unit_price,unit_stock,kg_per_unit,vat_key,
    id) {

    let tr = document.createElement('tr');
    tr.innerHTML =
        `
    <td  class="product_item_number" style="font-weight: bold;">${item_number}</td>
    <td class="product_name">${name}</td>
    <td class="product_units">${units}</td>
    <td class="product_unit_price">${unit_price}</td>
    <td class="product_stock">${unit_stock}</td>
    <td class="product_kg_per_unit">${kg_per_unit}</td>
    <td class="product_vatKey">${vat_key}</td>
    <td class="vehicle_id">${id}</td>
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
    window.location.href = `product_edit.html`;
}



