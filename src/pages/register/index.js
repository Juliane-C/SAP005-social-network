export const Register = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <h1>Cadastro!</h1>
      <input id="username" type="text" placeholder="Seu nome ou apelido" required>
      <input id="new-email" type="email" placeholder="Seu e-mail" required>
      <input id="new-password" type="password" placeholder="Senha" required>
      <button id="register-btn">Cadastrar</button>
  `;
  const registerBtn = rootElement.querySelector("#register-btn")
  registerBtn.addEventListener("click", () => {
    const username = rootElement.querySelector("#username").value
    const email = rootElement.querySelector("#new-email").value
    const password = rootElement.querySelector("#new-password").value
    console.log(username, email, password)
  })
  return rootElement;
};
