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

    // const student = {
    //   name: this.name.value,
    //   extendTime: this.extendTime.value,
    //   Aname: this.AtestName.value,
    //   Atime: addHoursAndMinutes(this.AtestHour.value, this.AtestMinute.value) || 18000000,
    //   Atotal: addHoursAndMinutes(this.AtestHour.value, this.AtestMinute.value) * this.extendTime.value || 0,
    //   AstartRec: 0,
    //   AstartTime: 0,
    //   AhasTimerStarted: false,
    //   AisTimerPaused: false,
    //   ApausedTime: 0,
    //   ApausedTotal: 0,
    //   AisOver: false,
    //   AendedAt: 0,
    //   Bname: this.BtestName.value,
    //   // time: addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) || 18000000,
    //   // total: addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) * this.extendTime.value || 0,
    //   Btime: (typeof this.BtestHour === "undefined") ? 18000000 : addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value),
    //   Btotal: (typeof this.BtestHour === "undefined") ? 0 : addHoursAndMinutes(this.BtestHour.value, this.BtestMinute.value) * this.extendTime.value,
    //   BstartRec: 0,
    //   BstartTime: 0,
    //   BhasTimerStarted: false,
    //   BisTimerPaused: false,
    //   BpausedTime: 0,
    //   BpausedTotal: 0,
    //   BisOver: false,
    //   BendedAt: 0,
    //   Cname: this.CtestName.value,
    //   // time: addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) || 18000000,
    //   // total: addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) * this.extendTime.value || 0,
    //   Ctime: (typeof this.CtestHour === "undefined") ? 18000000 : addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value),
    //   Ctotal: (typeof this.CtestHour === "undefined") ? 0 : addHoursAndMinutes(this.CtestHour.value, this.CtestMinute.value) * this.extendTime.value,
    //   CstartRec: 0,
    //   CstartTime: 0,
    //   ChasTimerStarted: false,
    //   CisTimerPaused: false,
    //   CpausedTime: 0,
    //   CpausedTotal: 0,
    //   CisOver: false,
    //   CendedAt: 0,
    //   Dname: this.DtestName.value,
    //   // time: addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) || 18000000,
    //   // total: addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) * this.extendTime.value || 0,
    //   Dtime: (typeof this.DtestHour === "undefined") ? 18000000 : addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value),
    //   Dtotal: (typeof this.DtestHour === "undefined") ? 0 : addHoursAndMinutes(this.DtestHour.value, this.DtestMinute.value) * this.extendTime.value,
    //   DstartRec: 0,
    //   DstartTime: 0,
    //   DhasTimerStarted: false,
    //   DisTimerPaused: false,
    //   DpausedTime: 0,
    //   DpausedTotal: 0,
    //   DisOver: false,
    //   DendedAt: 0,
    //   isSafeToDelete: false,
    //   created_at: Date.now().toString()
    // }

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
    this.numberInput = setTimeout(
      () => mountNumberInput(),
      0
    );
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
                  <input type="number" min="0" max="6" step="1" defaultValue="0" ref={(input) => this.AtestHour = input}/>
                </div>
                <div className="quantity">
                  <input type="number" min="00" max="55" step="5" defaultValue="00" ref={(input) => this.AtestMinute = input}/>
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
