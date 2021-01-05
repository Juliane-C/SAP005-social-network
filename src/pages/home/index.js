export const Home = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <h1>Olá, mundo!</h1>
      <button id="go-to-login">Acesse sua conta</button>
      <button id="go-to-register">Cadastre-se</button>
  `;
  return rootElement;
};
