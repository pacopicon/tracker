import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter, Match, Miss } from 'react-router';
// import { BrowserRouter, matchPath, Miss } from 'react-router-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import rebase from './base';
import 'bootstrap/dist/css/bootstrap.css';


import './css/landing.min.css';
import './css/main.min.css';
import './css/user.min.css';
import './css/navbar.min.css';
import './css/testData.min.css';
import App from './components/App';
import Landing from './components/Landing';
import NotFound from './components/NotFound';
// import UserPage from './components/UserPage';

const Root = () => {
  return(
    <BrowserRouter>
      <Switch>
        {/* Wes Bos' code no longer working, see react-router docs: */}
        {/* <Match exactly pattern="/" component={Landing} /> */}
        {/* <Match pattern="/UserPage/:storeID" component={App} /> */}
        <Route exact path="/" component={Landing} />
        <Route path="/UserPage/:userID" component={App} />
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
