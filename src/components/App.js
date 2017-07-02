import React from 'react';
import Header from './Header';
import Order from './Order';
import Landing from './Landing';
import UserPage from './UserPage';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';
import rebase from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    // getinitialState
    this.state = {
      fishes: {}
    };
  }

  componentWillMount() {
    rebase.app.auth().onAuthStateChanged((user, error) => {
      if(user) {


        // this runs right before the app is rendered
        this.ref = rebase.base.syncState(`users/${user.uid}/fishes`, {
          context: this,
          state: 'fishes'
        });
        // check if there is any order in localStorage
        // const localStorageRef = localStorage.getItem(`order-${this.props.match.params}`);
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
  }

  componentWillUnmount() {
    rebase.base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    // localStorage.setItem(`order-${this.props.match.params.storeID}`, JSON.stringify(nextState.order));
  }

  addFish(fish) {
    // update our state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // you can do this: this.state.fishes.fish1 = fish;
    // set state
    // this is more standard, grabbing the state and updating it: this.setState({ fishes: fishes})
    // the below is the most advanced syntax, ES6
    this.setState({ fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order}
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    // this.setState({order: order});
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order}
    delete order[key];
    this.setState({ order })
  }

  render() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header age="5000" cool={true} tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)

            }
            {/* .keys() extracts the keys from an object and pushes them all into an array.  .map() iterates over this array. */}
          </ul>
        </div>
        {/* <Order
          fishes={this.state.fishes} order={this.state.order}
          params={this.props.match.params}
          removeFromOrder={this.removeFromOrder}
        /> */}
        <UserPage
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
        />
      </div>
    )
  }
}

export default App;
