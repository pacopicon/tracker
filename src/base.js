import firebase from 'firebase';
import { database } from 'firebase';
import Rebase from 're-base';

const app = firebase.initializeApp({
  apiKey: "AIzaSyC9bwyy9NHISIZbKFerdIU_jjAdDeZq-To",
  authDomain: "testtrakker.firebaseapp.com",
  databaseURL: "https://testtrakker.firebaseio.com",
  projectId: "testtrakker",
  storageBucket: "testtrakker.appspot.com",
  messagingSenderId: "446548077493"
});

const base = Rebase.createClass(app.database());
const db = database(app);

const rebase = {
  app: app,
  base: base,
  db: db
}

// const fbProvider = new firebase.auth.FacebookAuthProvider();
// const ghProvider = new firebase.auth.GithubAuthProvider();
// const twProvider = new firebase.auth.TwitterAuthProvider();

// export function oAuthSignIn(provider, func) {
//   app.auth().signInWithPopup(provider).then((result) => {
//     console.log('token = ' + token + ', user = ' + user);
//     const token = result.credential.accessToken;
//     const user = result.user;
//     const authData = {
//       token: token,
//       user: user
//     }
//     return authData
//   });
// }

export default rebase;
