function permitirLetras(event) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]$/.test(event.key);
}

function permitirNumeros(event) {
    return /^[0-9]$/.test(event.key);
}

function permitirCorreo(event) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~@-]$/.test(event.key);
}

const formulario = document.getElementById("formulario-registro");
const biografia = document.getElementById("biografia");
const contador = document.getElementById("contador");

biografia.addEventListener("input", function () {
    contador.textContent = biografia.value.length;
});

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log({
        nombres: formulario.elements.nombres.value,
        apellidos: formulario.elements.apellidos.value,
        telefono: formulario.elements.telefono.value,
        correo: formulario.elements.correo.value,
        genero: formulario.elements.genero.value,
        biografia: formulario.elements.biografia.value
    });
});
