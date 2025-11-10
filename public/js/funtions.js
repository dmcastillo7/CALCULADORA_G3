let pantalla = '0';
let primerNumero = null;
let operacion = null;
let esperandoNuevoNumero = false;

// Actualizar lo que se muestra en pantalla
function actualizarPantalla() {
    document.getElementById('display').textContent = pantalla;
}

// Agregar número a la pantalla
function agregarNumero(numero) {
    if (esperandoNuevoNumero) {
        pantalla = numero;
        esperandoNuevoNumero = false;
    } else {
        pantalla = pantalla === '0' ? numero : pantalla + numero;
    }
    actualizarPantalla();
}

// Agregar punto decimal
function agregarPunto() {
    if (!pantalla.includes('.')) {
        pantalla += '.';
        actualizarPantalla();
    }
}

// Elegir la operación (+, -, *, /)
function elegirOperacion(op) {
    if (operacion !== null && !esperandoNuevoNumero) {
        calcular();
    }
    primerNumero = parseFloat(pantalla);
    operacion = op;
    esperandoNuevoNumero = true;
}

// Hacer el cálculo
function calcular() {
    if (operacion === null || esperandoNuevoNumero) return;

    const segundoNumero = parseFloat(pantalla);
    let resultado;

    switch (operacion) {
        case '+':
            resultado = primerNumero + segundoNumero;
            break;
        
        // Resta (Alejandro Simba)
        case '-':
        resultado = primerNumero - segundoNumero;
            break;

        default:
            return;
    }

    pantalla = resultado.toString();
    operacion = null;
    primerNumero = null;
    esperandoNuevoNumero = true;
    actualizarPantalla();
}

// Limpiar toda la calculadora
function limpiarTodo() {
    pantalla = '0';
    primerNumero = null;
    operacion = null;
    esperandoNuevoNumero = false;
    actualizarPantalla();
}

// Limpiar solo el número actual
function limpiarEntrada() {
    pantalla = '0';
    actualizarPantalla();
}

// Iniciar la calculadora cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarPantalla();
    
    // Agregar eventos de teclado para que funcione con el teclado
    document.addEventListener('keydown', function(event) {
        const tecla = event.key;
        
        if (tecla >= '0' && tecla <= '9') {
            agregarNumero(tecla);
        } else if (tecla === '.') {
            agregarPunto();
        } else if (tecla === '+') {
            elegirOperacion('+');
        } else if (tecla === '-') {
            elegirOperacion('-');
        } else if (tecla === '*') {
            elegirOperacion('*');
        } else if (tecla === '/') {
            event.preventDefault();
            elegirOperacion('/');
        } else if (tecla === 'Enter' || tecla === '=') {
            calcular();
        } else if (tecla === 'Escape') {
            limpiarTodo();
        }
    });
});