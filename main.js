const monedaUno = document.getElementById("moneda-uno");
const monedaDos = document.getElementById("moneda-dos");
const cantidadUno = document.getElementById("cantidad-uno");
const cantidadDos = document.getElementById("cantidad-dos");
const cambio = document.getElementById("cambio");
const taza = document.getElementById("taza");


function calculate(){
    const moneda_uno = monedaUno.value;
    const moneda_dos = monedaDos.value;

    fetch(`https://v6.exchangerate-api.com/v6/7127e5c70519f03aa57c1548/latest/${moneda_uno}`)
    .then(res => res.json())
    .then(data => {
        console.log(data); 
        const taza = data.rates[moneda_dos];
        console.log(taza); 
        if (taza) {
            cambio.innerText = `1 ${moneda_uno} = ${taza} ${moneda_dos}`;
            cantidadDos.value = (cantidadUno.value * taza).toFixed(2);
        } else {
            console.error('Moneda no encontrada en las tasas');
        }
    })
    .catch(err => console.error('Error fetching data:', err));
    }

monedaUno.addEventListener('change', calculate);
monedaDos.addEventListener('change', calculate);
cantidadUno.addEventListener('input', calculate);
cantidadDos.addEventListener('input', calculate);
taza.addEventListener('click', () => {
    const temp = monedaUno.value;
    monedaUno.value = monedaDos.value;
    monedaDos.value = temp;
    calculate();
});

calculate();