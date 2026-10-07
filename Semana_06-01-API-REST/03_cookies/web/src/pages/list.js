const API_URL = 'http://localhost:3001/api/v1/actors';

function seleccionar(actorId) {
  fetch(`${API_URL}/${actorId}/choose`, {
    method: 'PUT',
    credentials: 'include',
  })
    .then((res) => res.json())
    .then(() => console.log(`Actor ${actorId} seleccionado con éxito!`))
    .catch((err) => console.log(err));
}

function renderRows(tbody, actors) {
  for (const item of actors) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.actorId}</td>
      <td>${item.firstName}</td>
      <td>${item.lastName}</td>
      <td><a class="btn">Seleccionar</a></td>
    `;
    tr.querySelector('.btn').addEventListener('click', () => seleccionar(item.actorId));
    tbody.appendChild(tr);
  }
}

export function renderList() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h1>Lista de Actores</h1>
    <table>
      <thead>
        <tr><td>Id</td><td>Nombre</td><td>Apellido</td><td>Acción</td></tr>
      </thead>
      <tbody></tbody>
    </table>
  `;
  const tbody = container.querySelector('tbody');

  fetch(`${API_URL}?limit=15`)
    .then((res) => res.json())
    .then((data) => renderRows(tbody, data.data ?? []))
    .catch((err) => console.log(err));

  return container;
}
