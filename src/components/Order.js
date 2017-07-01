import React from 'react';
import { formatPrice } from '../helpers';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }
  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={(e) => this.props.removeFromOrder(key)}>&times;</button>

    if(!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton}</li>
    }
    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}>
            <span key={count}>{count}</span>
          </CSSTransitionGroup>

          lbs {fish.name} {removeButton}
        </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal;
    }, 0);
    return(
      <div className="order-wrap">
        <h2>Your Order</h2>
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          {/* this is one way of doing it: {orderIds.map(key => <li>{key}</li>)} */}
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    )
  }
}

Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  removeFromOrder: PropTypes.func
}

export default Order;