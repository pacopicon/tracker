import React from 'react';
import { mountNumberInput, addHoursAndMinutes } from '../helper';
import PropTypes from 'prop-types';
// import { } from '../studentcrud';

class Student extends React.Component {
  constructor() {
    super();
    this.getTeacherName = this.getTeacherName.bind(this);
    this.renderTest = this.renderTest.bind(this);
    this.renderInlineForm = this.renderInlineForm.bind(this);
    this.renderInLineFormButton = this.renderInLineFormButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.state = {
      addInlineAtest: false,
      addInlineBtest: false,
      addInlineCtest: false,
      addInlineDtest: false,
      hour: 0,
      minute: 0
    }
  }

  handleChange(e, key) {
    const student = this.props.students[key];
    // take a copy of that student and update it with the new data
    const updatedStudent = {
      ...student,
      [e.target.name]: e.target.value
    }
    this.props.updateStudent(key, updatedStudent);
  }

  handleHourChange(e, key, test) {
    const student = this.props.students[key];
    // take a copy of that student and update it with the new data
    this.setState({
      hour: e.target.value;
    });
  }

  handleMinuteChange(e, key, test) {
    const student = this.props.students[key];
    // take a copy of that student and update it with the new data
    const updatedStudent = {
      ...student,
      [e.target.name]: addHoursAndMinutes(this.state.hour, e.target.value)
    }

    this.props.updateStudent(key, updatedStudent);

    // reset hour state for other inline number inputs to use
    this.setState({
      hour: 0
    });
  }

  mountNumberInput();

  renderInLineFormButton(test.total, addInLineTest) {
    if(test.total == 0 || !addInLineTest) {
      return (
        <div className="addTest dataButtonsAndBars col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <button>
            <i className="fa fa-plus" aria-hidden="true" onClick={() => addInLineTest = true}></i>
          </button>
        </div>
      )
    }
  }

  // renderInlineForm(key, test) {
  //   const student = this.props.students[key];
  //   if(student.tests.)
  renderInlineForm(key, test, addInLineTest) {
    if(test.total == 0 && addInLineTest) {
      return (
        <div className="inlineForm buttonsAndBars">
          <div className="inlineNameForm col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <input type="text" className="form-control testNameInput" value={test.name} placeholder="test name" onChange={(e) => this.handleChange(e, key)}/>
          </div>
          <div className="inlineTestTimeForm col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="quantity">
              <input type="number" min="0" max="6" step="1" value="0" onChange={(e) => this.handleHourChange(e, key, test)}/>
            </div>
            <div className="quantity">
              <input type="number" min="00" max="55" step="5" value="00" onChange={(e) => this.handleMinuteChange(e, key, test)}/>
            </div>
          </div>
          <button type="submit" type="button" className="addTestBtn col-lg-1 col-md-1 col-sm-1 col-xs-1" onClick={() => addInLineTest = false}><i className="fa fa-check checkAdd" aria-hidden="true"></i></button>
        </div>
      )
    }
  }

  renderTestData() {
    if() {
      return (

      )
    }
  }

  renderTest(student) {
    return(

    )
  }


