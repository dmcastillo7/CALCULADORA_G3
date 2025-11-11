let pantalla = '0';
let primerNumero = null;
let operacion = null;
let esperandoNuevoNumero = false;
let operacionCompleta = '';

// Actualizar lo que se muestra en pantalla
function actualizarPantalla() {
    document.getElementById('display').textContent = operacionCompleta !== '' ? operacionCompleta : pantalla;
}

// Agregar número a la pantalla
function agregarNumero(numero) {
    if (esperandoNuevoNumero) {
        pantalla = numero;
        esperandoNuevoNumero = false;
        // Cuando empezamos un nuevo número después de una operación, limpiamos la operación completa
        if (operacion === null) {
            operacionCompleta = '';
        }
    } else {
        pantalla = pantalla === '0' ? numero : pantalla + numero;
    }
    
    // Si hay una operación en curso, actualizamos la operación completa
    if (operacion !== null && !esperandoNuevoNumero) {
        operacionCompleta = primerNumero + ' ' + obtenerSimboloOperacion(operacion) + ' ' + pantalla;
    }
    
    actualizarPantalla();
}

// Agregar punto decimal
function agregarPunto() {
    if (!pantalla.includes('.')) {
        pantalla += '.';
        
        // Actualizar la operación completa si hay una operación pendiente
        if (operacion !== null && !esperandoNuevoNumero) {
            operacionCompleta = primerNumero + ' ' + obtenerSimboloOperacion(operacion) + ' ' + pantalla;
        }
        
        actualizarPantalla();
    }
}

// Obtener el símbolo de la operación para mostrar
function obtenerSimboloOperacion(op) {
    switch(op) {
        case '+': return '+';
        case '-': return '-';
        case '*': return '×';
        case '/': return '÷';
        default: return op;
    }
}

// Elegir la operación (+, -, *, /)
function elegirOperacion(op) {
    if (operacion !== null && !esperandoNuevoNumero) {
        calcular();
    }
    
    primerNumero = parseFloat(pantalla);
    operacion = op;
    
    // Mostrar la operación completa
    operacionCompleta = pantalla + ' ' + obtenerSimboloOperacion(op);
    esperandoNuevoNumero = true;
    
    actualizarPantalla();
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
        // Multiplicación (Evelyn Condoy)
        case '*':
            resultado = primerNumero * segundoNumero;
            break;
        // División (Dayra Mosquera)
        case '/':
            if (segundoNumero === 0) {
                pantalla = 'Error';
                operacionCompleta = 'División por cero';
                operacion = null;
                primerNumero = null;
                esperandoNuevoNumero = true;
                actualizarPantalla();
                return;
            }
            resultado = primerNumero / segundoNumero;
            break;

        default:
            return;
    }

    // Guardar la operación completa con el resultado
    const operacionTexto = primerNumero + ' ' + obtenerSimboloOperacion(operacion) + ' ' + segundoNumero + ' = ' + resultado;
    
    pantalla = resultado.toString();
    operacionCompleta = operacionTexto;
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
    operacionCompleta = '';
    actualizarPantalla();
}

// Limpiar solo el número actual
function limpiarEntrada() {
    pantalla = '0';
    
    // Si hay una operación en curso, actualizar la operación completa
    if (operacion !== null) {
        operacionCompleta = primerNumero + ' ' + obtenerSimboloOperacion(operacion) + ' 0';
    } else {
        operacionCompleta = '';
    }
    
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
        } else if (tecla === 'Backspace') {
            if (pantalla.length > 1 && !esperandoNuevoNumero) {
                pantalla = pantalla.slice(0, -1);
                
                // Actualizar operación completa si existe
                if (operacion !== null && !esperandoNuevoNumero) {
                    operacionCompleta = primerNumero + ' ' + obtenerSimboloOperacion(operacion) + ' ' + pantalla;
                }
                
                actualizarPantalla();
            } else {
                limpiarEntrada();
            }
        }
    });
});