export function renderHome() {
  const ul = document.createElement('ul');
  ul.innerHTML = `
    <li><a href="/list" data-link>Listado de Actores</a></li>
    <li><a href="/chosen" data-link>Actores seleccionados</a></li>
  `;
  return ul;
}
