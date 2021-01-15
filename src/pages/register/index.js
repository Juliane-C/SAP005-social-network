import { googleLogin, emailRegister } from '../../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <h2>Cadastre-se aqui!</h2>
      <form>
        <input id='username' class='user-input' type='text' placeholder='Seu nome ou apelido' required><br>
        <input id='new-email' class='user-input' type='email' placeholder='Seu e-mail' required><br>
        <input id='new-password' class='user-input' type='password' placeholder='Senha' required><br>
        <button id='register-btn'>Cadastrar</button>
        <p>-- ou --</p>
        <button id='google-signup-btn'>Continuar com Google</button>
        <p>Já possui conta? <a href='#' id='login-link'>Entrar</a></p>
      </form>
  `;

  const registerBtn = rootElement.querySelector('#register-btn');
  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = rootElement.querySelector('#username').value;
    const email = rootElement.querySelector('#new-email').value;
    const password = rootElement.querySelector('#new-password').value;
    if (!username) {
      alert('Ops, você não preencheu seu nome!');
    } else {
      emailRegister(username, email, password);
    }
  });

  const googleSignUpBtn = rootElement.querySelector('#google-signup-btn');
  googleSignUpBtn.addEventListener('click', googleLogin);
  const loginLink = rootElement.querySelector('#login-link');
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/login');
  });

  return rootElement;
};
