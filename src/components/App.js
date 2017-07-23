import React from 'react';
import Header from './Header';
// import Landing from './Landing';
import Student from './Student';
import classnames from 'classnames';
import AddStudentForm from './AddStudentForm';
import rebase from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.getTeacherName = this.getTeacherName.bind(this);
    this.logout = this.logout.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.deleteAllStudents = this.deleteAllStudents.bind(this);
    this.warnClose = this.warnClose.bind(this);
    this.addHoursAndMinutes = this.addHoursAndMinutes.bind(this);
    this.toggleInvert = this.toggleInvert.bind(this);
    this.displayWarning = this.displayWarning.bind(this);
    this.displayAlert = this.displayAlert.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
    this.displayFormControls = this.displayFormControls.bind(this);
    this.renderClickedToDelete = this.renderClickedToDelete.bind(this);
    this.renderSwitchControlButton = this.renderSwitchControlButton.bind(this);
    this.displayControlButtons = this.displayControlButtons.bind(this);

    this.alertON = this.alertON.bind(this);
    this.alertOFF = this.alertON.bind(this);
    this.tick = this.tick.bind(this);
    this.dbTimeout = this.dbTimeout.bind(this);
    this.dbTimeErase = this.dbTimeErase.bind(this);
    this.warningRejection = this.warningRejection.bind(this);
    this.startSelectedTests = this.startSelectedTests.bind(this);
    this.switchControl = this.switchControl.bind(this);
    this.toggleSelectForDelete = this.toggleSelectForDelete.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    // this.getStyle = this.getStyle.bind(this);

    // getinitialState
    this.state = {
      printPage: false,
      students: {},
      selectAll: true,
      invertSelected: false,
      clickedToDelete: false,
      deleteAppear: false,
      clearSelected: false,
      warn: false,
      alert: false,
      time: new Date(),
      waitOption: 1800000,
      timeoutStarted: false,
      info: false,
      selectedStudents: [],
      selectedTests: [],
      areThereEnoughStudents: false
    };
  }

  // BEGIN lifecycle hooks AND clock functions

  tick() {
    this.setState({
      time: new Date()
    });
  }

  componentDidMount() {

    this.clock = setInterval(
      () => this.tick(),
      1000
    );

    this.setState({
      areThereEnoughStudents: Object.keys(this.state.students).length < 2
    });

    if(!this.state.timeoutStarted) {
      setTimeout(
        () => this.dbTimeout(),
        this.state.waitOption);
      setTimeout(
        () => this.dbTimeErase(),
        this.state.waitOption)
    }

    // if(!this.state.uid) {
    //   this.props.location.pathname = `/`;
    //   this.props.history.push(`/`);
    //   this.props.history.replace(`/`);
    // }
  }

  componentWillMount() {
    this.ref = rebase.base.syncState(`${this.props.match.params.userID}/students`, {
      context: this,
      state: 'students'
    });
  }

  componentWillUnmount() {
    clearInterval(this.clock);

    rebase.base.removeBinding(this.ref);
  }

  // END lifecycle hooks AND clock functions

  // BEGIN Student CRUD functions

    addStudent(student) {
      // update our state
      const students = {...this.state.students};
      // add in our new student
      const timestamp = Date.now();
      students[`student-${timestamp}`] = student;
      student.tests[`Atest`] = student.tests.Atest;
      student.tests[`Btest`] = student.tests.Btest;
      student.tests[`Ctest`] = student.tests.Ctest;
      student.tests[`Dtest`] = student.tests.Dtest;
      // you can do this: this.state.students.student1 = student;
      // set state
      // this is more standard, grabbing the state and updating it: this.setState({ students: students})
      // the below is the most advanced syntax, ES6
      this.setState({ students });
      console.log("this.state.students = ", this.state.students);
      setTimeout(
        () => this.setState({
          alert: false
        }),
        5000
      )
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
      setTimeout(
        () => this.setState({ selectAll       : true,
                              clickedToDelete : false
        }),
        1000);

      const students = this.state.students;

      Object
        .keys(students)
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
      const students = this.state.students;
      Object
        .keys(students)
        .map(key => {
          students[key] = null;
        });

      this.setState({ students });

    }

    toggleSelectForDelete() {
      const students = this.state.students;
      Object
        .keys(students)
        .map(key => {
          if (!students[key].isSafeToDelete) {
            students[key].isSafeToDelete = true;
          } else if (students[key].isSafeToDelete) {
            students[key].isSafeToDelete = false;
          }
          this.updateStudent(key, students[key]);
        });
    }

  // END Student CRUD functions

  getTeacherName(string) {
    var str = string.trim();
    var spaceIndex = str.indexOf(str.match(/\s/));
    var lastName = str.slice(spaceIndex + 1, str.length);
    return lastName;
  }

  // componentWillUpdate(nextProps, nextState) {
  //   localStorage.setItem(`order-${this.props.match.params.storeID}`, JSON.stringify(nextState.order));
  // }

