import { API, setToken } from './api.js';
import { setEstado } from './ui.js';
import { iniciarNav } from './sesion.js';

iniciarNav();

const form = document.querySelector('form');
const estado = document.querySelector('.estado');

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const datos = new FormData(form);
    setEstado(estado, 'Ingresando...');
    try {
        const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: datos.get('username'), password: datos.get('password') })
        });
        const cuerpo = await res.json();
        if (!res.ok) throw new Error(cuerpo.message || `Error ${res.status}`);
        setToken(cuerpo.token);
        location.href = '/cursos.html';
    } catch (e) {
        setEstado(estado, e.message, 'error');
    }
});
