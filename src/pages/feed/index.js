import { logout } from '../../services/index.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <button id='logout-btn'>Sair</button>
      <h2>Olá, ${firebase.auth().currentUser.displayName}!</h2>
      <form id='post-form'>
        <textarea id='message' cols='30' rows='5' placeholder='O que você quer compartilhar?'></textarea><br>
        <button id='post-btn'>Postar!</button>
      </form>
      <section id='posts-area'></section>
  `;

  const logoutBtn = rootElement.querySelector('#logout-btn');
  logoutBtn.addEventListener('click', logout);

  const message = rootElement.querySelector('#message');
  const postsArea = rootElement.querySelector('#posts-area');
  const postsCollection = firebase.firestore().collection('posts');

  const postBtn = rootElement.querySelector('#post-btn');
  postBtn.addEventListener('click', createPost);
  const userId = firebase.auth().currentUser.uid;

  function createPost(e) {
    e.preventDefault();
    const post = {
      message: message.value,
      user_id: userId,
      username: firebase.auth().currentUser.displayName,
      date: new Date().toLocaleString('pt-BR'),
      likes: [],
    };
    postsCollection.add(post).then(() => {
      message.value = '';
      loadPosts();
    });
  }

  function addPost(post) {
    const postTemplate = document.createElement('div');
    postTemplate.classList.add('posts'); // add a class 'posts' para todas as divs criadas (1 div = 1 post)
    postTemplate.setAttribute('id', post.id); // atribui id único para cada div (id firestore de cada post)

    postTemplate.innerHTML = `
        <p><b>${post.data().username}</b>
        <br>${post.data().date}</p>
        <p>${post.data().message}</p>
        <div class='container-btns'>
          <button class='edit-btn'>Editar</button>
          <button class='delete-btn'>Apagar</button>
          <button class='like-btn'>❤️ ${post.data().likes.length}</button>
        </div>

        <div class='editing-area'>
          <hr>
          <textarea class='edit-text'>${post.data().message}</textarea><br>
          <button class='save-edit-btn'>Salvar</button>
          <button class='cancel-edit-btn'>Cancelar</button>
        </div>
    `;

    if (userId !== post.data().user_id) {
      postTemplate.querySelector('.edit-btn').style.display = 'none';
      postTemplate.querySelector('.delete-btn').style.display = 'none';
    }

    const editBtnArray = postTemplate.querySelectorAll('.edit-btn');
    editBtnArray.forEach((editBtn) => {
      editBtn.addEventListener('click', () => {
        postTemplate.querySelector('.editing-area').classList.add('display');
      });
    });

    function editPost() {
      const editedText = postTemplate.querySelector('.edit-text');
      postsCollection.doc(post.id).update({ message: editedText.value })
      // console.log(post.id);
        .then(() => {
          loadPosts();
          // console.log('Editou!');
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
      const confirmAction = window.confirm('Você realmente deseja apagar?');
      if (confirmAction === true) {
        // console.log(post.id);
        removePost(post.id);
        loadPosts();
      } else {
        console.log('Nada foi apagado.');
      }
    });

    const likeBtn = postTemplate.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => {
      addLike(post);
    });

    return postTemplate;
  }

  function addLike(post) {
    // console.log(post);
    // e.target.classList.add('curtidas')
    const userLiked = post.data().likes.find((user) => user === userId);
    console.log(userLiked);
    if (userLiked) {
      postsCollection.doc(post.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(userId),
      })
      // console.log(post.id);
        .then(() => {
          loadPosts();
          // console.log('Removeu like');
        });
    } else {
      postsCollection.doc(post.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(userId),
      })
        .then(() => {
          loadPosts();
          // console.log('Deu like');
        });
    }
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
