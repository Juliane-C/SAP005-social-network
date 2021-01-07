// exporte suas funções

import { onNavigate } from "../utils/history.js";

export const myFunction = () => {
  // seu código aqui
  console.log('Olá mundo!');
};

export const googleLogin = (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      console.log('Googlou!') 
      console.log(token, user);
      onNavigate('/');
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.log('Googlou não...');
      console.log(errorCode, errorMessage, email, credential);
    });
};
