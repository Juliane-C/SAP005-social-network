import { onNavigate } from '../utils/history.js';

export const googleLogin = (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log('Googlou!');
      console.log(token, user);
      onNavigate('/feed');
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;
      alert(errorMessage);
    });
};

export const emailRegister = (username, email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('Deu bom! :D', user);
      firebase.auth().currentUser.updateProfile({ displayName: username })
        .then(() => {
          onNavigate('/feed');
        });
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

export const emailLogin = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      console.log('Entrou!', user);
      onNavigate('/feed');
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

export const logout = () => {
  firebase.auth().signOut()
    .then(() => {
      // Sign-out successful.
      // console.log('Saiu!');
      onNavigate('/');
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
};

/*
export const verifyUser = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });
};
*/

/*
// Sobre persistência de dados: https://firebase.google.com/docs/auth/web/auth-state-persistence?authuser=0

export const persistence = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION) // ou LOCAL
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
};
*/

export const myFunction = () => {
  // seu código aqui
  console.log('Olá mundo!');
};
