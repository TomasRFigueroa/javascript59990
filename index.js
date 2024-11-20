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
        Swal.fire('La cantidad debe ser mayor que cero.');
    }
}

// Envío de mensajes
function enviarMensaje(nombre, mensaje) {
    if (nombre && mensaje) {
        mensajes.push({ nombre, mensaje });
        localStorage.setItem('mensajes', JSON.stringify(mensajes));
    } else {
        Swal.fire('Por favor, ingrese todos los campos.');
    }
}

// Simulador de donación
document.getElementById('simuladorBtn').addEventListener('click', function () {
    Swal.fire({
        title: 'Introduce tu nombre:',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Siguiente',
    }).then((result) => {
        if (result.value) {
            let nombre = result.value;
            Swal.fire({
                title: '¿Cuánto deseas donar?',
                input: 'number',
                inputAttributes: {
                    min: 1,
                    step: 1
                },
                showCancelButton: true,
                confirmButtonText: 'Donar'
            }).then((result) => {
                let cantidad = result.value;
                if (cantidad > 0) {
                    agregarDonacion(cantidad, nombre);
                    totalDonaciones = calcularTotal();
                    actualizarDOM();

                    Swal.fire({
                        icon: 'success',
                        title: 'Gracias!',
                        text: `Has donado $${cantidad}. Total donaciones: $${totalDonaciones}`
                    });

                    if (totalDonaciones > 10000) {
                        Swal.fire({
                            icon: 'info',
                            title: '¡Increíble!',
                            text: '¡Has superado los $10,000 en donaciones!'
                        });
                    }
                } else {
                    Swal.fire('Por favor ingresa un monto válido');
                }
            });
        }
    });
});

// Formulario de donación
document.getElementById('donationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let cantidad = parseInt(document.getElementById('amount').value);
    let nombre = prompt("Introduce tu nombre:");

    if (!nombre || isNaN(cantidad) || cantidad <= 0) {
        Swal.fire('Por favor, ingresa una cantidad válida y un nombre.');
        return;
    }

    agregarDonacion(cantidad, nombre);
    totalDonaciones = calcularTotal();
    actualizarDOM();
    document.getElementById('result').innerText = "Total donaciones del mes: $" + totalDonaciones;
});


document.addEventListener('DOMContentLoaded', function () {
    actualizarDOM();
});
