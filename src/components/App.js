import React from 'react';
import Header from './Header';
import Order from './Order';
import Landing from './Landing';
import UserPage from './UserPage';
import Student from './Student';
import sampleStudentes from '../sample-students.js';
import rebase from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.addStudent = this.addStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.deleteAllStudents = this.deleteAllStudents.bind(this);
    this.warnClose = this.warnClose.bind(this);
    this.addHoursAndMinutes = this.addHoursAndMinutes.bind(this);
    this.processTimeInput = this.processTimeInput.bind(this);
    this.toggleInvert = this.toggleInvert.bind(this);
    this.alertON = this.alertON.bind(this);
    this.alertOFF = this.alertON.bind(this);

    // getinitialState
    this.state = {
      students: {},
      alert: false,
      selectAll: true,
      clickedToDelete: false,
      deleteAppear: false,
      clearSelected: false,
      warn: false
    };
  }

  componentWillMount() {
    this.ref = rebase.base.syncState(`${this.props.match.params.userID}/students`, {
      context: this,
      state: 'students'
    });
  }

  componentWillUnmount() {
    rebase.base.removeBinding(this.ref);
  }

  // componentWillUpdate(nextProps, nextState) {
  //   localStorage.setItem(`order-${this.props.match.params.storeID}`, JSON.stringify(nextState.order));
  // }

  addStudent(student) {
    // update our state
    const students = {...this.state.students};
    // add in our new student
    const timestamp = Date.now();
    students[`student-${timestamp}`] = student;
    // you can do this: this.state.students.student1 = student;
    // set state
    // this is more standard, grabbing the state and updating it: this.setState({ students: students})
    // the below is the most advanced syntax, ES6
    this.setState({ students });
    console.log("this.state.students = ", this.state.students);
  }

  updateStudent(key, updatedStudent) {
    const students = {...this.state.students};
    students[key] = updatedStudent;
    this.setState({ students });
    // alternative syntax for the above: this.setState({students: students})
  }

  removeStudent(key) {
    const students = {...this.state.students};
    students[key] = null;
    this.setState({ students });
    this.setState({ selectAll       : true,
                    clickedToDelete : false,
                    deleteAppear    : false
    });
    console.log("student has been removed");
  }

  deleteSelected() {
    this.setState({ clearSelected   : false,
                    deleteAppear    : false
    });
    window.setTimeout(
      this.setState({ selectAll       : true,
                      clickedToDelete : false
      }),
    1000);

    Object
      .keys(this.state.students)
      .map(key => {
        if(students[key].isSafeToDelete) {
          students[key] = null;
        }
      });

    // const students = Object.keys(this.state.students);
    //
    // for (var i = 0; i < students.length; i++) {
    //   if (students[i].isSafeToDelete) {
    //     students[i] = null;
    //   }
    // }

    this.setState({ students });

  }

  deleteAllStudents() {
    this.setState({ warn: false });

    Object
      .keys(this.state.students)
      .map(key => {
        students[key] = null;
      });

    this.setState({ students });

  }

  warnClose() {
    this.setState({ warn: true });
  }

  addHoursAndMinutes(hours, minutes) {
    const timeInMillisecs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    return timeInMillisecs;
  }

  processTimeInput(key, testNo) {

  }

  toggleInvert() {

  }

  alertON() {
    this.setState({ alert: true});
  }

  alertOFF() {
    this.setState({ alert: false});
  }

  render() {
    return(
      <div className="main-frame">
        <Header
          age="5000"
          state={this.state}
        />
        {
          Object
            .keys(this.state.students)
            .map(key => <Student
                          key={key}
                          index={key}
                          // student={this.state.students[key]}
                          updateStudent={this.updateStudent}
                          removeStudent={this.removeStudent}
                        />
            )
        }
        {/* .keys() extracts the keys from an object and pushes them all into an array.  .map() iterates over this array. */}

        {/* <UserPage
          students={this.state.students}
          addStudent={this.addStudent}
          updateStudent={this.updateStudent}
          removeStudent={this.removeStudent}
        /> */}
        <AddStudentForm
          students={this.state.students}
          addStudent={this.addStudent}
          addHoursAndMinutes={this.addHoursAndMinutes}
          toggleInvert={this.toggleInvert}
          alertON={this.alertON}
          alertOFF={this.alertOFF}
        />
      </div>
    )
  }
}

export default App;
