import { API } from './api.js';
import { formatearFecha, llenarTabla, setEstado } from './ui.js';
import { iniciarNav } from './sesion.js';

const ENCABEZADOS = ['ID', 'Documento', 'Apellido', 'Nombres', 'Email', 'Fecha de nacimiento'];
const POR_PAGINA = 15;

iniciarNav();

const estado = document.querySelector('.estado');
const tabla = document.querySelector('table');
const btnAnterior = document.querySelector('#pag-anterior');
const btnSiguiente = document.querySelector('#pag-siguiente');
const infoPagina = document.querySelector('#pag-info');

let pagina = 1;
let totalPaginas = 1;

async function pedir(ruta) {
    const res = await fetch(`${API}${ruta}`);
    const datos = await res.json();
    if (!res.ok) throw new Error(datos.message || datos.error || `Error ${res.status}`);
    return datos;
}

async function cargarPagina(nueva) {
    setEstado(estado, 'Cargando...');
    btnAnterior.disabled = btnSiguiente.disabled = true;
    try {
        const offset = (nueva - 1) * POR_PAGINA;
        const [{ count }, estudiantes] = await Promise.all([
            pedir('/estudiantes/count'),
            pedir(`/estudiantes?order=apellido&limit=${POR_PAGINA}&offset=${offset}`)
        ]);
        pagina = nueva;
        totalPaginas = Math.max(1, Math.ceil(count / POR_PAGINA));
        llenarTabla(tabla, ENCABEZADOS, estudiantes.map(e => [
            e.idEstudiante, e.documento, e.apellido, e.nombres, e.email, formatearFecha(e.fechaNacimiento)
        ]));
        infoPagina.textContent = `Página ${pagina} de ${totalPaginas} (${count} estudiantes)`;
        setEstado(estado, '');
    } catch (e) {
        setEstado(estado, e.message, 'error');
    }
    btnAnterior.disabled = pagina <= 1;
    btnSiguiente.disabled = pagina >= totalPaginas;
}

btnAnterior.addEventListener('click', () => cargarPagina(pagina - 1));
btnSiguiente.addEventListener('click', () => cargarPagina(pagina + 1));

await cargarPagina(1);
