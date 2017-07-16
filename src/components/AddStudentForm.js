import React from 'react';
import PropTypes from 'prop-types';
import NumericInput from 'react-numeric-input';
import $ from 'jquery'

class AddStudentForm extends React.Component {
  constructor() {
    super();
    this.addHoursAndMinutes = this.addHoursAndMinutes.bind(this);
    this.renderTestForm = this.renderTestForm.bind(this);
  }

  addHoursAndMinutes(hours, minutes) {
    const timeInMillisecs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    return timeInMillisecs;
  }

  createStudent(event) {
    event.preventDefault();

    console.log("this.AtestHour.value = ", this.AtestHour.value);
    console.log("this.AtestMinute.value = ", this.AtestMinute.value);

    const student = {
      order: Object.keys(this.props.students).length,
      name: this.name.value,
      extendTime: this.extendTime.value,
      tests: {
        Atest: {
          name: this.AtestName.value,
          time: this.addHoursAndMinutes(this.AtestHour.value, this.AtestMinute.value) || 18000000,
          total: this.addHoursAndMinutes(this.AtestHour.value, this.AtestMinute.value) * this.extendTime.value || 0,
          startRec: 0,
          startTime: 0,
          isTimerStart: false,
          isTimerPaused: false,
          pausedTime: 0,
          pausedTotal: 0,
          isTestOver: false,
          testEndedAt: 0
        },
        Btest: {
          name: this.BtestName.value,
          // time: this.addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) || 18000000,
          // total: this.addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) * this.extendTime.value || 0,
          time: (typeof this.BtestHour === "undefined") ? 18000000 : this.addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value),
          total: (typeof this.BtestHour === "undefined") ? 0 : this.addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) * this.extendTime.value,
          startRec: 0,
          startTime: 0,
          isTimerStart: false,
          isTimerPaused: false,
          pausedTime: 0,
          pausedTotal: 0,
          isTestOver: false,
          testEndedAt: 0
        },
        Ctest: {
          name: this.CtestName.value,
          // time: this.addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) || 18000000,
          // total: this.addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) * this.extendTime.value || 0,
          time: (typeof this.CtestHour === "undefined") ? 18000000 : this.addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value),
          total: (typeof this.CtestHour === "undefined") ? 0 : this.addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) * this.extendTime.value,
          startRec: 0,
          startTime: 0,
          isTimerStart: false,
          isTimerPaused: false,
          pausedTime: 0,
          pausedTotal: 0,
          isTestOver: false,
          testEndedAt: 0
        },
        Dtest: {
          name: this.DtestName.value,
          // time: this.addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) || 18000000,
          // total: this.addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) * this.extendTime.value || 0,
          time: (typeof this.DtestHour === "undefined") ? 18000000 : this.addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value),
          total: (typeof this.DtestHour === "undefined") ? 0 : this.addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) * this.extendTime.value,
          startRec: 0,
          startTime: 0,
          isTimerStart: false,
          isTimerPaused: false,
          pausedTime: 0,
          pausedTotal: 0,
          isTestOver: false,
          testEndedAt: 0
        }
      },
      isSafeToDelete: false,
      created_at: Date.now().toString()
    }

    // const student = {
    //   name: this.name.value,
    //   extendTime: this.extendTime.value,
    //   Aname: this.AtestName.value,
    //   Atime: this.addHoursAndMinutes(this.AtestHour.value, this.AtestMinute.value) || 18000000,
    //   Atotal: this.addHoursAndMinutes(this.AtestHour.value, this.AtestMinute.value) * this.extendTime.value || 0,
    //   AstartRec: 0,
    //   AstartTime: 0,
    //   AisTimerStart: false,
    //   AisTimerPaused: false,
    //   ApausedTime: 0,
    //   ApausedTotal: 0,
    //   AisTestOver: false,
    //   AtestEndedAt: 0,
    //   Bname: this.BtestName.value,
    //   // time: this.addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) || 18000000,
    //   // total: this.addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) * this.extendTime.value || 0,
    //   Btime: (typeof this.BtestHour === "undefined") ? 18000000 : this.addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value),
    //   Btotal: (typeof this.BtestHour === "undefined") ? 0 : this.addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) * this.extendTime.value,
    //   BstartRec: 0,
    //   BstartTime: 0,
    //   BisTimerStart: false,
    //   BisTimerPaused: false,
    //   BpausedTime: 0,
    //   BpausedTotal: 0,
    //   BisTestOver: false,
    //   BtestEndedAt: 0,
    //   Cname: this.CtestName.value,
    //   // time: this.addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) || 18000000,
    //   // total: this.addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) * this.extendTime.value || 0,
    //   Ctime: (typeof this.CtestHour === "undefined") ? 18000000 : this.addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value),
    //   Ctotal: (typeof this.CtestHour === "undefined") ? 0 : this.addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) * this.extendTime.value,
    //   CstartRec: 0,
    //   CstartTime: 0,
    //   CisTimerStart: false,
    //   CisTimerPaused: false,
    //   CpausedTime: 0,
    //   CpausedTotal: 0,
    //   CisTestOver: false,
    //   CtestEndedAt: 0,
    //   Dname: this.DtestName.value,
    //   // time: this.addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) || 18000000,
    //   // total: this.addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) * this.extendTime.value || 0,
    //   Dtime: (typeof this.DtestHour === "undefined") ? 18000000 : this.addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value),
    //   Dtotal: (typeof this.DtestHour === "undefined") ? 0 : this.addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) * this.extendTime.value,
    //   DstartRec: 0,
    //   DstartTime: 0,
    //   DisTimerStart: false,
    //   DisTimerPaused: false,
    //   DpausedTime: 0,
    //   DpausedTotal: 0,
    //   DisTestOver: false,
    //   DtestEndedAt: 0,
    //   isSafeToDelete: false,
    //   created_at: Date.now().toString()
    // }

    this.props.addStudent(student);
    this.studentForm.reset();
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

  componentDidMount() {

    $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    $('.quantity').each(function() {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max'),
        step = input.attr('step');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          // if(oldValue < 10) {
            // var newVal = '0' + min;
            var newVal = min;
          // } else {
            // var newVal = min;
          // }
        } else {
          // if(oldValue < 10 && oldValue != step) {
          if(oldValue == 0 && step == 5) {
            var newVal = '0' + (oldValue + 1 * step);
          } else {
            var newVal = oldValue + 1 * step;
          }
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          // if(oldValue < 10) {
            // var newVal = '0' + max;
          // } else {
            var newVal = max;
          // }
        } else {
          // if(oldValue < 10) {
          if((oldValue == 10 || oldValue == 5) && step == 5) {
            var newVal = '0' + (oldValue - 1 * step);
          } else {
            var newVal = oldValue - 1 * step;
          }
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });
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
                  <input type="number" min="0" max="6" step="1" value="0" ref={(input) => this.AtestHour = input}/>
                </div>
                <div className="quantity">
                  <input type="number" min="00" max="55" step="5" value="00" ref={(input) => this.AtestMinute = input}/>
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
                  <input type="number" min="0" max="6" step="1" value="0" ref={(input) => this.AtestHour = input}/>
                </div>
                <div className="quantity">
                  <input type="number" min="00" max="55" step="5" value="00" ref={(input) => this.AtestMinute = input}/>
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
                  <input type="number" min="0" max="6" step="1" value="0" ref={(input) => this.AtestHour = input}/>
                </div>
                <div className="quantity">
                  <input type="number" min="00" max="55" step="5" value="00" ref={(input) => this.AtestMinute = input}/>
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
                  <input type="number" min="0" max="6" step="1" value="0" ref={(input) => this.AtestHour = input}/>
                </div>
                <div className="quantity">
                  <input type="number" min="00" max="55" step="5" value="00" ref={(input) => this.AtestMinute = input}/>
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