// BEGIN Functions to be distributed to various Children

  logout() {
    rebase.app.auth().signout().then(() => {
      // this.setState({uid: null});
      // this.props.location.pathname = `/`;
      // this.props.history.push(`/`);
      // this.props.history.replace(`/`);
      console.log('signed out');
    }, error => {
      console.error("sign out error", error)
    });
    if(!this.state.uid) {
      this.props.location.pathname = `/`;
      this.props.history.push(`/`);
      this.props.history.replace(`/`);
    }
  }

  addHoursAndMinutes(hours, minutes) {
    const timeInMillisecs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    return timeInMillisecs;
  }

// END Functions to be distributed to various Children

// BEGIN (collective) students functions

startSelectedTests() {
  const students = {...this.state.students};
  Object
    .keys(this.state.students)
    .map(key => {
      const student = students[key];
      if (student.isSafeToDelete) {
        const tests = student.tests;
        Object
        .keys(tests)
        .map(key =>{
          if(!tests[key].hasTimerStarted && !tests[key].isOver) {
            this.setState({
              selectedTests: this.state.selectedTests.push(tests[key]),
              selectedStudents: this.state.selectedStudents.push(student)
            });
          }
        });

      }
    });
    this.setState({
      info: true
    });
    setTimeout(
      () => this.setState({
        info: false
      }),
      5000
    )
}

renderHeader() {
  return (
    <Header
      age="5000"
      state={this.state}
      logout={this.logout}
      printPage={this.state.printPage}
      time={this.state.time}
    />
  )
}

// END (collective) students functions

