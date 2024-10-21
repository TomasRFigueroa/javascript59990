
let donaciones = [];
let totalDonaciones = 0;
let donantes = []; 
let mensajes = [];

// Calcular total donaciones
function calcularTotal() {
    return donaciones.reduce((total, cantidad) => total + cantidad, 0);
}

// Nueva donacion
function agregarDonacion(cantidad, nombre) {
    if (cantidad > 0) {
        donaciones.push(cantidad);
        let donante = donantes.find(d => d.nombre === nombre);
        if (donante) {
            donante.total += cantidad;
        } else {
            donantes.push({ nombre, total: cantidad });
        }
        console.log("Donación agregada: " + cantidad + " de " + nombre);
    } else {
        console.log("La cantidad debe ser mayor que cero.");
    }
}

// Historial de donaciones en consola
function mostrarHistorialDonaciones() {
    console.log("Historial de Donaciones:");
    donantes.forEach(d => {
        console.log(`${d.nombre}: $${d.total}`);
    });
}

// Envio de mensajes
function enviarMensaje(nombre, mensaje) {
    if (nombre && mensaje) {
        mensajes.push({ nombre, mensaje });
        console.log("Mensaje enviado por: " + nombre);
    } else {
        console.log("Por favor, completa todos los campos.");
    }
}

// Historial de mensajes en consola
function mostrarMensajes() {
    console.log("Mensajes enviados:");
    mensajes.forEach(m => {
        console.log(`${m.nombre}: ${m.mensaje}`);
    });
}

// Simular donacion
document.getElementById('simuladorBtn').addEventListener('click', function() {
    let nombre = prompt("Introduce tu nombre:");
    if (!nombre) {
        alert("Por favor ingresa un nombre.");
        return; // En caso de que la persona no agrega un nombre, corta el proceso
    }
    
    let cantidad = parseInt(prompt("¿Cuánto deseas donar?"));
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingresar un monto válido.");
        return; // Lo mismo con la cantidad
    }
    
    agregarDonacion(cantidad, nombre);
    totalDonaciones = calcularTotal();

    alert("Gracias " + nombre + ", has donado $" + cantidad + ". Total donaciones: $" + totalDonaciones);

    if (totalDonaciones > 10000) {
        console.log("¡Gracias! Has superado los $10,000 en donaciones.");
    }

    mostrarHistorialDonaciones();
});

// Formulario de donacion
document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let cantidad = parseInt(document.getElementById('amount').value);
    let nombre = prompt("Introduce tu nombre:");
    
    if (!nombre) {
        alert("El nombre no puede estar vacío.");
        return;
    }
    
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Debes ingresar una cantidad válida.");
        return;
    }
    
    agregarDonacion(cantidad, nombre);
    totalDonaciones = calcularTotal();

    document.getElementById('result').innerText = "Total donaciones del mes: $" + totalDonaciones;
    document.getElementById('totalDonaciones').innerText = totalDonaciones;

    mostrarHistorialDonaciones();
});

// Formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let nombre = document.getElementById('name').value;
    let mensaje = document.getElementById('message').value;

    enviarMensaje(nombre, mensaje);

    if (mensajes.length > 0) {
        alert("Gracias " + nombre + ", tu mensaje ha sido enviado.");
        document.getElementById('contactForm').reset();
        mostrarMensajes();
    }
});

