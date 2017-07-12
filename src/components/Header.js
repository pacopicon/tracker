import React from 'react';
import PropTypes from 'prop-types';


class Header extends React.Component {
  render() {
    return(
      <nav class="navbar fixed-top navbar-toggleable-sm bg-faded">
      <button class="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span> </span>
        <span> </span>
        <span> </span>
      </button>
      <div class="hidden-sm-down navbar-brand col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <b><p class="navHeading">TestTrakker</p></b>
      </div>
      <div class="collapse navbar-collapse" id="collapsingNavbar">
        <ul class="nav navbar-nav">
          <li class="nav-item">
            {/* <b><p class="col-lg-3 col-md-3 col-sm-3 col-xs-12 navHeading">{{time | date: 'short'}}</p></b> */}
          </li>
          <li class="nav-item">
            <button ui-sref="testDataPrintout" class="menuBtn menu-one col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <p class="linkText">print</p>
            </button>
          </li>
          <li class="nav-item">
            <button ng-click="warnClose()" class="menuBtn menu-two col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <p class="linkText">logout</p>
            </button>
          </li>
        </ul>
      </div>
    </nav>
    )
  }

}

Header.propTypes = {
  // tagline: 'React.PropTypes.string' is the old syntax.  As of React v15.5, propTypes has become a library that should be imported ('import PropTypes from 'prop-types';').  Syntax has dropped 'React'.
  tagline: PropTypes.string.isRequired
}

export default Header;