  render() {
    // const { student, index } = this.props;
    const key = this.props.key
    const student = this.props.students[key]
    // e.g. const student = this.props.student;
    // e.g. const index = this.props.index;

    // const isAvailable = student.status === 'available';
    // const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';
    return(
      <div className="row studentDisplay marginLeft marginRight col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="student col-lg-12 col-md-12 col-sm-12 col-xs-12">
{/* STUDENT: checkbox, name, extend-time*/}
          <div className="checkboxIndexName marginRight marginLeft col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <input type="checkbox" className="checkbox" value=""/>
            {/* ng-model="student.isSafeToDelete" onChange="saveAndToggleInvert(student)" */}
            <div className="indexAndNameCell">
              <p className="indexAndName">
                {student.order + 1}. {student.name} ({student.extendTime})
              </p>
{/*delete*/}
              <button onClick={() => this.props.removeStudent}>
                <i className="fa fa-times deleteBtn" ></i>
                {/* ng-show="student.isSafeToDelete" */}
              </button>
            </div>
          </div>
        </div>
{/* END STUDENT DISPLAY */}

{/* BEGIN TEST ONE */}
{/* Plus button */}
        {renderInLineFormButton(student.tests.Atest.total, this.state.addInlineAtest)}
{/* Inline Form */}
        {renderInlineForm(key, student.tests.Atest, this.state.addInlineAtest)}
{/* TEST ONE DATA */}
        <div className="dataButtonsAndBars col-lg-12 col-md-12 col-sm-12 col-xs-12" ng-hide="student.totalTimeOne == 0 || finishedTestOneHidden" ng-mouseover="redHoverOne = true" ng-mouseleave="redHoverOne = false" ng-className="{'deleteHighlight': student.isSafeToDelete}">
          <div className="testTimeData">
{/* Begin test hide */}
            <div ng-show="redHoverOne && student.isTestOneOver" className="hideTest col-lg-1 col-md-1 col-sm-1 col-xs-1">
              <i className="fa fa-minus" aria-hidden="true" ng-click="finishedTestOneHidden = true"></i>
            </div>
{/* End test hide */}
            <div className="testTimeCell marginLeft marginRight col-lg-12 col-md-12 col-sm-12 col-xs-12" ng-hide="redHoverOne && student.isTestOneOver">
              <p className="dataPointLabel col-lg-5 col-md-5 col-sm-5 col-xs-12">
                started:
              </p>
              <p className="dataPoint col-lg-7 col-md-7 col-sm-7 col-xs-12">
                {/* {{startTime(student, "testOne") | date: 'mediumTime'}} */}
              </p>
            </div>
            <div className= "testTimeCell marginLeft marginRight col-lg-12 col-md-12 col-sm-12 col-xs-12" ng-hide="redHoverOne && student.isTestOneOver">
              <p className="dataPointLabel col-lg-5 col-md-5 col-sm-5 col-xs-12">
                paused:
              </p>
              <p className="dataPoint col-lg-6 col-md-6 col-sm-6 col-xs-6">
                {/* {{totalPausedTime(student, "testOne").hourMinSec}} */}
              </p>
            </div>
            <div className="testTimeCell marginLeft marginRight col-lg-12 col-md-12 col-sm-12 col-xs-12" ng-hide="redHoverOne && student.isTestOneOver">
              <p className="dataPointLabel col-lg-5 col-md-5 col-sm-5 col-xs-12">
                std. end:
              </p>
              <p className="dataPoint col-lg-7 col-md-7 col-sm-7 col-xs-12">
                {/* {{endTime(student, "testOne") | date: 'mediumTime'}} */}
              </p>
            </div>
            <div className="testTimeCell marginLeft marginRight col-lg-12 col-md-12 col-sm-12 col-xs-12" ng-hide="redHoverOne && student.isTestOneOver">
              <p className="dataPointLabel col-lg-5 col-md-5 col-sm-5 col-xs-12">
                ext. end:
              </p>
              <p className="dataPoint col-lg-6 col-md-6 col-sm-6 col-xs-6">
                {/* {{endTime(student, "exttestOne") | date: 'mediumTime'}} */}
              </p>
            </div>
          </div>
{/* TEST ONE NAME */}
          <div className="buttonsAndBars">
            <div className="testNameCell marginRight marginLeft">
              <div className="buttonContainer col-lg-12 col-md-12 col-sm-12 col-xs-12" ng-show="!student.isTimerOneStart && !student.isTestOneOver">
                <button className="countBtn" ng-click="startTimer(student, 'testOne')">
                  <p className="countBtnText">
                    {/* start {{student.testOneName}} test */}
                  </p>
                </button>
              </div>
              <div className="buttonContainer col-lg-12 col-md-12 col-sm-12 col-xs-12" ng-show="student.isTestOneOver && student.totalTimeOne > 0">
                <button className="redBtn">
                  <p className="countBtnText">
                    {/* {{student.testOneName}} test is over */}
                  </p>
                </button>
              </div>
              <div className="buttonContainer col-lg-12 col-md-12 col-sm-12 col-xs-12" ng-show="student.isTimerOneStart && !student.isTimerOnePaused && !student.isTestOneOver">
                <button className="pauseBtn" ng-click="pauseTimer(student, 'testOne')">
                  <p className="pauseBtnText">
                    {/* pause {{student.testOneName}} test */}
                  </p>
                </button>
              </div>
              <div className="buttonContainer col-lg-12 col-md-12 col-sm-12 col-xs-12" ng-show="student.isTimerOneStart && student.isTimerOnePaused && !student.isTestOneOver">
                <button className="resumeBtn col-lg-4 col-md-4 col-sm-4 col-xs-4" ng-click="resumeTimer(student, 'testOne')">
                  <p className="resumeBtnText">
                    resume
                  </p>
                </button>
                <button className="resetBtn col-lg-4 col-md-4 col-sm-4 col-xs-4" ng-click="resetTimer(student, 'testOne')">
                  <p className="resetBtnText">
                    reset
                  </p>
                </button>
                <button className="endBtn col-lg-4 col-md-4 col-sm-4 col-xs-4" ng-click="endTimer(student, 'testOne')">
                  <p className="endBtnText">
                    end
                  </p>
                </button>
              </div>
            </div>


          </div> {/* buttons and bars go here */}
        </div>
      </div>
    )

  }
}

Student.propTypes = {
  student: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired
  // addToOrder: PropTypes.func.isRequired
}


export default Student;
