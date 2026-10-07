import './style.css';
import { renderHome } from './pages/home.js';
import { renderList } from './pages/list.js';
import { renderChosen } from './pages/chosen.js';

const routes = {
  '/': renderHome,
  '/list': renderList,
  '/chosen': renderChosen,
};

const app = document.getElementById('app');

function render() {
  const page = routes[window.location.pathname] ?? renderHome;
  app.replaceChildren(page());
}

// Navegación del lado del cliente: intercepta los links internos
document.addEventListener('click', (evt) => {
  const link = evt.target.closest('a[data-link]');
  if (!link) return;
  evt.preventDefault();
  history.pushState(null, '', link.getAttribute('href'));
  render();
});

window.addEventListener('popstate', render);

render();
