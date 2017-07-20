import React from 'react';
import Test from './Test';
import { mountNumberInput, addHoursAndMinutes, processTime, parseTime } from '../helpers';
// import { addHoursAndMinutes, processTime, parseTime } from '../helpers';
import PropTypes from 'prop-types';

class Student extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.startTime = this.startTime.bind(this);
    this.endTime = this.endTime.bind(this);
    this.testTime = this.testTime.bind(this);
    this.renderTests = this.renderTests.bind(this);
    this.renderFormButton = this.renderFormButton.bind(this);
    this.changeState = this.changeState.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.timer = this.timer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
    this.fullBarStyle = this.fullBarStyle.bind(this);
    this.standardBarStyle = this.standardBarStyle.bind(this);
    this.extendBarStyle = this.extendBarStyle.bind(this);
    this.extendZeroBarStyle = this.extendZeroBarStyle.bind(this);
    this.state = {
      hour: 0,
      startTest: false,
      addInlinetest: false,
      hideFinishedtest: false,
      redHover: false,
      topBarDividend: 0,
      bottomBarDividend: 0,
      topBarRatio: 0,
      bottomBarRatio: 0,
      topBarWidth: 0,
      bottomBarWidth: 0,
      countdown: 0,
      dueTime: 0
    }
  }

//  BEGIN Lifecycle Hooks

  componentDidMount() {

    this.numberInput = setTimeout(
      () => mountNumberInput(),
      0
    );

    const students = this.props.students;
    for (var i = 0; i < this.props.selectedTests.length; i++) {
      if (students[this.props.studentKey] == this.props.selectedStudents[i]) {
        this.startTimer(this.props.selectedStudents[i], this.props.selectedTests[i]);
      }
    }
  }

  componentWillUnmount() {

    clearTimeout(this.numberInput);

    if(!this.state.startTest) {
      clearInterval(this.timeVar);
    }

  }

  componentWillUpdate(nextProps, nextState) {
    const { student, studentKey, test } = this.props;
    // The above = const student = this.props.students[studentKey]

    if(this.state.startTest) {
      this.timerVar = setInterval(
        () => this.timer(studentKey, test),
        1000
      );
    }



    const { student, test } = this.props;

    if(newProps.student.isSafeToDelete){
      // $(ReactDOM.findDOMNode(this.refs.safeDeleteHighlighft)).css({'padding-left': '1em',
      //   'transition': 'all 1s ease-in-out'});
      ReactDOM.findDOMNode(this.refs.safeDeleteHighlighft).css({'padding-left': '1em',
        'transition': 'all 1s ease-in-out'});
    } else{
      ReactDOM.findDOMNode(this.refs.safeDeleteHighlight).css({'padding-left': '0',
      'transition': 'all 1s ease-in-out'});
    }



    if(newState.redHover && newProps.test.isOver){
      ReactDOM.findDOMNode(this.refs.redHover).css({'display': 'hidden'});
    } else{
      ReactDOM.findDOMNode(this.refs.redHover).css({'display': 'initial'});
    }

    if(!newProps.test.hasTimerStarted && !newProps.test.isOver){
      ReactDOM.findDOMNode(this.refs.hideStartButton).css({'display': 'hidden'});
    } else{
      ReactDOM.findDOMNode(this.refs.hideStartButton).css({'display': 'initial'});
    }

    if(newProps.test.isOver && newProps.test.total > 0){
      ReactDOM.findDOMNode(this.refs.hideTestOver).css({'display': 'hidden'});
    } else{
      ReactDOM.findDOMNode(this.refs.hideTestOver).css({'display': 'initial'});
    }

    if(newProps.test.hasTimerStarted && !newProps.test.isTimerPaused && !newProps.test.isOver){
      ReactDOM.findDOMNode(this.refs.hidePause).css({'display': 'hidden'});
    } else{
      ReactDOM.findDOMNode(this.refs.hidePause).css({'display': 'initial'});
    }

    if(newProps.test.hasTimerStarted && newProps.test.isTimerPaused && !newProps.test.isOver){
      ReactDOM.findDOMNode(this.refs.hideResume).css({'display': 'hidden'});
    } else{
      ReactDOM.findDOMNode(this.refs.hideResume).css({'display': 'initial'});
    }

  }

  componentDidUpdate(oldProps,oldState){
    const { student, test } = this.props;

    if(!student.isSafeToDelete){
      ReactDOM.findDOMNode(this.refs.safeDeleteHighlight).css({'padding-left': '1em',
        'transition': 'all 1s ease-in-out'});
    } else{
      ReactDOM.findDOMNode(this.refs.safeDeleteHighlight).css({'padding-left': '0',
      'transition': 'all 1s ease-in-out'});
    }



    if(!this.state.redHover || !test.isOver){
      ReactDOM.findDOMNode(this.refs.redHover).css({'display': 'hidden'});
    } else{
      ReactDOM.findDOMNode(this.refs.redHover).css({'display': 'initial'});
    }

    if(test.hasTimerStarted || test.isOver){
      ReactDOM.findDOMNode(this.refs.hideStartButton).css({'display': 'hidden'});
    } else{
      ReactDOM.findDOMNode(this.refs.hideStartButton).css({'display': 'initial'});
    }

    if(!test.isOver || !test.total > 0){
      ReactDOM.findDOMNode(this.refs.hideTestOver).css({'display': 'hidden'});
    } else{
      ReactDOM.findDOMNode(this.refs.hideTestOver).css({'display': 'initial'});
    }

    if(!test.hasTimerStarted || test.isTimerPaused || test.isOver){
      ReactDOM.findDOMNode(this.refs.hidePause).css({'display': 'hidden'});
    } else{
      ReactDOM.findDOMNode(this.refs.hidePause).css({'display': 'initial'});
    }

    if(!test.hasTimerStarted || !test.isTimerPaused || test.isOver){
      ReactDOM.findDOMNode(this.refs.hideResume).css({'display': 'hidden'});
    } else{
      ReactDOM.findDOMNode(this.refs.hideResume).css({'display': 'initial'});
    }

  }

