import React from 'react';
import PropTypes from 'prop-types';
// import '../css/user.min.css';


class AddStudentForm extends React.Component {
  constructor() {
    super();
    this.renderTestForm = this.renderTestForm.bind(this);
  }

  createStudent(event) {
    event.preventDefault();
    console.log("this.AtestName.value = " + this.AtestName.value)
    console.log("this.AtestTime.value = " + this.AtestTime.value)
    const student = {
      name: this.name.value,
      extendTime: this.extendTime.value,
      tests: {
        Atest: {
          name: this.AtestName.value,
          time: this.AtestTime.value || 18000000,
          total: this.AtestTime.value,
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
          time: this.BtestTime.value || 18000000,
          total: this.BtestTime.value * this.extendTime.value,
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
          time: this.CtestTime.value || 18000000,
          total: this.CtestTime.value * this.extendTime.value,
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
          time: this.DtestTime.value || 18000000,
          total: this.DtestTime.value * this.extendTime.value,
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
    this.props.addStudent(student);
    this.studentForm.reset();
  }

  renderTestForm(testName, testTime) {

    const format = 'h:mm';

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
    const format = 'h:mm';
    return(
      <form ref={(input) => this.studentForm = input} className="" onSubmit={(e) => this.createStudent(e)}>
        <div className="form-fields marginRight marginLeft col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="nameAndExtend col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div className="nameForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className="form-group">
                <input ref={(input) => this.name = input} type="text" placeholder="student name" />
              </div>
            </div>
          </div>
          <div className="form-group extendForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <select type="select" name="select" ref={(input) => this.extendTime = input}>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
            </select>
          </div>
{/*BEGIN A test and B test*/}
          <div className="testOneAndTwo col-lg-4 col-md-4 col-sm-4 col-xs-12">
            {/* <div>{this.renderTestForm(this.AtestName, this.AtestTime)}</div> */}
            <div className="nameAndTime col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="testNameForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="form-group">
                  <input className="form-control testNameInput" ref={(input) => this.AtestName = input} type="text" placeholder="test" />
                </div>
              </div>
              <div className="testTimeForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="form-group">
                  {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} value={moment('student.Atest.time', 'HH:mm')} /> */}
                  {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} ref={(input) => this.AtestTime = input} /> */}
                  {/* <TimePicker defaultValue={moment('01:00:00', format)} ref={(input) => this.AtestTime = moment(input, format)} format={format} /> */}
                  {/* <TimePicker ref={(input) => this.AtestTime = input} /> */}
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
                <div className="form-group">
                  {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} value={moment('student.Btest.time', 'HH:mm')} /> */}
                  {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} ref={(input) => this.BtestTime = input} /> */}
                  {/* <TimePicker defaultValue={moment('01:00:00', format)} ref={(input) => this.BtestTime = moment(input, format)} format={format} /> */}
                </div>
              </div>
            </div>
          </div>
{/*END A test and B test*/}
{/*BEGIN C test and D test*/}
          <div className="testThreeAndFour col-lg-4 col-md-4 col-sm-4 col-xs-12">
            {/* <div>{this.renderTestForm(this.CtestName, this.CtestTime)}</div> */}
            <div className="nameAndTime col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="testNameForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="form-group">
                  <input className="form-control testNameInput" ref={(input) => this.CtestName = input} type="text" placeholder="test" />
                </div>
              </div>
              <div className="testTimeForm smallWidthMargin col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="form-group">
                  {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} value={moment('student.Ctest.time', 'HH:mm')} /> */}
                  {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} ref={(input) => this.CtestTime = input} /> */}
                  {/* <TimePicker defaultValue={moment('01:00:00', format)} ref={(input) => this.CtestTime = moment(input, format)} format={format} /> */}
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
                <div className="form-group">
                  {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} value={moment('student.Dtest.time', 'HH:mm')} /> */}
                  {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} ref={(input) => this.DtestTime = input} /> */}
                  {/* <TimePicker defaultValue={moment('01:00:00', format)} ref={(input) => this.DtestTime = moment(input, format)} format={format} /> */}
                </div>
              </div>
            </div>
          </div>
{/*END A test and B test*/}
        </div>
        <div className="btn-div col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <button type="submit" className="addStudentBtn"></button>
        </div>
      </form>
    )
  }
}

AddStudentForm.propTypes = {
  addStudent: PropTypes.func.isRequired
}

export default AddStudentForm;
