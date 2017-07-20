import React from 'react';
import Test from './Test';
// import { mountNumberInput, addHoursAndMinutes, processTime, parseTime } from '../helpers';
import { addHoursAndMinutes, processTime, parseTime } from '../helpers';
import PropTypes from 'prop-types';

class Student extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    // this.handleInput = this.handleInput.bind(this);
    // this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.startTime = this.startTime.bind(this);
    this.endTime = this.endTime.bind(this);
    this.testTime = this.testTime.bind(this);
    this.renderTests = this.renderTests.bind(this);
    this.state = {
      hour: 0
    }
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

  // handleInput(e, key) {
  //   const { student } = this.props;
  //   const updatedStudent = {
  //     ...student,
  //     [e.target.name]: e.target.value
  //   }
  //   // const updateStudent = Object.assign({}, student)
  //   this.props.updateStudent(key, updatedStudent);
  //   this.props.toggleInvert();
  // }
  //
  // handleCheckbox(e, key) {
  //   console.log("e.target.checked = " + e.target.checked + ". e.target.name = " + e.target.name)
  //   const { student } = this.props;
  //   const updatedStudent = {
  //     ...student,
  //     [e.target.name]: e.target.checked
  //   }
  //   this.props.updateStudent(key, updatedStudent);
  //   this.props.toggleInvert();
  // }

  // updateStudent(key, updatedStudent) {
  //   const students = {...this.state.students};
  //   students[key] = updatedStudent;
  //   this.setState({ students });
  //   // alternative syntax for the above: this.setState({students: students})
  // }

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

// BEGIN Student Test TIMER variables and functions

  // componentDidMount() {
  //   const students = this.props.students;
  //   for (var i = 0; i < this.props.selectedTests.length; i++) {
  //     if (students[this.props.key] == this.props.selectedStudents[i]) {
  //       this.startTimer(this.props.selectedStudents[i], this.props.selectedTests[i]);
  //     }
  //   }
  // }

  relay(value, boolean) {
    return {
      boolean: boolean,
      value: value
    }
  }



  // In case you need to refactor above function:

  // this.props.updateStudent(key, updatedStudent) =

  // updateStudent(key, updatedStudent) {
  //   const students = {...this.state.students};
  //   students[key] = updatedStudent;
  //   this.setState({ students })
  // }

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

  componentWillUpdate(newProps,newState) {
    const { student } = this.props;
    // if(!newState.show){
    //     $(ReactDOM.findDOMNode(this.refs.inlineForm)).css({'display':'initial'});
    // } else{
    //   $(ReactDOM.findDOMNode(this.refs.inlineForm)).css({'display':'none'});
    // }
    //
    // if(student.isSafeToDelete){
    //   $(ReactDOM.findDOMNode(this.refs.safeDeleteHighlight)).css({'padding-left': '1em',
    //     'transition': 'all 1s ease-in-out'});
    // } else{
    //   $(ReactDOM.findDOMNode(this.refs.safeDeleteHighlight)).css({'padding-left': '0',
    //   'transition': 'all 1s ease-in-out'});
    // }


  }

  componentDidUpdate(oldProps,oldState){
    // if(this.state.show){
    //     $(ReactDOM.findDOMNode(this.refs.elem)).css({'display':'initial'});
    // }else{
    //   $(ReactDOM.findDOMNode(this.refs.elem)).css({'display':'none'});
    // }
    //
    // if(!student.isSafeToDelete){
    //   $(ReactDOM.findDOMNode(this.refs.safeDeleteHighlight)).css({'padding-left': '1em',
    //     'transition': 'all 1s ease-in-out'});
    // } else{
    //   $(ReactDOM.findDOMNode(this.refs.safeDeleteHighlight)).css({'padding-left': '0',
    //   'transition': 'all 1s ease-in-out'});
    // }
  }

  componentDidMount() {
    // mountNumberInput();
  }

  componentWillUpdate(nextProps, nextState) {
    const { student } = this.props;
    // The above = const student = this.props.students[key]

    // if(this.relay().isOn) {
    //   this.timerVar = setInterval(
    //     () => this.timer(key, this.relay().test),
    //     1000
    //   );
    // }

  }

  renderTests() {
    const { student, index} = this.props;
    return (
      <ul className="tests">
        {Object
          .keys(student.tests)
          .map(key => <Test
                        test={student.tests[key]}
                        studentKey={this.state.studentKey}
                        student={this.props.students[index]}
                        students={this.props.students}
                        hour={this.state.hour}
                        selectedTests={this.props.selectedTests}
                        handleChange={this.handleChange}
                        handleHourChange={this.handleHourChange}
                        handleMinuteChange={this.handleMinuteChange}
                        startTime={this.startTime}
                        endTime={this.endTime}
                        testTime={this.testTime}
                      />
          )
        }
      </ul>
    )
  }

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
