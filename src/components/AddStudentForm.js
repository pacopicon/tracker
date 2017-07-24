import React from 'react';
import PropTypes from 'prop-types';
import { mountNumberInput, addHoursAndMinutes, parseTime } from '../helpers';
import $ from 'jquery'

class AddStudentForm extends React.Component {
  constructor() {
    super();
    this.renderTestForm = this.renderTestForm.bind(this);
  }

  createStudent(event) {
    event.preventDefault();

    console.log("this.AtestHour.value = ", this.AtestHour.value);
    console.log("this.AtestMinute.value = ", this.AtestMinute.value);

    const student = {
      order: Object.keys(this.props.students).length,
      id: Math.random() * 10000000000000000,
      name: this.name.value,
      extendTime: this.extendTime.value,
      tests: {
        Atest: {
          id: Math.random() * 10000000000000000,
          name: this.AtestName.value,
          time: addHoursAndMinutes(this.AtestHour.value, this.AtestMinute.value) || 18000000,
          total: addHoursAndMinutes(this.AtestHour.value, this.AtestMinute.value) * this.extendTime.value || 0,
          startRec: 0,
          startTime: 0,
          hasTimerStarted: false,
          isTimerPaused: false,
          pausedTime: 0,
          pausedTotal: 0,
          isOver: false,
          endedAt: 0
        },
        Btest: {
          id: Math.random() * 10000000000000000,
          name: this.BtestName.value,
          // time: addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) || 18000000,
          // total: addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) * this.extendTime.value || 0,
          time: (typeof this.BtestHour === "undefined") ? 18000000 : addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value),
          total: (typeof this.BtestHour === "undefined") ? 0 : addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) * this.extendTime.value,
          startRec: 0,
          startTime: 0,
          hasTimerStarted: false,
          isTimerPaused: false,
          pausedTime: 0,
          pausedTotal: 0,
          isOver: false,
          endedAt: 0
        },
        Ctest: {
          id: Math.random() * 10000000000000000,
          name: this.CtestName.value,
          // time: addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) || 18000000,
          // total: addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) * this.extendTime.value || 0,
          time: (typeof this.CtestHour === "undefined") ? 18000000 : addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value),
          total: (typeof this.CtestHour === "undefined") ? 0 : addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) * this.extendTime.value,
          startRec: 0,
          startTime: 0,
          hasTimerStarted: false,
          isTimerPaused: false,
          pausedTime: 0,
          pausedTotal: 0,
          isOver: false,
          endedAt: 0
        },
        Dtest: {
          id: Math.random() * 10000000000000000,
          name: this.DtestName.value,
          // time: addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) || 18000000,
          // total: addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) * this.extendTime.value || 0,
          time: (typeof this.DtestHour === "undefined") ? 18000000 : addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value),
          total: (typeof this.DtestHour === "undefined") ? 0 : addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) * this.extendTime.value,
          startRec: 0,
          startTime: 0,
          hasTimerStarted: false,
          isTimerPaused: false,
          pausedTime: 0,
          pausedTotal: 0,
          isOver: false,
          endedAt: 0
        }
      },
      isSafeToDelete: false,
      created_at: Date.now().toString()
    }

    if(this.name.value, this.extendTime.value) {
      this.props.addStudent(student);
      this.props.toggleInvert();
      this.studentForm.reset();
    } else {
      this.props.alertON();
      this.setState({alert: true});
      setTimeout(() => this.props.alertOFF(), 5000);
    }

  }

  componentDidMount() {
    // this.numberInput = setTimeout(
    //   () => mountNumberInput(),
    //   0
    // );

    mountNumberInput();

      // $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
      // $('.quantity').each(function() {
      //   var spinner = $(this),
      //     input = spinner.find('input[type="number"]'),
      //     btnUp = spinner.find('.quantity-up'),
      //     btnDown = spinner.find('.quantity-down'),
      //     min = input.attr('min'),
      //     max = input.attr('max'),
      //     step = input.attr('step');
      //
      //   btnUp.click(function() {
      //     var oldValue = parseFloat(input.val());
      //     if (oldValue >= max) {
      //       // if(oldValue < 10) {
      //         // var newVal = '0' + min;
      //         var newVal = min;
      //       // } else {
      //         // var newVal = min;
      //       // }
      //     } else {
      //       // if(oldValue < 10 && oldValue != step) {
      //       if(oldValue == 0 && step == 5) {
      //         var newVal = '0' + (oldValue + 1 * step);
      //       } else {
      //         var newVal = oldValue + 1 * step;
      //       }
      //     }
      //     spinner.find("input").val(newVal);
      //     spinner.find("input").trigger("change");
      //   });
      //
      //   btnDown.click(function() {
      //     var oldValue = parseFloat(input.val());
      //     if (oldValue <= min) {
      //       // if(oldValue < 10) {
      //         // var newVal = '0' + max;
      //       // } else {
      //         var newVal = max;
      //       // }
      //     } else {
      //       // if(oldValue < 10) {
      //       if((oldValue == 10 || oldValue == 5) && step == 5) {
      //         var newVal = '0' + (oldValue - 1 * step);
      //       } else {
      //         var newVal = oldValue - 1 * step;
      //       }
      //     }
      //     spinner.find("input").val(newVal);
      //     spinner.find("input").trigger("change");
      //   });
      //
      // });
  }

  componentWillUpdate(nextProps, nextState) {
    // this.numberInput = setTimeout(
    //   () => mountNumberInput(),
    //   0
    // );

    mountNumberInput();
  }

  componentDidUpdate(oldProps,oldState){
      mountNumberInput();
  }


  componentWillUnmount() {
    clearTimeout(this.numberInput);
  }

  renderTestForm(testName, testTime) {

    return (
      <div className="nameAndTime col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div className="testNameForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="form-group">
            <input className="form-control testNameInput" ref={(input) => testName = input} type="text" placeholder="test" />
          </div>
        </div>
        <div className="testTimeForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="form-group">
            {/* Need timepicker below: */}
            {/* <TimePicker defaultValue={moment('01:00:00', format)} ref={(input) => testTime = moment(input, format)} format={format} /> */}
          </div>
        </div>
      </div>
    )
  }

  render() {

    return(
      <form ref={(input) => this.studentForm = input} className="" onSubmit={(e) => this.createStudent(e)}>
        <div className="form-fields marginRight marginLeft col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="nameAndExtend col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <div className="nameForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="form-group">
                <input className="form-control nameInput" ref={(input) => this.name = input} type="text" placeholder="student name" />
              </div>
            </div>
            <div className="extendForm smallWidthMargin form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <select className="extendInput" type="select" name="select" ref={(input) => this.extendTime = input}>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
{/*BEGIN A test and B test*/}
          <div className="testOneAndTwo col-lg-5 col-md-5 col-sm-5 col-xs-12">
            {/* <div>{this.renderTestForm(this.AtestName, this.AtestTime)}</div> */}
            <div className="nameAndTime col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="testNameForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="form-group">
                  <input className="form-control testNameInput" ref={(input) => this.AtestName = input} type="text" placeholder="test" />
                </div>
              </div>
              <div className="testTimeForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="quantity">
                  <input className="hourInput" type="number" min="0" max="6" step="1" defaultValue="0" ref={(input) => this.AtestHour = input}/>
                </div>
                <div className="quantity">
                  <input className="minuteInput" type="number" min="00" max="55" step="5" defaultValue="00" ref={(input) => this.AtestMinute = input}/>
                </div>
              </div>
            </div>
            {/* <div>{this.renderTestForm(this.BtestName, this.BtestTime)}</div> */}
            <div className="nameAndTime col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="testNameForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="form-group">
                  <input className="form-control testNameInput" ref={(input) => this.BtestName = input} type="text" placeholder="test" />
                </div>
              </div>
              <div className="testTimeForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="quantity">
                  <input type="number" min="0" max="6" step="1" defaultValue="0" ref={(input) => this.BtestHour = input}/>
                </div>
                <div className="quantity">
                  <input type="number" min="00" max="55" step="5" defaultValue="00" ref={(input) => this.BtestMinute = input}/>
                </div>
              </div>
            </div>
          </div>
{/*END A test and B test*/}
{/*BEGIN C test and D test*/}
          <div className="testThreeAndFour col-lg-5 col-md-5 col-sm-5 col-xs-12">
            {/* <div>{this.renderTestForm(this.CtestName, this.CtestTime)}</div> */}
            <div className="nameAndTime col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="testNameForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="form-group">
                  <input className="form-control testNameInput" ref={(input) => this.CtestName = input} type="text" placeholder="test" />
                </div>
              </div>
              <div className="testTimeForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="quantity">
                  <input type="number" min="0" max="6" step="1" defaultValue="0" ref={(input) => this.CtestHour = input}/>
                </div>
                <div className="quantity">
                  <input type="number" min="00" max="55" step="5" defaultValue="00" ref={(input) => this.CtestMinute = input}/>
                </div>
              </div>
            </div>
            {/* <div>{this.renderTestForm(this.DtestName, this.DtestTime)}</div> */}
            <div className="nameAndTime col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="testNameForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="form-group">
                  <input className="form-control testNameInput" ref={(input) => this.DtestName = input} type="text" placeholder="test" />
                </div>
              </div>
              <div className="testTimeForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="quantity">
                  <input type="number" min="0" max="6" step="1" defaultValue="0" ref={(input) => this.DtestHour = input}/>
                </div>
                <div className="quantity">
                  <input type="number" min="00" max="55" step="5" defaultValue="00" ref={(input) => this.DtestMinute = input}/>
                </div>
              </div>
            </div>
          </div>
{/*END A test and B test*/}
        </div>
        <div className="btn-div col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <button type="submit" className="addStudentBtn"> add student</button>
        </div>
      </form>
    )
  }
}

AddStudentForm.propTypes = {
  // addStudent: PropTypes.func.isRequired
}

export default AddStudentForm;
