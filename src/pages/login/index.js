export const Login = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <input id="user-email" type="email" placeholder="Insira seu e-mail" required> E-mail:</input>
  <input id="user-password" type="password" placeholder="Insira sua senha" required> Senha:</input>
  <button id="login-btn">Fazer login</button>
  `;
  const loginBtn = rootElement.querySelector("#login-btn")
  loginBtn.addEventListener("click", () => {
  let userEmail = rootElement.querySelector("#user-email").value
  let userPassword = rootElement.querySelector("#user-password").value
  console.log(userEmail, userPassword)
  })
  
  return rootElement;
};
