import { logout } from '../../services/index.js';

export const Feed = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <button id="logout-btn">Sair</button>
      <h1>Olá, ${firebase.auth().currentUser.displayName}!</h1>
      <form id="post-form">
        <textarea id="message" cols="25" rows="5" placeholder="O que você quer compartilhar?"></textarea><br>
        <button id="post-btn">Publicar</button>
      </form>
      <section id="posts-area"></section>
  `;

  const logoutBtn = rootElement.querySelector('#logout-btn');
  const message = rootElement.querySelector('#message');
  const postBtn = rootElement.querySelector('#post-btn');
  const postsArea = rootElement.querySelector('#posts-area');
  const postsCollection = firebase.firestore().collection('posts');

  logoutBtn.addEventListener('click', logout);
  postBtn.addEventListener('click', createPost);

  function createPost(e) {
    e.preventDefault();
    const post = {
      message: message.value,
      user_id: firebase.auth().currentUser.uid,
      username: firebase.auth().currentUser.displayName,
      date: new Date()
    }
    postsCollection.add(post).then(result => {
      message.value = ''
      loadPosts()
    })
  };

  function addPost(post) {
    const postTemplate = `
      <div class='posts' id='${post.id}'>
        <p><b>${post.data().username}</b></p>
        <p>${post.data().message}</p>
      </div>
    `;
    postsArea.innerHTML += postTemplate;
  }

  function loadPosts() {
    postsArea.innerHTML = 'Carregando...';
    postsCollection.get().then(snap => {
      postsArea.innerHTML = '';
      snap.forEach(post => {
        addPost(post);
      })
    })
  }
  loadPosts();
  
  return rootElement;
};
