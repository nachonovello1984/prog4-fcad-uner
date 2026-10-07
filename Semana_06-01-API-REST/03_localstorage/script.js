const CLAVE = 'alumnos';

const form = document.getElementById('form-alumno');
const tabla = document.getElementById('tabla-alumnos');
const cuerpo = tabla.querySelector('tbody');
const vacio = document.getElementById('vacio');
const mensaje = document.getElementById('mensaje');

function obtenerAlumnos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
}

function guardarAlumnos(alumnos) {
  localStorage.setItem(CLAVE, JSON.stringify(alumnos));
}

function formatearFecha(iso) {
  const [anio, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${anio}`;
}

function mostrarAlumnos() {
  const alumnos = obtenerAlumnos();
  cuerpo.innerHTML = '';

  alumnos.forEach((alumno, indice) => {
    const fila = document.createElement('tr');

    [alumno.apellido, alumno.nombre, alumno.documento, formatearFecha(alumno.fechaNacimiento)]
      .forEach((valor) => {
        const celda = document.createElement('td');
        celda.textContent = valor;
        fila.appendChild(celda);
      });

    const celdaAcciones = document.createElement('td');
    const botonEliminar = document.createElement('button');
    botonEliminar.type = 'button';
    botonEliminar.className = 'eliminar';
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => eliminarAlumno(indice));
    celdaAcciones.appendChild(botonEliminar);
    fila.appendChild(celdaAcciones);

    cuerpo.appendChild(fila);
  });

  const hayAlumnos = alumnos.length > 0;
  tabla.classList.toggle('oculto', !hayAlumnos);
  vacio.classList.toggle('oculto', hayAlumnos);
}

function eliminarAlumno(indice) {
  const alumnos = obtenerAlumnos();
  alumnos.splice(indice, 1);
  guardarAlumnos(alumnos);
  mostrarAlumnos();
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const alumno = {
    apellido: form.apellido.value.trim(),
    nombre: form.nombre.value.trim(),
    documento: form.documento.value.trim(),
    fechaNacimiento: form.fechaNacimiento.value,
  };

  const alumnos = obtenerAlumnos();

  if (alumnos.some((a) => a.documento === alumno.documento)) {
    mensaje.textContent = 'Ya existe un alumno con ese documento.';
    return;
  }

  mensaje.textContent = '';
  alumnos.push(alumno);
  guardarAlumnos(alumnos);
  mostrarAlumnos();
  form.reset();
  form.apellido.focus();
});

mostrarAlumnos();
