let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

// Función para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {    // Define una función que tomas dos parámetros: el primero representa un selector de elemento y el segundo el texto que se asignará al elemento HTML
    let elementoHTML = document.querySelector(elemento);    // Selecciona el elemento HTML correspondiente
    elementoHTML.innerHTML = texto; // Cambia el contenido interno del elemento HTML al texto proporcionado
    return;
}

// Función para verificar el intento del usuario
function verificarIntento() {   // Define una función sin parámetros
    /* Obtiene el valor ingresado por el usuario en un campo de entrada con el ID 'valorUsuario',
        lo convierte en un número entero y los guarda en una variable */
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
                asignarTextoElemento('p', 'El número secreto es mayor');
        }    
        intentos++;
        limpiarCaja();
    }    
    return;
}

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales() {
    // Asigna texto inicial a elemento HTML usando la función 'asignarTextoElemento'    
    asignarTextoElemento('h1', 'Juego del número secreto'); // Asigna texto al elemento 'head'
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);  // Asigna texto al elemento 'paragraph'
    // Generar un número aleatorio
    numeroSecreto = generarNumeroSecreto();
    // Inicializar el número de intentos
    intentos = 1;
}


// Función para limpiar (vaciar) el contenido de un campo de entrada de texto en un formulario HTML
function limpiarCaja() {    // Define una función sin parámetros
    /* Selecciona el elemento del DOM con el id 'valorUsuario' y establece su propiedad 'value'
        a una cadena vacía, borrando el texto del campo */
    document.querySelector('#valorUsuario').value = '';
}

// Función para generar un número secreto aleatorio entre 1 y 10
function generarNumeroSecreto() {   // Define una función sin parámetros
    /* Genera un número decimal aleatorio entre 0 (inclusivo) y 1 (exclusivo) [Math.random()],
        lo multiplica por 10 para obtener un número decimal entre 0 y 10,
        rendondea hacia abajo y obtiene un número entero entre 0 y 9 [Math.floor()] y,
        le suma 1 para asegurar que el número esté en el rango de 1 a 10 */
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    // Si ya sorteamos todos los números...
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        // Si el número generado está incluido en la lista...
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Limpiar la caja
    limpiarCaja();
    // Reiniciar los mensajes iniciales, el número aleatorio y número de intentos
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');    
}

condicionesIniciales();