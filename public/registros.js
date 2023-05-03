axios
  .get("http://localhost:3000/registros")
  .then((response) => {
    obtenerDatos(response.data);
    crearHileras(registros);
  })
  .catch((error) => {
    console.error(error);
  });

const registros = [];
function obtenerDatos(data) {
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
    registros.push(registro);
  });
  return registros;
}

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

