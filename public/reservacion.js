document.addEventListener('DOMContentLoaded', function(){

    const formulario = document.querySelector('#formulario');
    const inputNombre = document.querySelector('#nombre');
    const inputCorreo = document.querySelector('#correo');
    const inputNumero = document.querySelector('#numTelefono');
    const inputIngreso = document.querySelector('#fechaIngreso');
    const inputSalida = document.querySelector('#fechaSalida');
    const divFechas = document.querySelector('.fechas');
    const inputHabMat = document.querySelector('#habMat');
    const inputHabKing = document.querySelector('#habKing');
    const inputDobles = document.querySelector('#habDoble');
    const totalPagar = document.querySelector('#totalPagar'); 
    const btnEnviar = document.querySelector('#submit');
    // const btnBorrar = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    
    const formLleno = {
        nombre: '',
        correo: '',
        numTelefono: '',
        fechaIngreso: '',
        fechaSalida: '',
        habMat: '',
        habKing: '',
        habDoble: '',
        totalPagar: ''
    };
    
    //Agregamos un evento a cada input
    inputNombre.addEventListener('input', validar);
    inputNombre.addEventListener('blur', validar);
    
    inputCorreo.addEventListener('input', validar);
    inputCorreo.addEventListener('blur', validar);
    
    inputNumero.addEventListener('input', validar);
    inputNumero.addEventListener('blur', validar);
    
    inputIngreso.addEventListener('blur', validarFecha);
    inputSalida.addEventListener('blur', validarFecha);
    
    inputHabMat.addEventListener('input', validarNumeroHab);
    inputHabKing.addEventListener('input', validarNumeroHab);
    inputDobles.addEventListener('input', validarNumeroHab);
    // btnBorrar.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     //reiniciamos el objeto formulario
    //     resetFormulario(e);
    // });
    btnEnviar.addEventListener('click', enviarFormlario);
    
    //Funcion para validar campos de texto
    function validar(e){
        if(e.target.value.trim() == ''){
            mostrarError('El campo es obligatorio', e.target.parentElement);
            formLleno[e.target.name] = '';
            comprobarFormulario();
            return;
        }
    
        if(e.target.id === 'correo' && !validarCorreo(e.target.value)){
            mostrarError('El correo no es valido', e.target.parentElement);
            formLleno[e.target.name] = '';
            comprobarFormulario();
            return;
        }
    
        if(e.target.id === 'numTelefono' && !validarNumeroTelefono(e.target.value)){
            mostrarError('El numero de telefono no es valido', e.target.parentElement);
            formLleno[e.target.name] = '';
            comprobarFormulario();
            return;
        }
    
        eliminarAlerta(e.target.parentElement);
    
        //Asignar los valores al objeto
        formLleno[e.target.name] = e.target.value.trim().toLowerCase();
    
        comprobarFormulario();
    
    }
    
    //Funcion para validar fechas
    function validarFecha(e){
    
        const fechaActual = new Date();
        console.log(fechaActual);
        const fechaIngreso = new Date(inputIngreso.value);
        console.log(fechaIngreso);
        const fechaSalida = new Date(inputSalida.value);
        console.log(fechaSalida);
    
        if(e.target.value.trim() == ''){
            mostrarError('El campo es obligatorio', divFechas.parentElement);
            formLleno[e.target.name] = '';
            comprobarFormulario();
            return;
        }
    
        if(e.target.id == 'fechaIngreso' && fechaIngreso < fechaActual){
            mostrarError('La fecha de ingreso no puede ser menor al dia actual', divFechas.parentElement);
            formLleno[e.target.name] = '';
            comprobarFormulario();
            return;
        }
    
        if(e.target.id == 'fechaSalida' && fechaIngreso > fechaSalida){
            mostrarError('La fecha de salida no puede ser menor que la de ingreso', divFechas.parentElement);
            formLleno[e.target.name] = '';
            comprobarFormulario();
            return;
        } 
    
        eliminarAlerta(divFechas.parentElement);
    
        //Asignar los valores al objeto
        formLleno[e.target.name] = e.target.value.trim().toLowerCase();
    
        comprobarFormulario();
    }
    
    //Funcion para validar numero de habitaciones
    function validarNumeroHab(e){ 
        const numeroHabMat = Number.parseInt(inputHabMat.value);
        const numeroHabKing = Number.parseInt(inputHabKing.value);
        const numeroHabDobles = Number.parseInt(inputDobles.value);
        let cantidadPagar = mostrarCantidadPagar(numeroHabMat, numeroHabKing, numeroHabDobles);
        if (e.target.id == 'habMat' && numeroHabMat < 0 || numeroHabMat > 9) {
            mostrarError('Cantidad de habitaciones matrimoniales invalida', e.target.parentElement);
            formLleno[e.target.name] = '';
            comprobarFormulario();
            return;
        } 
    
        if (e.target.id == 'habKing' && numeroHabKing < 0 || numeroHabKing > 7) {
            mostrarError('Cantidad de habitaciones king size invalida', e.target.parentElement);
            formLleno[e.target.name] = '';
            comprobarFormulario();
            return;
        }
    
        if (e.target.id == 'habDoble' && numeroHabDobles < 0 || numeroHabDobles > 2) {
            mostrarError('Cantidad de habitaciones dobles invalida', e.target.parentElement);
            formLleno[e.target.name] = '';
            comprobarFormulario();
            return;
        }
    
        eliminarAlerta(e.target.parentElement);
    
        //Asignar los valores al objeto
        formLleno[e.target.name] = e.target.value.trim().toLowerCase();
    
        // p de total a pagar
        totalPagar.textContent = `Total a pagar $${cantidadPagar}`;
        totalPagar.style.removeProperty('display')
        formLleno.totalPagar = cantidadPagar;
        comprobarFormulario();
    }
    
    function mostrarCantidadPagar(numeroHabMat, numeroHabKing, numeroHabDobles){
        let total = 0;
        total = (numeroHabMat * 300) + (numeroHabKing * 400) + (numeroHabDobles * 550);
        return total;
    }
    
    //Funcion para mostrar 'p' con el mensaje de error
    function mostrarError(mensaje, referencia){
        //Se comprueba si ya existe una alerta
        const alerta = referencia.querySelector('#msjError');
        if(alerta) {
            alerta.remove()
        }
    
        //Se genera el HTML para mostrar el error
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.id = 'msjError';
        
        //Se inserta el error en 'referencia'
        referencia.appendChild(error);
    }
    
    //Funcion para eliminar 'p' de error si ya existe
    function eliminarAlerta(referencia){
        const alerta = referencia.querySelector('#msjError');
        if(alerta){
            alerta.remove()
        }
    }
    
    //Funcion para validar el correo con una expresion regular
    function validarCorreo(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        return resultado;
    }
    
    //Funcion para validar el numero de telefono con una expresion regular
    function validarNumeroTelefono(numero){
        const regex = /^(\+?\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/ ;
        const resultado = regex.test(numero);
        return resultado;
    }
    
    //Funcion para comprobar que todo el formulario este completo
    function comprobarFormulario(){
        console.log(formLleno);
        if(!Object.values(formLleno).includes('')){
            btnEnviar.style.removeProperty('opacity');
            btnEnviar.disabled = false;
            return;
        }
        btnEnviar.style.opacity = '50%';
        btnEnviar.disabled = true;
    }
    
    //Funcion que se pone en la accion submmit, limpia el objeto y muestra mensaje
    function enviarFormlario(e){
        e.preventDefault();
        spinner.style.removeProperty('display');
    
        const {nombre, correo, numTelefono, fechaIngreso, fechaSalida, habMat, habKing, habDoble, totalPagar} = formLleno;
    
        axios({
            method: 'post',
            url: 'http://localhost:3000/reservar',
            data: {
                nombre,
                correo,
                numTelefono,
                fechaIngreso,
                fechaSalida,
                habMat,
                habKing,
                habDoble,
                totalPagar
            }
        }).then(function(res){
            console.log(res);
        }).catch(function(err){
            console.log(err);
        })
        
        setTimeout( () => {
            spinner.style.display = 'none';
            // reiniciamos el objeto 
            formLleno.nombre = '';
            formLleno.correo = '';
            formLleno.numTelefono = '';
            formLleno.fechaIngreso = '';
            formLleno.fechaSalida = '';
            formLleno.habMat = '';
            formLleno.habKing = '';
            formLleno.habDoble = '';
            formLleno.totalPagar = ''
            alertaEnviado('Formulario enviado correctamente', formulario);
            // formulario.reset();
        }, 3000);
    }
    
    function alertaEnviado(mensaje, referencia) {
        const alerta = document.createElement('P');
        alerta.id = 'enviado';
        alerta.textContent = mensaje;
        referencia.appendChild(alerta);
        setTimeout( () => {
            totalPagar.remove();
            alerta.remove();
        }, 3000);
        comprobarFormulario();
    }
    
    function resetFormulario(e){
        e.preventDefault();
        //reiniciamos el objeto 
        formLleno.nombre = '';
        formLleno.correo = '';
        formLleno.numTelefono = '';
        formLleno.fechaIngreso = '';
        formLleno.fechaSalida = '';
        formLleno.habMat = '';
        formLleno.habKing = '';
        formLleno.habDoble = '';
        formulario.reset();
        comprobarFormulario();
    }
});

