import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAeSXsaCzISb5qvr88Plcp7YuSvyhSwtEQ",
    authDomain: "pokecard-2e6b8.firebaseapp.com",
    databaseURL: "https://pokecard-2e6b8.firebaseio.com",
    projectId: "pokecard-2e6b8",
    storageBucket: "pokecard-2e6b8.appspot.com",
    messagingSenderId: "968558617667"
  };
  firebase.initializeApp(config);

  export default firebase;