//  END Lifecycle Hooks

// BEGIN click handlers

  changeState(key, value) {
    this.setState({
        key: value
    });
  }

  handleChange(e, key) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { student } = this.props;
    // take a copy of that student and update it with the new data
    const updatedStudent = {
      ...student,
      [e.target.name]: value
    }
    this.props.updateStudent(key, updatedStudent);

    if(target.type === 'checkbox') {
      this.props.toggleInvert();
    }
  }

  handleHourChange(e, test) {
    const { student } = this.props;
    // take a copy of that student and update it with the new data
    this.setState({
      hour: e.target.value
    });
  }

  handleMinuteChange(e, key, test) {
    const { student } = this.props;
    // take a copy of that student and update it with the new data
    const hoursAndMinutes = addHoursAndMinutes(this.state.hour, e.target.value);
    const updatedStudent = {
      ...student,
      [e.target.name]: hoursAndMinutes,
      [test.total]: hoursAndMinutes * student.extendTime
    }

    this.props.updateStudent(key, updatedStudent);

    // reset hour state for other inline number inputs to use
    this.setState({
      hour: 0
    });
  }

  changeState(key, value) {
    this.setState({
        key: value
    });
  }

  relay(value, boolean) {
    return {
      boolean: boolean,
      value: value
    }
  }

// END click handlers

