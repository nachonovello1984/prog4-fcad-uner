import { getToken, clearToken } from './api.js';

export const haySesion = () => !!getToken();

// Ajusta el enlace de la barra de navegación según haya sesión o no
export function iniciarNav() {
    const enlace = document.querySelector('#enlace-sesion');
    if (!haySesion()) return;
    enlace.textContent = 'Cerrar sesión';
    enlace.addEventListener('click', (ev) => {
        ev.preventDefault();
        clearToken();
        location.href = '/login.html';
    });
}
