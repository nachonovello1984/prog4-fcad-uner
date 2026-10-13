import { API, getToken, clearToken } from './api.js';
import { formatearFecha, llenarTabla, setEstado } from './ui.js';
import { iniciarNav } from './sesion.js';

const ENCABEZADOS = ['ID', 'Nombre', 'Descripción', 'Fecha de inicio', 'Horas', 'Inscriptos máx.', 'Estado'];

iniciarNav();

const estado = document.querySelector('.estado');
const tabla = document.querySelector('table');

if (!getToken()) {
    setEstado(estado, 'Necesitás iniciar sesión para ver los cursos.', 'error');
} else {
    setEstado(estado, 'Cargando...');
    try {
        const res = await fetch(`${API}/cursos`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        if (res.status === 401) {
            clearToken();
            throw new Error('La sesión expiró o el token es inválido. Volvé a iniciar sesión.');
        }
        const cursos = await res.json();
        if (!res.ok) throw new Error(cursos.message || `Error ${res.status}`);
        llenarTabla(tabla, ENCABEZADOS, cursos.map(c => [
            c.idCurso, c.nombre, c.descripcion, formatearFecha(c.fechaInicio), c.cantidadHoras, c.inscriptosMax, c.estado
        ]));
        setEstado(estado, `${cursos.length} curso(s).`);
    } catch (e) {
        setEstado(estado, e.message, 'error');
    }
}
