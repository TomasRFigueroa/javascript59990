// Monto a donar

let donaciones = [500, 1000, 1500, 2000, 2500, 3000, 3500];
let totalDonaciones = 0;


// Calcular el total de donaciones
function calcularTotal() {
    for (let donacion of donaciones) {
        totalDonaciones += donacion;
    }
}

function agregarDonacion(cantidad) {
    if (cantidad > 0) {
        donaciones.push(cantidad);
        console.log("Donación agregada: " + cantidad);
    } else {
        console.log("La cantidad debe ser mayor que cero.");
    }
}

document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let cantidad = parseInt(document.getElementById('amount').value);
    agregarDonacion(cantidad);
    calcularTotal();

  
    if (totalDonaciones > 10000) {
        console.log("¡Gracias! Has superado los $10,000 en donaciones.");
    } else {
        console.log("Total actual de donaciones: $" + totalDonaciones);
    }

    document.getElementById('result').innerText = "Total donaciones del mes: $" + totalDonaciones;
    document.getElementById('totalDonaciones').innerText = totalDonaciones;
});


 // Apartado contacto

 let mensajes = [];

function enviarMensaje(nombre, mensaje) {
    if (nombre && mensaje) {
        mensajes.push({ nombre, mensaje });
        console.log("Mensaje enviado por: " + nombre);
    } else {
        console.log("Por favor, completa todos los campos.");
    }
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let nombre = document.getElementById('name').value;
    let mensaje = document.getElementById('message').value;

    enviarMensaje(nombre, mensaje);


    if (mensajes.length > 0) {
        alert("Gracias " + nombre + ", tu mensaje ha sido enviado.");
        document.getElementById('contactForm').reset();
    }
});