import { googleLogin } from '../../services/index.js';
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
        <button id="google-signin">Entrar com Google</button>
        <p>Ainda não possui conta? <a href="/register">Cadastre-se</a></p>
      </form>
  `;          // SPA - Corrigir href acima para evitar recarregamento da página!

  const loginBtn = rootElement.querySelector('#login-btn');
  loginBtn.addEventListener('click', (e) => {     // Mover função de login para services!
    e.preventDefault();
    const email = rootElement.querySelector('#user-email').value;
    const password = rootElement.querySelector('#user-password').value;
    console.log(email, password);

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        console.log('Entrou!', user);
        onNavigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Entrou não...', errorCode, errorMessage);
      });
  });

  const googleSignIn = rootElement.querySelector('#google-signin');
  googleSignIn.addEventListener('click', googleLogin);
  
  return rootElement;
};
