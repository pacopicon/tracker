import React from 'react'; // always need this in every module, along with everything else you need to import
import { getFunName } from '../helpers';
import firebase from 'firebase';
import { database } from 'firebase';
import rebase from '../base';

class Landing extends React.Component {
  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  goToStore(event) {
    event.preventDefault();
    console.log('You changed the URL');
    // first grab the text from the box
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    // second we're going to transition from / to /store/:storeID
    // this.context.router.transitionTo(`/store/${storeId}`);

    this.props.location.pathname = `/store/${storeId}`;
    this.props.history.push(`/store/${storeId}`);
    this.props.history.replace(`/store/${storeId}`);
  }

  componentDidMount() {
    rebase.app.auth().onAuthStateChanged((user, error) => {
      if(user) {
        this.authHandler({user});
      }
    });
  };

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);

    rebase.app.auth().signInWithPopup(provider).then((result) => {
      const token = result.credential.accessToken;
      const user = result.user;
      console.log('token = ' + token + ', user = ' + user);
      const authData = {
        token: token,
        user: user
      }
      this.authHandler(authData);
    });

  }

  authHandler(authData) {
    console.log('authData = ', authData);
    if(!authData || typeof authData === "undefined") {
      console.log('did not receive authData for this signup session');
      return;
    }

    // grab the store info
    const user = authData.user;
    const userRef = database(rebase.app).ref().child(`users/${user.uid}`);

    // query the firebase once for the store data
    userRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already

      if(!data.owner) {
        userRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });

    this.props.location.pathname = `/UserPage`;
    this.props.history.push(`/UserPage`);
    this.props.history.replace(`/UserPage`);
  }

  renderLogin() {
    const fbprovider = new firebase.auth.FacebookAuthProvider();

    return (
      <nav className="login">
        <h2>UserPage</h2>
        <p>Sign in to manage your store's UserPage</p>
        <button className="facebook" onClick={() => this.authenticate(fbprovider)}>Log In with Facebook</button>
      </nav>
    )
  }

  // ReactDom.render()
  render() {


    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // if(this.state.uid !== this.state.owner) {
    //   return (
    //     <div>
    //       <p>Sorry you aren't the owner of the store!</p>
    //       {logout}
    //     </div>
    //   )
    // }
    // 1st way of rendering HTML onto DOM: w/o JSX:
    -->// return React.createElement('p', {classname: 'Testing'}, 'I  love you')
    // 2nd way of rendering HTML onto DOM: one-liner w/ JSX:
    -->// return <p>Hello</p>
    // 3rd way of rendering HTML onto DOM: multi-line w/ JSX:
    //-->
    return (
      // Comment like this here
      // <form className="store-selector" onSubmit={(this.goToStore.bind(this)}>
      // The above vunction syntax is more verbose, but ties the above call to the constructor
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
      {/* The above function syntax is easy but will be fired by any 'goToStore' */}
        {/* But omment like this over here! */}
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
        <button type="submit">Visit Store -></button>
      </form>
      // <p></p> --> cannot do this, you must always only return one parent element.  Otherwise you get this error: 'Syntax error: Adjacent JSX elements must be wrapped in an enclosing tag'
    )
  }
}

// Landing.propTypes = {
//   storeID: PropTypes.string.isRequired
// };

export default Landing;
