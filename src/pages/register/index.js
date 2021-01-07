import { googleLogin } from '../../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const Register = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <h1>Cadastro!</h1>
      <form>
        <input id="username" type="text" placeholder="Seu nome ou apelido" required><br>
        <input id="new-email" type="email" placeholder="Seu e-mail" required><br>
        <input id="new-password" type="password" placeholder="Senha" required><br>
        <button id="register-btn">Cadastrar</button>
        <p>-- ou --</p>
        <button id="google-signup">Continuar com Google</button>
        <p>Já possui conta? <a href="/login">Entrar</a></p>
      </form>
  `;          // SPA - Corrigir href acima para evitar recarregamento da página!

  const registerBtn = rootElement.querySelector('#register-btn');
  registerBtn.addEventListener('click', (e) => {      // Mover função de cadastro para services!
    e.preventDefault();
    const username = rootElement.querySelector('#username').value;
    const email = rootElement.querySelector('#new-email').value;
    const password = rootElement.querySelector('#new-password').value;
    console.log(username, email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        console.log('Deu bom! :D', user);
        onNavigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log('Deu ruim! :(', errorCode, errorMessage);
      });
  });

  const googleSignUp = rootElement.querySelector('#google-signup');
  googleSignUp.addEventListener('click', googleLogin);
  
  return rootElement;
};
