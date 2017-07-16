import React from 'react'; // always need this in every module, along with everything else you need to import
import { getFunName } from '../helpers';
import firebase from 'firebase';
import { database } from 'firebase';
import rebase from '../base';
import PropTypes from 'prop-types';
import big from '../assets/images/big.png';

class Landing extends React.Component {
  constructor() {
    super();
    this.grabIdAndEnter = this.grabIdAndEnter.bind(this);
    // this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  grabIdAndEnter(authData) {
    // event.preventDefault();
    console.log('You changed the URL');
    // first grab the text from the box
    const userID = authData.user.uid;
    console.log(`Going to ${userID}`);
    // second we're going to transition from / to /store/:storeID
    // this.context.router.transitionTo(`/store/${storeId}`);

    // this.props.location.pathname = `/store/${storeId}`;
    // this.props.history.push(`/store/${storeId}`);
    // this.props.history.replace(`/store/${storeId}`);

    this.props.location.pathname = `/UserPage/${userID}`;
    this.props.history.push(`/UserPage/${userID}`);
    this.props.history.replace(`/UserPage/${userID}`);
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
      this.grabIdAndEnter(authData);
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
    // const userRef = database(rebase.app).ref().child(`users/${user.uid}`);
    const userRef = database(rebase.app).ref(user.uid);

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

    // this.props.location.pathname = `/UserPage`;
    // this.props.history.push(`/UserPage`);
    // this.props.history.replace(`/UserPage`);
  }

  // renderLogin() {
  //
  //
  //   return (
  //     <nav className="login">
  //       <h2>UserPage</h2>
  //       <p>Sign in to manage your store's UserPage</p>
  //
  //     </nav>
  //   )
  // }

  // ReactDom.render()
  render() {
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    const title = "TestTrakker"

    // if(!this.state.uid) {
    //   return <div>{this.renderLogin()}</div>
    // } else {
    //   // return null
    //   return <div>{this.renderLogin()}</div>
    // }

    return (
      <section>
        <div className="hero-content">
            <img className="pencilPic" src={big} />
        </div>

{/* BEGIN oAuth LOGIN */}
        <div className="link-container">
          <div className="login" onClick={() => this.authenticate(fbprovider)}><p>log in with <i className="fa fa-facebook-square" aria-hidden="true"></i></p></div>
        </div>
{/* END oAuth LOGIN */}
        <div className="selling-points container clearfix col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="point column third col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <i className="fa fa-calculator" aria-hidden="true"></i>
            <h5 className="point-title">Modular Math?</h5>
            <p className="point-description">When does a 135-minute test with a 1.5 time extention that began at 11:37am end? Let {title} do test time math for you!</p>
          </div>
          <div className="point column third col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
            <h5 className="point-title">Un-complicate!</h5>
            <p className="point-description">Keep track of students in extended time testing with different time extensions, start times, and tests.</p>
          </div>
          <div className="point column third col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <i className="fa fa-folder-open-o" aria-hidden="true"></i>
            <h5 className="point-title">Record-friendly</h5>
            <p className="point-description">{title} organizes important information in an easy-to-print format for your records.</p>
          </div>
        </div>
      </section>
    )

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
    // return (
    //   // Comment like this here
    //   // <form className="store-selector" onSubmit={(this.grabIdAndEnter.bind(this)}>
    //   // The above vunction syntax is more verbose, but ties the above call to the constructor
    //   <form className="store-selector" onSubmit={(e) => this.grabIdAndEnter(e)}>
    //   {/* The above function syntax is easy but will be fired by any 'grabIdAndEnter' */}
    //     {/* But omment like this over here! */}
    //     <h2>Please Enter a Store</h2>
    //     <input type="text" required placeholder="Store name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
    //     <button type="submit">Visit Store -></button>
    //   </form>
    //   // <p></p> --> cannot do this, you must always only return one parent element.  Otherwise you get this error: 'Syntax error: Adjacent JSX elements must be wrapped in an enclosing tag'
    // )
  }
}

// Landing.contextTypes = {
//   router: React.propTypes.object
// }

// Landing.propTypes = {
//   storeID: PropTypes.string.isRequired
// };

export default Landing;
