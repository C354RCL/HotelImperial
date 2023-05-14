//Se hace la peticion a la API para obtener los registros
axios
  .get("http://localhost:3000/registros")
  .then((response) => {
    obtenerDatos(response.data);
    crearHileras(registros);
  })
  .catch((error) => {
    console.error(error);
  });

//Se crea la constante donde se guardaran los registros
const registros = [];

//Funcion que obtiene los datos y los almacena
function obtenerDatos(data) {
  //Se hace un ciclo foreach para recorrer lois datos que se obtienen
  data.forEach((element, i) => {
    const registro = {
      ID: element.ID,
      nombre: element.nombre,
      correo: element.correo,
      telefono: element.telefono,
      fecIngreso: element.fecIngreso.slice(0,10),
      fecSalida: element.fecSalida.slice(0,10),
      noHabMat: element.noHabMat,
      noHabKin: element.noHabKin,
      noHabDob: element.noHabDob,
      totalPagar: element.totalPagar,
    };
    //Se agrega los datos obtenidos al objeto
    registros.push(registro);
  });
  return registros;
}

//Funcion que recorre los datos del objeto y crea las hileras
function crearHileras(obj) {
  const tblBody = document.querySelector("#body-table");
  
  obj.forEach((e, i) => {
    const hilera = document.createElement("tr");
    hilera.classList.add('registros');
    const id_hilera = document.createElement("td");
    const nombre_hilera = document.createElement("td");
    const correo_hilera = document.createElement("td");
    const telefono_hilera = document.createElement("td");
    const fechaI_hilera = document.createElement("td");
    const fechaS_hilera = document.createElement("td");
    const noHabMat_hilera = document.createElement("td");
    const noHabKin_hilera = document.createElement("td");
    const noHabDob_hilera = document.createElement("td");
    const totalPagar_hilera = document.createElement("td");
    id_hilera.textContent = obj[i].ID;
    nombre_hilera.textContent = obj[i].nombre;
    correo_hilera.textContent = obj[i].correo;
    telefono_hilera.textContent = obj[i].telefono;
    fechaI_hilera.textContent = obj[i].fecIngreso;
    fechaS_hilera.textContent = obj[i].fecSalida;
    noHabMat_hilera.textContent = obj[i].noHabMat;
    noHabKin_hilera.textContent = obj[i].noHabKin;
    noHabDob_hilera.textContent = obj[i].noHabDob;
    totalPagar_hilera.textContent = obj[i].totalPagar;

    hilera.appendChild(id_hilera);
    hilera.appendChild(nombre_hilera);
    hilera.appendChild(correo_hilera);
    hilera.appendChild(telefono_hilera);
    hilera.appendChild(fechaI_hilera);
    hilera.appendChild(fechaS_hilera);
    hilera.appendChild(noHabMat_hilera);
    hilera.appendChild(noHabKin_hilera);
    hilera.appendChild(noHabDob_hilera);
    hilera.appendChild(totalPagar_hilera);
    tblBody.appendChild(hilera);
  });
}

//Funcion que elimina las hileras creadas
function eliminarHileras(){
  const hileras = document.querySelectorAll('.registros');
  console.log(hileras);
  hileras.forEach((e, i) => {
    hileras[i].remove();
  }); 
}

//Se obtienen los inputs para leer los datos que se ingresan
const inputBucarNombre = document.querySelector('#busquedaNombre');
const inputBuscarCorreo = document.querySelector('#busquedaCorreo');
const inputBuscarTelefono = document.querySelector('#busquedaTelefono');
const inputBuscarFecha = document.querySelector('#busquedaFecha');
const btnBuscar = document.querySelector('#buscar');

//Se le agrega un evento al botn BUSCAR
btnBuscar.addEventListener('click', () => {
  let nuevoArreglo = [];
  eliminarHileras();

  //Busqueda por nombre
  if(inputBucarNombre.value !== '') {
    registros.forEach((e, i) => {
      let existe = registros[i].nombre.includes(inputBucarNombre.value.toLowerCase());
      if(existe){
        nuevoArreglo.push(registros[i])
        crearHileras(nuevoArreglo);
        return
      }
    });
  }

  //Busqueda por correo 
  if(inputBuscarCorreo.value !== '') {
    registros.forEach((e, i) => {
      let existe = registros[i].correo.includes(inputBuscarCorreo.value.toLowerCase());
      if(existe) {
        nuevoArreglo.push(registros[i]);
        crearHileras(nuevoArreglo);
        return
      }
    });
  }

  if(inputBuscarTelefono.value !== '') {
    registros.forEach((e, i) => {
      let existe = registros[i].telefono.includes(inputBuscarTelefono.value);
      if(existe) {
        nuevoArreglo.push(registros[i]);
        crearHileras(nuevoArreglo);
        return
      }
    });
  }

  if(inputBuscarFecha.value !== '') {
    registros.forEach((e, i) => {
      let existe = registros[i].fecIngreso.includes(inputBuscarFecha.value);
      if(existe) {
        nuevoArreglo.push(registros[i]);
        crearHileras(nuevoArreglo);
        return
      }
    });
  }
  
});

