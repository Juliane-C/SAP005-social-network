import { googleLogin, emailLogin } from '../../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const Login = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <h1>Login!</h1>
      <form>
        <input id="user-email" type="email" placeholder="Seu e-mail" required><br>
        <input id="user-password" type="password" placeholder="Senha" required><br>
        <button id="login-btn">Entrar</button>
        <p>-- ou --</p>
        <button id="google-signin-btn">Entrar com Google</button>
        <p>Ainda não possui conta? <a href="#" id="register-link">Cadastre-se</a></p>
      </form>
  `;

  const loginBtn = rootElement.querySelector('#login-btn');
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = rootElement.querySelector('#user-email').value;
    const password = rootElement.querySelector('#user-password').value;
    emailLogin(email, password);
  });

  const googleSignInBtn = rootElement.querySelector('#google-signin-btn');
  googleSignInBtn.addEventListener('click', googleLogin);

  const registerLink = rootElement.querySelector('#register-link');
  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/register');
  });
  return rootElement;
};