// BEGIN General Students' alert displays and selection functionality

  warnClose() {
    this.setState({ warn: true });
  }

  dbTimeout() {
    this.setState({ warn: true });
  }

  dbTimeErase() {
    this.logout();
  }

  warningRejection() {
    this.setState({ warn          : false,
                    waitOption    : this.state.waitOption + 1800000,
                    timeoutStarted: false
    });
    console.log("this.state.warn = " + this.state.warn);
    console.log("this.state.waitOption = " + this.state.waitOption);
    console.log("this.state.timeoutStarted = " + this.state.timeoutStarted);
  }

  alertON() {
    this.setState({ alert: true});
  }

  alertOFF() {
    this.setState({ alert: false});
  }

  displayWarning() {
    if(this.state.warn) {
      return (
        <div className="alert alert-danger" role="alert">
          <div className="alert-message">Do you wish to erase student list and close session?
            <div className="yesNoContainer">
              <button className="yesBtn" onClick={() => this.logout()}><p>close session</p></button>
              <button className="noBtn" onClick={() => this.warningRejection()}><p>not yet</p></button>
            </div>
          </div>
        </div>
      )
    }
  }

  displayAlert() {
    if(this.state.alert) {
      return (
        <div className="alert alert-warning" role="alert">
          <i className="fa fa-exclamation" aria-hidden="true"></i>
          <i className="fa fa-exclamation" aria-hidden="true"></i>
          <i className="fa fa-exclamation" aria-hidden="true"></i> oops! At minimum, please enter student name and testing extension multiple.
          <i className="fa fa-exclamation" aria-hidden="true"></i>
          <i className="fa fa-exclamation" aria-hidden="true"></i>
          <i className="fa fa-exclamation" aria-hidden="true"></i>
        </div>
      )
    }
  }

  displayInfo() {
    if(this.state.info) {
      return (
        <div className="alert alert-info" role="alert">There are no tests ready to start at this time.</div>
      )
    }
  }

  toggleInvert() {
    this.unsafeCount = 0;
    this.safeCount = 0;

    Object
      .keys(this.state.students)
      .map(key => {
        const students = this.state.students;
        if(students[key] & students[key].isSafeToDelete) {
          this.safeCount++;
        } else if(students[key] && !students[key].isSafeToDelete) {
          this.unsafeCount++;
        }
      });

    this.setState({
      clickedToDelete: false
    });

    if(this.safeCount > 0) {
      this.setState({
        clickedToDelete: true
      });

      setTimeout(
        () => this.setState({
          deleteAppear: true
        }),
      1000);
    } else {
      this.setState({
        deleteAppear: true
      });

      setTimeout(
        () => this.setState({
          clickedToDelete: true
        }),
      1000);
    }
    console.log("clickedToDelete: " + this.state.clickedToDelete);

    if (this.safeCount > 0 && this.unsafeCount > 1) {
      this.setState({
        invertSelected: true,
        selectAll   : false
      });
      console.log("safeCount: " + this.safeCount);
      console.log("invertSelected is" + this.state.invertSelected + "; selectAll is " + this.state.selectAll);
    } else if (this.safeCount > 0 && this.safeCount === Object.keys(this.state.students).length) {
        this.setState({
          invertSelected   : false,
          selectAll      : false,
          clearSelected  : true,
          clickedToDelete: true
        });
      console.log("invertSelected " + this.state.invertSelected + "; selectAll is " + this.state.selectAll);
    } else if (this.safeCount === 0) {
      this.setState({
        invertSelected   : true,
        selectAll      : true,
        clickedToDelete: false
      });
      console.log("invertSelected " + this.state.invertSelected + " is false; selectAll is " + this.state.selectAll);
    }
  }

  displayControlButtons() {
    if(this.state.selectAll && !this.state.invertSelected) {
      return (
        <p role="alert">select all</p>
      )
    } else if(this.state.clearSelected && !this.state.invertSelected) {
      return (
        <p role="alert">clear selected</p>
      )
    } else if(this.state.invertSelected) {
      return (
        <p className={(this.state.invertSelected) ? "" : "hidden"} role="alert">invert selection</p>
      )
    }
  }

  renderSwitchControlButton() {
    return (
      <button className="controlBtn selectAll clearAll invertSelection" onClick={() => this.switchControl(this.state.students)}>
        {this.displayControlButtons()}
      </button>
    )
  }

  renderClickedToDelete() {
    if(this.state.clickedToDelete) {
      return (
        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 mainBtn'>
          {this.renderSwitchControlButton()}
        </div>
      )
    } else {
      return (
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 mainBtn'>
          {this.renderSwitchControlButton()}
        </div>
      )
    }
  }

  switchControl() {
    if (this.state.selectAll && !this.state.invertSelected) {
      this.toggleSelectForDelete();
      this.setState({
          selectAll: false,
          invertSelected: false,
          clickedToDelete: true
      });
      setTimeout(
        () => this.setState({
          clearSelected: true}),
        1000
      );
      setTimeout(
        () => this.setState({
          deleteAppear: true}),
        1000
      );

    } else if (this.state.clearSelected) {

      this.toggleSelectForDelete();
      this.setState({
        clearSelected: false,
        deleteAppear: false
      });
      setTimeout(
        () => this.setState({
          selectAll: true}),
        1000
      );
      setTimeout(
        () => this.setState({
          clickedToDelete: false}),
        1000
      );

    } else if (this.state.invertSelected) {
      this.toggleSelectForDelete();
    }
  }

  displayFormControls() {
    // if(Object.keys(this.state.students).length < 2) {
    if(this.state.areThereEnoughStudents) {
      return (
        <div className="row formControls marginLeft marginRight">
          <div className={(this.state.clickedToDelete) ? 'col-lg-4 col-md-4 col-sm-4 col-xs-4 mainBtn' : 'col-lg-12 col-md-12 col-sm-12 col-xs-12 mainBtn'}>
            <button className="controlBtn selectAll clearAll invertSelection" onClick={() => this.switchControl(this.state.students)}>
              <p className={(this.state.selectAll && !this.state.invertSelected) ? "" : "hidden"} role="alert">select all</p>
              <p className={(this.state.clearSelected && !this.state.invertSelected) ? "" : "hidden"} role="alert">clear selected</p>
              <p className={(this.state.invertSelected) ? "" : "hidden"} role="alert">invert selection</p>
            </button>
          </div>
          <div className={(this.state.deleteAppear) ? "col-lg-4 col-md-4 col-sm-4 col-xs-4 deleteSelectedStudents IIndaryBtnYes" : "col-lg-4 col-md-4 col-sm-4 col-xs-4 deleteSelectedStudents IIndaryBtnNo"}>
            <button className="controlBtn deleteSelected" onClick={() => this.deleteSelected()}>
              <p>delete selected</p>
            </button>
          </div>
          <div className={(this.state.deleteAppear) ? "col-lg-4 col-md-4 col-sm-4 col-xs-4 startSelectedTests IIndaryBtnYes" : "col-lg-4 col-md-4 col-sm-4 col-xs-4 startSelectedTests IIndaryBtnNo"}>
            <button className="controlBtn deleteSelected" onClick={() => this.startSelectedTests()}>
              <p>start selected tests</p>
            </button>
          </div>
        </div>
      )
    }
  }

