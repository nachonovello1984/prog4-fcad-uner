const API_URL = 'http://localhost:3001/api/v1/actors';

export function renderChosen() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h1>Actores seleccionados</h1>
    <table>
      <thead>
        <tr><td>Id</td><td>Nombre</td><td>Apellido</td></tr>
      </thead>
      <tbody></tbody>
    </table>
  `;
  const tbody = container.querySelector('tbody');

  fetch(`${API_URL}/chosen`, { method: 'GET', credentials: 'include' })
    .then((res) => res.json())
    .then((response) => {
      if (response.status !== 'OK') {
        console.log(response.data.error);
        return;
      }
      for (const item of response.data) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.actorId}</td>
          <td>${item.firstName}</td>
          <td>${item.lastName}</td>
        `;
        tbody.appendChild(tr);
      }
    })
    .catch((err) => console.log(err));

  return container;
}
