/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var pantalla, preview, x = "0", xi = 1, punto = 0, ni = 0, operador = "no"; //operacioneración en curso; "no" =  sin operacioneración.

window.onload = function () {
    pantalla = document.getElementById("lblPantalla");
    preview = document.getElementById("lblPreview");
    document.onkeydown = eventoTeclado; //Activar la entrada por teclado
}

function setNumero(xx) {
    if (x == "0" || xi == 1) {
        if (xx == ".") { 
            pantalla.innerHTML = "0.";
            preview.innerHTML = "0."; 
            x = xx; //guardar número
            punto = 1;
        } else
        {
            pantalla.innerHTML = xx;
            preview.innerHTML += xx; 
            x = xx; //guardar número
        }
    } else {
        if (xx == "." && punto == 0) { 
            pantalla.innerHTML += xx;
            preview.innerHTML += xx; 

            x += xx;
            punto = 1; 
        }
       
        else {
            if (xx != "." && punto != 1) {
                pantalla.innerHTML += xx;
                preview.innerHTML += xx; //mostrar en pantalla

                x += xx
            }
        }

    }
    xi = 0 
}


function operacion(s) {
    getResultado();
    ni = x;
    operador = s;
    xi = 1;
    preview.innerHTML += s;
}
function getResultado() {
    if (operador == "no") { 
        pantalla.innerHTML = x;
    } else {
        sl = ni + operador + x;
        sol = eval(sl) 
        pantalla.innerHTML = sol;
        x = sol;
        operador = "no";
        xi = 1;
    }
}

function retro() { 
    cifras = x.length; 
    ultimo = x.substr(cifras - 1, cifras)
    x = x.substr(0, cifras - 1)
    if (x == "") {
        x = "0";
    } 
    if (ultimo == ".") {
        punto = 0;
    }
    pantalla.innerHTML = x; 
}
function borrarActual() {
    var valorPantalla = pantalla.innerHTML;
    var valorPreview = preview.innerHTML;

    valorPreview = valorPreview.substring(0, valorPreview.length - valorPantalla.length)
    pantalla.innerHTML = 0; //Borrado de pantalla;
    preview.innerHTML = valorPreview;
    x = 0;
    punto = 0;
}
function borrarTodo() {
    pantalla.innerHTML = 0; //poner pantalla a 0
    preview.innerHTML = '';
    x = "0"; //reiniciar número en pantalla
    punto = 0; //reiniciar estado punto decimal 
    ni = 0 //indicador de número oculto a 0;
    operador = "no" //borrar operación en curso.
}
function eventoTeclado(evt) {
    caracter = evt.keyCode; //obtener el carácter ingresado
    if (caracter > 47 && caracter < 58) {//Según el codigo ASCII desde el 47 al 58 son numeros
        p = caracter - 48; //buscar número a mostrar.
        p = String(p) //convertir a cadena para poder añádir en pantalla.
        setNumero(p); //enviar para mostrar en pantalla
    }
//Teclas del teclado númerico. Seguimos el mismo procedimiento que en el anterior.
    if (caracter > 95 && caracter < 106) {
        p = caracter - 96;
        p = String(p);
        setNumero(p);
    } else if (caracter == 110 || caracter == 188 || caracter == 190) {
        setNumero(".");
    } //teclas de punto decimal
    else if (caracter == 107 || caracter == 187) {
        operacion('+');

    } //tecla suma
    else if (caracter == 109 || caracter == 189) {
        operacion('-');
    } //tecla resta
    else if (caracter == 42) {
        operacion('*');
    } //tecla multiplicación
    else if (caracter == 111) {
        operacion('/')
    } //tecla división
    else if (caracter == 61 || caracter == 13) {
        getResultado()
    } //Tecla igual: intro o barra espaciadora
    else if (caracter == 27) {
        borrarTodo()
    } //Tecla borrado total: "supr"
    else if (caracter == 8) {
        retro()
    } //Retroceso en escritura : tecla retroceso.
    else if (caracter == 127) {
        borradoParcial()
    } //Tecla borrado parcial: tecla de inicio.
}