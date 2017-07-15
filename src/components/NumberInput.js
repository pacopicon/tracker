import React from 'react';
import PropTypes from 'prop-types';

class NumberInput extends React.Component {
  constructor() {
    super();
    this.renderNumberPicker = this.renderNumberPicker.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.state = {
      hours: 0,
      minutes: 0
    }
  }

  increment(num, option) {
    if(option == "hour") {
      if(num < 6) {
        num++;
        return num
      } else if (num == 7) {
        num = 0;
        return num
      }
    } else {
      if(num < 56) {
        num+=5;
        return num
      } else if (num == 60) {
        num = 0;
        return num;
      }
    }
  }

  decrement(num, option) {
    if(option == "hour") {
      if(num > 0) {
        num--;
        return num
      } else if(num == 0) {
        num = 6;
        return num;
      }
    } else {
      if(num > 4) {
        num-= 5;
        return num
      } else if(num == 0) {
        num = 55;
        return num;
      }
    }
  }

  renderNumberPicker(hour, minute) {
    const hourDef = 0;
    const minuteDef = 0;
    return (
      <div className="form-group" type="text">
        <div className="hour-group">
          <input type="text" className="hour-input" defaultValue={hourDef}/>
          <button className="hour-btn-up">
            <i class="fa fa-caret-up" aria-hidden="true"></i>
          </button>
          <button className="hour-btn-dn">
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </button>
        </div>
        <div className="minute-group">
          <input type="text" className="minute-input" defaultValue={minuteDef}/>
          <button className="hour-btn-up">
            <i class="fa fa-caret-up" aria-hidden="true"></i>
          </button>
          <button className="hour-btn-dn">
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }

}

export default NumberInput;
