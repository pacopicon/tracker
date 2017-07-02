import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter, Match, Miss } from 'react-router';
// import { BrowserRouter, matchPath, Miss } from 'react-router-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import rebase from './base';


import './css/style.css';
import App from './components/App';
import Landing from './components/Landing';
import NotFound from './components/NotFound';
import UserPage from './components/UserPage';

const Root = () => {
  rebase.app.auth().onAuthStateChanged((user, error) => {
    if(user) {


      // this runs right before the app is rendered
      this.ref = rebase.base.syncState(`users/${user.uid}/fishes`, {
        context: this,
        state: 'fishes'
      });
      // check if there is any order in localStorage
      // const localStorageRef = localStorage.getItem(`order-${this.props}`);
      //
      //
      // if(localStorageRef) {
      //   // update our App component's order state
      //   this.setState({
      //     order: JSON.parse(localStorageRef)
      //   });
      // }
    }
  });
  return(
    <BrowserRouter>
      <Switch>
        {/* Wes Bos' code no longer working, see react-router docs: */}
        {/* <Match exactly pattern="/" component={Landing} /> */}
        {/* <Match pattern="/UserPage/:storeID" component={App} /> */}
        <Route exact path="/" component={Landing} />
        <Route path="/UserPage" component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));






// import ReactDOM from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
