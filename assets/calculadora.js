const pantalla = document.querySelector("#pantalla");
const calculadora = document.querySelector(".calculadora");

if (pantalla && calculadora) {
    let valorMostrado = "0";
    let valorAnterior = null;
    let operador = null;
    let esperandoSiguienteNumero = false;

    const actualizarPantalla = () => {
        pantalla.textContent = valorMostrado;
    };

    const limpiar = () => {
        valorMostrado = "0";
        valorAnterior = null;
        operador = null;
        esperandoSiguienteNumero = false;
        actualizarPantalla();
    };

    const ingresarDigito = (digito) => {
        if (esperandoSiguienteNumero || valorMostrado === "Error") {
            valorMostrado = digito;
            esperandoSiguienteNumero = false;
        } else if (valorMostrado === "0") {
            valorMostrado = digito;
        } else if (valorMostrado.length < 14) {
            valorMostrado += digito;
        }
        actualizarPantalla();
    };

    const ingresarDecimal = () => {
        if (esperandoSiguienteNumero || valorMostrado === "Error") {
            valorMostrado = "0.";
            esperandoSiguienteNumero = false;
        } else if (!valorMostrado.includes(".")) {
            valorMostrado += ".";
        }
        actualizarPantalla();
    };

    const calcular = (a, b, operacion) => {
        switch (operacion) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return b === 0 ? null : a / b;
            default:
                return b;
        }
    };

    const mostrarResultado = (resultado) => {
        if (resultado === null || !Number.isFinite(resultado)) {
            valorMostrado = "Error";
            valorAnterior = null;
            operador = null;
            esperandoSiguienteNumero = true;
        } else {
            valorMostrado = String(Number(resultado.toPrecision(10)));
        }
        actualizarPantalla();
    };

    const elegirOperador = (nuevoOperador) => {
        if (valorMostrado === "Error") {
            return;
        }

        const valorActual = Number(valorMostrado);

        if (operador && !esperandoSiguienteNumero) {
            const resultado = calcular(valorAnterior, valorActual, operador);
            mostrarResultado(resultado);
            if (resultado === null || !Number.isFinite(resultado)) {
                return;
            }
            valorAnterior = resultado;
        } else {
            valorAnterior = valorActual;
        }

        operador = nuevoOperador;
        esperandoSiguienteNumero = true;
    };

    const resolver = () => {
        if (operador === null || valorAnterior === null || esperandoSiguienteNumero) {
            return;
        }

        mostrarResultado(calcular(valorAnterior, Number(valorMostrado), operador));
        operador = null;
        valorAnterior = null;
        esperandoSiguienteNumero = true;
    };

    calculadora.addEventListener("click", (evento) => {
        const boton = evento.target.closest("button");
        if (!boton) {
            return;
        }

        if (boton.dataset.digit !== undefined) {
            ingresarDigito(boton.dataset.digit);
        } else if (boton.dataset.operator) {
            elegirOperador(boton.dataset.operator);
        } else if (boton.dataset.action === "decimal") {
            ingresarDecimal();
        } else if (boton.dataset.action === "equals") {
            resolver();
        } else if (boton.dataset.action === "clear") {
            limpiar();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (/^\d$/.test(evento.key)) {
            ingresarDigito(evento.key);
        } else if (evento.key === ".") {
            ingresarDecimal();
        } else if (["+", "-", "*", "/"].includes(evento.key)) {
            elegirOperador(evento.key);
        } else if (evento.key === "Enter" || evento.key === "=") {
            evento.preventDefault();
            resolver();
        } else if (evento.key === "Escape") {
            limpiar();
        }
    });
}