// BEGIN Student Test TIMER variables and functions

  startTimer(key, test) {

    if (test.startTime == 0) {
      const { student } = this.props;
      const updatedStudent = {
        ...student,
        [test.hasTimerStarted]: true,
        [test.startTime]      : Date.now(),
        [test.startRec]       : (test.pausedTotal == 0) ? Date.now() : 0
      }
      this.props.updateStudent(key, updatedStudent);
    } else {
      console.log("path 3 chosen");
      return this.timer(key, test);
    }

    this.setState({ startTest: true });

  }

  timer(key, test) {
    const { student } = this.props;
    const extendTime = student.extendTime;

    const testStartTime = test.startTime;
    const totalTime = test.total;
    const testTime = test.time;
    const extension = (testTime * extendTime) - testTime;
    const actualTestTime = totalTime - extension;

    if (actualTestTime > 0) {
      this.actualExtension = totalTime - actualTestTime;
    } else if (actualTestTime <= 0) {
      this.actualExtension = totalTime;
    }

    this.setState({
      bottomBarRatio: extension / (testTime * extendTime)
    });
    this.setState({
      topBarRatio: 1 - this.state.bottomBarRatio
    });

    // in case timer has not started yet (test 1) OR: timer has ended
    if ((test.startTime == 0 && !test.isOver && !test.isTimerPaused) || test.isOver) {

      this.setState({
        topBarWidth   : this.state.topBarRatio * 100,
        bottomBarWidth: this.state.bottomBarRatio * 100,
        countdown     : processTime(totalTime, 19)
      });

    // timer 1 runs out to zero
  } else if (totalTime + testStartTime - Date.now() <= 0 && !test.isTimerPaused && !test.isOver) {

      this.setState({
        topBarWidth   : 0,
        bottomBarWidth: 0,
        countdown     : 18000000
      });

      const updatedStudent = {
        ...student,
        [student.test.isOver]: true,
        [student.test.isTimerPaused]: false
      }
      this.props.updateStudent(key, updatedStudent);

    // timer is counting down (test 1)
  } else if (!test.isTimerPaused && !test.isOver) {

      this.setState({
        topBarDividend   : testStartTime + actualTestTime - this.props.time
      });
      this.setState({
        topBarWidth      : (this.topBarDividend > 0) ? this.topBarDividend / testTime * 100 * this.topBarRatio : 0,
        bottomBarDividend: (this.topBarDividend > 0) ? extension : testStartTime + totalTime - this.props.time
      });
      // ultimate outputs
      this.setState({
        bottomBarWidth: this.bottomBarDividend / extension * 100 * this.bottomBarRatio,
        dueTime: this.processTime(testStartTime + totalTime, 19)
      });
      this.setState({
        countdown: this.dueTime - this.props.time
      });

    // timer is paused (test 1)
  } else if (!test.isOver && test.isTimerPaused) {
      this.setState({
        topBarWidth: (actualTestTime > 0) ? actualTestTime / testTime * 100 * this.topBarRatio : 0,
        bottomBarDividend: (actualTestTime > 0) ? extension : this.actualExtension
      });
      this.setState({
        bottomBarWidth: this.bottomBarDividend / extension * 100 * this.bottomBarRatio,
        countdown: this.processTime(totalTime, 19)
      });
    }

    // return {
    //   countdown: this.state.countdown,
    //   top: this.state.topBarWidth,
    //   bottom: this.state.bottomBarWidth,
    //   topBarDividend: this.state.topBarDividend,
    //   bottomBarDividend: this.state.bottomBarDividend
    // }

  }

  pauseTimer(key, test) {
    const { student } = this.props;
    const updatedStudent = {
      ...student,
      [test.isTimerPaused]: true,
      [test.total]: (test.startTime + test.total) - Date.now(),
      [test.startTime]: 0,
      [test.pausedTime]: Date.now()

    }
    this.props.updateStudent(key, updatedStudent);

    // this.setState((prevState, props) => {
    //   test.isTimerPaused: true,
    //   test.total: (prevState.student.tests.test.total + test.startTme) - Date.now(),
    //   test.startTime: 0,
    //   test.pausedTime: Date.now()
    // }));

    clearInterval(this.timerVar);

    this.timer(key, test);
  }

  resumeTimer(key, test) {
    const { student } = this.props;
    const updatedStudent = {
      ...student,
      [test.isTimerPaused]: false,
      [test.pausedTotal]: test.pausedTotal + Date.now() - test.pausedTime

    }
    this.props.updateStudent(key, updatedStudent);

    // this.setState((prevState, props) => {
    //   test.isTimerPaused: false,
    //   test.pausedTotal: prevState.student.tests.test.pausedTotal + Date.now() - prevState.student.tests.test.pausedTime,
    //   test.startTime: 0,
    //   test.pausedTime: Date.now()
    // }));

    this.startTimer(key, test)
  }

  resetTimer(key, test) {
    const { student } = this.props;
    const updatedStudent = {
      ...student,
      [test.isTimerPaused]: false,
      [test.total]: test.time * student.extendTime,
      [test.pausedTime]: 0,
      [test.pausedTotal]: 0,
      [test.startTime]: 0,
      [test.hasTimerStarted]: false

    }
    this.props.updateStudent(key, updatedStudent);

    // this.setState((prevState, props) => {
    //   test.isTimerPaused: false,
    //   test.pausedTotal: prevState.student.tests.test.pausedTotal + Date.now() - prevState.student.tests.test.pausedTime,
    //   test.startTime: 0,
    //   test.pausedTime: Date.now()
    // }));

    clearInterval(this.timerVar);
  }

  endTimer(key, test) {
    const { student } = this.props;
    const updatedStudent = {
      ...student,
      [test.isTestOneOver]: true,
      [test.endedAt]: Date.now(),

    }
    this.props.updateStudent(key, updatedStudent);

    // this.setState({
    //   test.isTestOneOver: true,
    //   test.endedAt: Date.now()
    // });

    clearInterval(this.timerVar);
  }

  startTime(test) {
    if (test.startRec == 0) {
      return "00:00:00";
    } else if (test.startRec > 0) {
      return test.startRec;
    }
  };

  endTime(test, option) {
    const { student } = this.props;
    if (test.startRec == 0) {
      return "00:00:00";
    } else if (test.startRec > 0) {
      if (option == "standard") {
        return test.time + test.startRec;
      } else if (option == "extended") {
        return (test.time * student.extendTime) + test.startRec;
      } else if (option == "actual") {
        return test.endedAt;
      }
    }
  }

  testTime(key, test, option) {
    const { student } = this.props;
    const testExtension = (test.time * student.extendTime) - test.time;
    const total = test.time * student.extendTime;
    if (option == "standard") {
      return processTime(test, 19);
    } else if (option == "extended") {
      return processTime(testExtension, 19);
    } else if (option == "extendedBar") {
      return testExtension;
    } else if (option == "total") {
      return processTime(total, 19);
    }
  }

  // END Student Test TIMER variables and functions

  // BEGIN Test Display Functions

  fullBarStyle(studentKey, test) {
    return {
      width: this.state.bottomBarWidth + this.state.topBarWidth + '%'
    }
  }

  standardBarStyle(studentKey, test) {
    return {
      width: this.state.bottomBarWidth + '%'
    }
  }

  extendBarStyle(studentKey, test) {
    return {
      width: this.state.topBarWidth + '%'
    }
  }

  extendZeroBarStyle() {
    return {
      width: 0 + '%'
    }
  }

  renderFormButton(key) {
    const testTotal =
    if(testTotal == 0 || !this.state.addInLineTest) {
      return (
        <div className="addTest dataButtonsAndBars col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div>
            <i className="fa fa-plus" aria-hidden="true" onClick={() => this.changeState(this.state.addInLineTest, true)}></i>
          </div>
        </div>
      )
    }
  }



  renderTests(key) {
    // const { student, index} = this.props;



  }

  // END Test Display Functions

  render() {
    const { student, index} = this.props
    const key = index;
    // console.log("index = ", index)
    // const studentKey = key;
    // console.log("studentKey = ", studentKey);
    // const key = this.props.key;
    // console.log("key = ", key);
    // const { student } = this.props;
    // console.log("student = ", student);
    // e.g. const student = this.props.student;
    // e.g. const index = this.props.index;

    // const isAvailable = student.status === 'available';
    // const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';

    if(!this.state.printPage) {
      return(
        <div className="row studentDisplay marginLeft marginRight col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="student col-lg-12 col-md-12 col-sm-12 col-xs-12">
  {/* STUDENT: checkbox, name, extend-time*/}
            <div className="checkboxIndexName marginRight marginLeft col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {/* <input type="checkbox" className="checkbox" name="isSafeToDelete" checked={student.isSafeToDelete} onChange={(e) => this.handleCheckbox(e, key)}/> */}
              <input type="checkbox" className="checkbox" name="isSafeToDelete" checked={student.isSafeToDelete} onChange={(e) => this.handleChange(e, key)}/>
              <div className="indexAndNameCell">
                <p className="indexAndName">
                  {student.order + 1}. {student.name} ({student.extendTime}) {student.isSafeToDelete}
                </p>
  {/*delete*/}
                <button onClick={() => this.props.removeStudent(key)}>
                  <i className={"fa fa-times deleteBtn" + (student.isSafeToDelete) ? "" : "hidden"}></i>
                </button>
              </div>
            </div>
          </div>
  {/* END STUDENT DISPLAY */}

  {/* BEGIN TESTS */}
          {/* {this.renderTests()} */}
  {/* END TESTS */}

        </div>
      )
    } else {
      return(
        <div class="container tableWrap">
          <table class="table table-striped table-bordered table-hover table-condensed table-responsive">
            <tr>
              <th align="center" colspan="8"><p class="title">Student Report</p></th>
            </tr>
            <tr>
              <th class="column column1"><p>Student name</p></th>
              <th class="column column2"><p>Time Extension</p></th>
              <th class="column column3"><p>Test Name</p></th>
              <th class="column column4"><p>Test Start</p></th>
              <th class="column column5"><p>Test Standard Time End</p></th>
              <th class="column column6"><p>Test Extended Time End</p></th>
              <th class="column column7"><p>Test Actual Time End</p></th>
              <th class="column column8"><p>Total Time Paused</p></th>
            </tr>
            <tr ng-repeat="student in students">
              <td class="cell"><p>{student.name}</p>
              </td>
              <td class="cell"><p>{student.extendTime}</p>
              </td>
              <td class="cell">
                <p ng-show="student.testOneName">{student.tests.Atest.name}</p>
                <p ng-show="student.testTwoName">{student.tests.Btest.name}</p>
                <p ng-show="student.testThreeName">{student.tests.Ctest.name}</p>
                <p ng-show="student.testFourName">{student.tests.Dtest.name}</p>
              </td>
              <td class="cell">
                <p ng-show="student.testOneStartRecord">{this.startTime(student.tests.Atest)}</p>
                <p ng-show="student.testTwoStartRecord">{this.startTime(student.tests.Btest)}</p>
                <p ng-show="student.testThreeStartRecord">{this.startTime(student.tests.Ctest)}</p>
                <p ng-show="student.testFourStartRecord">{this.startTime(student.tests.Dtest)}</p>
              </td>
              <td class="cell">
                <p ng-show="student.testOneStartRecord">{this.endTime(key, student.tests.Atest, "standard")}</p>
                <p ng-show="student.testTwoStartRecord">{this.endTime(key, student.tests.Btest, "standard")}</p>
                <p ng-show="student.testThreeStartRecord">{this.endTime(key, student.tests.Ctest, "standard")}</p>
                <p ng-show="student.testFourStartRecord">{this.endTime(key, student.tests.Dtest, "standard")}</p>
              </td>
              <td class="cell">
                <p ng-show="student.testOneStartRecord">{this.endTime(key, student.tests.Atest, "extended")}</p>
                <p ng-show="student.testTwoStartRecord">{this.endTime(key, student.tests.Btest, "extended")}</p>
                <p ng-show="student.testThreeStartRecord">{this.endTime(key, student.tests.Ctest, "extended")}</p>
                <p ng-show="student.testFourStartRecord">{this.endTime(key, student.tests.Dtest, "extended")}</p>
              </td>
              <td class="cell">
                <p ng-show="student.testOneEndedAt">{this.endTime(key, student.tests.Atest, "actual")}</p>
                <p ng-show="student.testTwoEndedAt">{this.endTime(key, student.tests.Btest, "actual")}</p>
                <p ng-show="student.testThreeEndedAt">{this.endTime(key, student.tests.Ctest, "actual")}</p>
                <p ng-show="student.testFourEndedAt">{this.endTime(key, student.tests.Dtest, "actual")}</p>
              </td>
              <td class="cell">
                <p ng-show="student.pausedTotalOne">{parseTime(student.tests.Atest.pausedTotal).hourMinSec}</p>
                <p ng-show="student.pausedTotalTwo">{parseTime(student.tests.Btest.pausedTotal).hourMinSec}</p>
                <p ng-show="student.pausedTotalThree">{parseTime(student.tests.Ctest.pausedTotal).hourMinSec}</p>
                <p ng-show="student.pausedTotalFour">{parseTime(student.tests.Dtest.pausedTotal).hourMinSec}</p>
              </td>
            </tr>
          </table>
        </div>
      )
    }

  }
}

Student.propTypes = {
  student: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired
  // addToOrder: PropTypes.func.isRequired
}


export default Student;
