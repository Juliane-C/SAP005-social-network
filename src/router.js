// Este é seu ponto de entrada da sua aplicação
import { Home } from './pages/home/index.js';
import { Login } from './pages/login/index.js';
import { Register } from './pages/register/index.js';
import { Feed } from './pages/feed/index.js';
import { onNavigate } from './utils/history.js';

const routeRender = () => {
  const rootDiv = document.getElementById('root');
  const routes = {
    '/': Home,
    '/login': Login,
    '/register': Register,
    '/feed': Feed,
  };

  rootDiv.innerHTML = '';
  rootDiv.appendChild(routes[window.location.pathname]());
  /* Na linha 18 está criando uma "div filha",que está "chamando" para o HTML
  uma das propiedades do objeto routes, que acaba por chamar a função
  correspondente aquele objeto. Tudo isso através do esquema de importação. */
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  document
    .getElementById('home')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/');
    });
  document
    .getElementById('login')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/login');
    });
  document
    .getElementById('register')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/register');
    });
  /* document
    .getElementById('feed')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/feed');
    }); */

  routeRender();
});
