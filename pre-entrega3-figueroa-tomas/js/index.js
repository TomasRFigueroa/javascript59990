let donaciones = JSON.parse(localStorage.getItem('donaciones')) || [];
let totalDonaciones = donaciones.reduce((total, cantidad) => total + cantidad, 0);
let donantes = JSON.parse(localStorage.getItem('donantes')) || [];
let mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];

// Función para actualizar el DOM con los valores actuales
function actualizarDOM() {
    document.getElementById('totalDonaciones').innerText = totalDonaciones;

    // Historial de donaciones
    const historialDonaciones = document.getElementById('historialDonaciones');
    historialDonaciones.innerHTML = '';
    donantes.forEach(donante => {
        const li = document.createElement('li');
        li.innerText = `${donante.nombre}: $${donante.total}`;
        historialDonaciones.appendChild(li);
    });

    // Mensajes recibidos
    const mensajesRecibidos = document.getElementById('mensajesRecibidos');
    mensajesRecibidos.innerHTML = '';
    mensajes.forEach(mensaje => {
        const li = document.createElement('li');
        li.innerText = `${mensaje.nombre}: ${mensaje.mensaje}`;
        mensajesRecibidos.appendChild(li);
    });
}

// Calcular el total de donaciones
function calcularTotal() {
    return donaciones.reduce((total, cantidad) => total + cantidad, 0);
}

// Nueva donación
function agregarDonacion(cantidad, nombre) {
    if (cantidad > 0) {
        donaciones.push(cantidad);
        let donante = donantes.find(d => d.nombre === nombre);
        if (donante) {
            donante.total += cantidad;
        } else {
            donantes.push({ nombre, total: cantidad });
        }
        localStorage.setItem('donaciones', JSON.stringify(donaciones));
        localStorage.setItem('donantes', JSON.stringify(donantes));
    } else {
        alert("La cantidad debe ser mayor que cero.");
    }
}

// Envío de mensajes
function enviarMensaje(nombre, mensaje) {
    if (nombre && mensaje) {
        mensajes.push({ nombre, mensaje });
        localStorage.setItem('mensajes', JSON.stringify(mensajes));
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Simulador de donaciones
document.getElementById('simuladorBtn').addEventListener('click', function () {
    let nombre = prompt("Introduce tu nombre:");
    if (!nombre) {
        alert("Por favor ingresa un nombre.");
        return;
    }

    let cantidad = parseInt(prompt("¿Cuánto deseas donar?"));
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingresar un monto válido.");
        return;
    }

    agregarDonacion(cantidad, nombre);
    totalDonaciones = calcularTotal();
    actualizarDOM();

    alert("Gracias " + nombre + ", has donado $" + cantidad + ". Total donaciones: $" + totalDonaciones);

    if (totalDonaciones > 10000) {
        alert("¡Gracias! Has superado los $10,000 en donaciones.");
    }
});

// Formulario de donación
document.getElementById('donationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let cantidad = parseInt(document.getElementById('amount').value);
    let nombre = prompt("Introduce tu nombre:");

    if (!nombre || isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingresa una cantidad válida y un nombre.");
        return;
    }

    agregarDonacion(cantidad, nombre);
    totalDonaciones = calcularTotal();
    actualizarDOM();

    document.getElementById('result').innerText = "Total donaciones del mes: $" + totalDonaciones;
});

// Formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let nombre = document.getElementById('name').value;
    let mensaje = document.getElementById('message').value;

    enviarMensaje(nombre, mensaje);
    alert("Gracias " + nombre + ", tu mensaje ha sido enviado.");
    document.getElementById('contactForm').reset();
    actualizarDOM();
});

// Actualizar el DOM al cargar
document.addEventListener('DOMContentLoaded', actualizarDOM);
