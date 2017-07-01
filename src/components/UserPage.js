import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import rebase from '../base';
import firebase from 'firebase';


class UserPage extends React.Component {

  constructor() {
    super();
    this.renderUserPage = this.renderUserPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    rebase.app.auth().signOut().then(() => {
      console.log("should have been logged out");
    });
    this.setState({ uid: null });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of that fish and update it with the new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updatedFish);
  }

  renderUserPage(key) {
    const fish = this.props.fishes[key];
    return (
      <div key={key} className="fish-edit">
        <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)} />
        <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)} ></textarea>
        <input type="text" name="image"  value={fish.image}placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)} />
        <button onClick={ () => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    // the long way: const logout = <button onClick={ () => this.logout()}>Log Out!</button>;

    // check if they are not logged in at all
    const logout = <button onClick={this.logout}>Log Out!</button>;
    return(
      <div>
        <h2>UserPage</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderUserPage)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

UserPage.propTypes = {
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func,
  removeFish: PropTypes.func,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  storeID: PropTypes.string.isRequired
};

export default UserPage;
