export const Home = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  // ${firebase.auth().currentUser.displayName} para mostrar o nome do usuário logado na saudação
  rootElement.innerHTML = `
      <h1>Olá, mundo!</h1>
      <form id="post-form">
        <textarea id="message" cols="25" rows="5" placeholder="O que você quer compartilhar?"></textarea><br>
        <button id="post-btn">Publicar</button>
      </form>
      <div id="posts-area"></div>
  `;

  const message = rootElement.querySelector('#message');
  const postBtn = rootElement.querySelector('#post-btn');
  const postsArea = rootElement.querySelector('#posts-area');
  const postsCollection = firebase.firestore().collection('posts');

  postBtn.addEventListener('click', createPost);

  function createPost(e) {
    e.preventDefault();
    const post = {
      message: message.value,
      user_id: firebase.auth().currentUser.uid,
      date: new Date()
    }
    postsCollection.add(post) //.then(() => {postsArea.innerHTML = message.value;})
  };

  function addPost(post) {
    const postTemplate = `
      <li id='${post.id}'>
        ${post.data().message}
      </li>
    `;
    postsArea.innerHTML += postTemplate;
  }

  
  function loadPosts() {
    postsArea.innerHTML = 'Carregando...';
    postsCollection.get().then(snap => {
      postsArea.innerHTML = '';
      snap.forEach(post => {
        addPost(post); //aqui está sendo chamada a função de adicionar post já com os valores
      })
    })
  }
  loadPosts();

  //colocar essa função dentro dos posts

  /*function excluirPost(idPost){
    postsCollection.doc(idPost).delete().then(doc => {
      console.log("Eu consegui apagar!");
      loadPosts()
    })//add um .catch
  }
  excluirPost("k6u9XlOx2KVy8pLbuMgNfBROziF3"); //testar o id existente do post aqui para ver se esta apagando de fato 
*/
  return rootElement;
};

