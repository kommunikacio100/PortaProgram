
var scaleWeight = 0;

scaleInput = document.getElementById( 'scale');
buttonP1000 = document.getElementById( 'buttonP1000');
buttonP100 = document.getElementById( 'buttonP100');
buttonP10 = document.getElementById( 'buttonP10');
buttonP1 = document.getElementById( 'buttonP1');
buttonM1 = document.getElementById( 'buttonM1');
buttonM10 = document.getElementById( 'buttonM10');
buttonM100 = document.getElementById( 'buttonM100');
buttonM1000 = document.getElementById( 'buttonM1000');
buttonZero = document.getElementById( 'buttonZero');
buttonAny = document.getElementById( 'buttonAny');

buttonP1000.addEventListener( "click", incWeight(1000));
buttonP100.addEventListener( "click", incWeight(100));
buttonP10.addEventListener( "click", incWeight(10));
buttonP1.addEventListener( "click", incWeight(1));
buttonM1.addEventListener( "click", incWeight(-1));
buttonM10.addEventListener( "click", incWeight(-10));
buttonM100.addEventListener( "click", incWeight(-100));
buttonM1000.addEventListener( "click", incWeight(-1000));
buttonZero.addEventListener( "click", setWeight(0));
buttonAny.addEventListener( "click", setWeight( 0));

function incWeight( inc){
    scaleWeight = scaleWeight + inc;
    console.log( 'inc ', inc);
}

function setWeight( weight){
    scaleWeight = weight;
}

module.exports = scaleWeight;