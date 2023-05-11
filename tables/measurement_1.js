
// betölti a rendszámokat a plateList listába
plateList= document.getElementById( 'plateList');
fetch('http://localhost:3001/vehicles')
    .then(response => response.json())
    .then(datas => {
        //console.log(datas);
        datas.map(data => {
            //console.log(data);
            let option = document.createElement( 'option');
            option.value = data.plate_number1+ ', '+ data.plate_number2;
            plateList.append( option );
        });
    })


// betölti a termékeket a product selectbe
fetch('http://localhost:3001/products')
    .then(response => response.json())
    .then(datas => {
        //console.log(datas);
        let option = document.createElement( 'option');
        option.innerText = 'válasszon terméket!';
        product.append( option);
        datas.map(data => {
            //console.log(data);
            let option = document.createElement( 'option');
            option.innerText = data.name+ ', '+ data.item_number;
            product.append( option);
        });
    })

scaleWeightBtn = document.getElementById("scaleWeight");
emptyWeightBtn = document.getElementById("emptyWeight");

weightInbound = document.getElementById( "weight_inbound");
weightTime    = document.getElementById( "weight_time");

scaleWeightBtn.addEventListener( "click", (event)=>{
    fetch( 'http://localhost:3001/scaleWeight')
    .then( response => response.json())
    .then( json => {
        console.log( 'JSON', json);
        weightInbound.value = json[0].scaleWeight;
        let dateTime =  new Date().toISOString();
        dateTime= dateTime.substring( 0, dateTime.length-2);
        console.log( dateTime);
        weightTime.value = dateTime;
    })
})