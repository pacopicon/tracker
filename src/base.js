import firebase from 'firebase';
import { database } from 'firebase';
import Rebase from 're-base';

const app = firebase.initializeApp({
  apiKey: "AIzaSyATj_L8WZ1X4nmDnebaT0hnXVziJFu_IIc",
  authDomain: "tracker-675ec.firebaseapp.com",
  databaseURL: "https://tracker-675ec.firebaseio.com",
  projectId: "tracker-675ec",
  storageBucket: "",
  messagingSenderId: "763225130025"
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
