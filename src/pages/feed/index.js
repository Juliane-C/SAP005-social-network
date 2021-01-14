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
  logoutBtn.addEventListener('click', logout);

  const message = rootElement.querySelector('#message');
  const postsArea = rootElement.querySelector('#posts-area');
  const postsCollection = firebase.firestore().collection('posts');

  const postBtn = rootElement.querySelector('#post-btn');
  postBtn.addEventListener('click', createPost);

  function createPost(e) {
    e.preventDefault();
    const post = {
      message: message.value,
      user_id: firebase.auth().currentUser.uid,
      username: firebase.auth().currentUser.displayName,
      date: new Date().toLocaleString('pt-BR'),
    };
    postsCollection.add(post).then(() => {
      message.value = '';
      loadPosts();
    });
  }

  function addPost(post) {
    const postTemplate = document.createElement('div');
    postTemplate.classList.add('posts'); // como funciona esse classList?
    postTemplate.setAttribute('id', post.id); // Como funciona o SetAttribute?

    postTemplate.innerHTML = `
        <p><b>${post.data().username}</b></p>
        <p>${post.data().date}</p>
        <p>${post.data().message}</p>
        <div class='edit-del-btns'>
          <button class='edit-btn'>Editar</button>
          <button class='delete-btn'>Apagar</button>
        </div>

        <div class='editing-area'>
          <hr>
          <textarea class='edit-text'>${post.data().message}</textarea><br>
          <button class='save-edit-btn'>Salvar</button>
          <button class='cancel-edit-btn'>Cancelar</button>
        </div>
    `;

    const editBtnArray = postTemplate.querySelectorAll('.edit-btn');
    editBtnArray.forEach((editBtn) => {
      editBtn.addEventListener('click', () => {
        postTemplate.querySelector('.editing-area').classList.add('display');
      });
    });

    const editedText = postTemplate.querySelector('.edit-text');

    function editPost() {
      postsCollection.doc(post.id).update({ message: editedText.value })
      // console.log(post.id);
        .then(() => {
          loadPosts();
          console.log('Editou!');
        });
    }

    const saveEditBtn = postTemplate.querySelector('.save-edit-btn');
    saveEditBtn.addEventListener('click', editPost);

    const cancelEditBtn = postTemplate.querySelector('.cancel-edit-btn');
    cancelEditBtn.addEventListener('click', () => {
      postTemplate.querySelector('.editing-area').classList.remove('display');
    });

    const deleteBtn = postTemplate.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      const confirmAction = confirm('Você realmente deseja apagar?');
      if (confirmAction === true) {
        // console.log(post.id);
        removePost(post.id);
        loadPosts();
      } else {
        console.log('Nada foi apagado.');
      }
    });

    return postTemplate;
  }

  function removePost(id) {
    postsCollection.doc(id).delete()
      .then(() => {
        console.log('Apagou!');
      })
      .catch((error) => {
        console.error('Erro ao excluir o post: ', error);
      });
  }
  // console.log(removePost(id));
  // testar o id existente do post aqui para ver se esta apagando de fato.

  function loadPosts() {
    postsArea.innerHTML = 'Carregando...';
    postsCollection.orderBy('date', 'desc').get().then((snap) => {
      postsArea.innerHTML = '';
      snap.forEach((post) => {
        postsArea.appendChild(addPost(post));
      });
    });
  }
  loadPosts();

  return rootElement;
};
