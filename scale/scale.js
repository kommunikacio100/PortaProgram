
var scaleWeight = 0;

scaleInput = document.getElementById( 'scaleInput');
buttonP1000 = document.getElementById( 'buttonP1000');
buttonP100 = document.getElementById( 'buttonP100');
buttonP10 = document.getElementById( 'buttonP10');
//buttonP1 = document.getElementById( 'buttonP1');
//buttonM1 = document.getElementById( 'buttonM1');
buttonM10 = document.getElementById( 'buttonM10');
buttonM100 = document.getElementById( 'buttonM100');
buttonM1000 = document.getElementById( 'buttonM1000');
buttonZero = document.getElementById( 'buttonZero');
buttonAny = document.getElementById( 'buttonAny');

buttonP1000.addEventListener( "click", (event) => incWeight(1000));
buttonP100.addEventListener( "click", (event) => incWeight(100));
buttonP10.addEventListener( "click", (event) => incWeight(10));
//buttonP1.addEventListener( "click", (event) => incWeight(1));
//buttonM1.addEventListener( "click", (event) => incWeight(-1));
buttonM10.addEventListener( "click", (event) => incWeight(-10));
buttonM100.addEventListener( "click", (event) => incWeight(-100));
buttonM1000.addEventListener( "click", (event) => incWeight(-1000));
buttonZero.addEventListener( "click", (event) => setWeight(0));
buttonAny.addEventListener( "click", (event) => setWeight( Random()));

function Random() {
    var rnd = Math.floor(Math.random() * 6000)*10;
    return rnd;
}

function incWeight( inc){
    scaleWeight = scaleWeight + inc;
    if (scaleWeight<-100) scaleWeight=-100;
    if (scaleWeight> 60100) scaleWeight= 60100;
    setWeight( scaleWeight);
}

function setWeight( weight){
    scaleWeight = weight;
    scaleInput.value = scaleWeight;
    uploladWeight();
}

function uploladWeight(){
    let data_to_send = {
        "scale": "ScaleSimulator",
        "weight": scaleWeight,
    }

    fetch("http://localhost:3001/scaleWeight", {
        method: "PUT",
        body: JSON.stringify(data_to_send),
        headers: {
            "Content-type": "application/json"
        }
    }).then( res=> console.log(res));
}