// END General Students' alert displays and selection functionality

// BEGIN render

  render() {
    return (
      <div className="main-frame">
        {this.renderHeader()}
        <div className="list-group">
          {this.displayWarning()}
          {this.displayAlert()}
          {/* <div className={"alert alert-info" + (this.state.info) ? "" : "hidden"} role="alert">There are no tests ready to start at this time.</div> */}
          {this.displayInfo()}

{/*begin Student Display*/}
          <div className="container-fluid main-body w3-panel w3-card-2">
{/*SELECT / DELETE CONTROLS*/}
            {this.displayFormControls()}
            <ul className="TrackerPage">
              {Object
                .keys(this.state.students)
                .map(key => <Student
                              printPage={this.state.printPage}
                              key={key}
                              index={key}
                              students={this.state.students}
                              student={this.state.students[key]}
                              selectedTests={this.state.selectedTests}
                              selectedStudents={this.state.selectedStudents}
                              toggleInvert={this.toggleInvert}
                              time={this.state.time}
                              updateStudent={this.updateStudent}
                              removeStudent={this.removeStudent}
                            />
                )
              }
          </ul>
        </div> {/* END CONTAINER-FLUID MAIN-BODY */}
        <div className={(this.state.printPage) ? "hidden" : ""}>
          <AddStudentForm
            students={this.state.students}
            addStudent={this.addStudent}
            addHoursAndMinutes={this.addHoursAndMinutes}
            toggleInvert={this.toggleInvert}
            alertON={this.alertON}
            alertOFF={this.alertOFF}
          />
        </div>
      </div>
    </div>
    )
  }
}

export default App;
