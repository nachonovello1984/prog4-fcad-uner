// Muestra un mensaje de estado; clase opcional ('error')
export function setEstado(el, texto, clase = '') {
    el.textContent = texto;
    el.className = clase;
}

export function formatearFecha(valor) {
    if (!valor) return '';
    const d = new Date(valor);
    return isNaN(d) ? valor : d.toLocaleDateString('es-AR', { timeZone: 'UTC' });
}

// Dibuja una tabla con encabezados y filas (arrays de valores)
export function llenarTabla(tabla, encabezados, filas) {
    const thead = tabla.createTHead();
    thead.replaceChildren();
    const trh = thead.insertRow();
    for (const h of encabezados) {
        const th = document.createElement('th');
        th.textContent = h;
        trh.appendChild(th);
    }

    const tbody = tabla.tBodies[0] ?? tabla.createTBody();
    tbody.replaceChildren();
    for (const valores of filas) {
        const tr = tbody.insertRow();
        for (const v of valores) tr.insertCell().textContent = v ?? '';
    }
}
