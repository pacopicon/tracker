import React from 'react';
import { mountNumberInput, addHoursAndMinutes, processTime, parseTime } from '../helpers';
import PropTypes from 'prop-types';

class Student extends React.Component {
  constructor() {
    super();
    this.renderFormOrData = this.renderFormOrData.bind(this);
    this.renderFormButton = this.renderFormButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeState = this.changeState.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleInlineToggle = this.handleInlineToggle.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.relay = this.relay.bind(this);
    this.timer = this.timer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
    this.startTime = this.startTime.bind(this);
    this.endTime = this.endTime.bind(this);
    this.testTime = this.testTime.bind(this);
    this.fullBarStyle = this.fullBarStyle.bind(this);
    this.standardBarStyle = this.standardBarStyle.bind(this);
    this.extendBarStyle = this.extendBarStyle.bind(this);
    this.extendZeroBarStyle = this.extendZeroBarStyle.bind(this);
    this.state = {
      addInlineAtest: false,
      addInlineBtest: false,
      addInlineCtest: false,
      addInlineDtest: false,
      hideFinishedAtest: false,
      hideFinishedBtest: false,
      hideFinishedCtest: false,
      hideFinishedDtest: false,
      redHoverA: false,
      redHoverB: false,
      redHoverC: false,
      redHoverD: false,
      hour: 0,
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

  changeState(key, value) {
    this.setState({
        key: value
    });
  }

  handleHourChange(e, key, test) {
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

  handleInlineToggle(e, addInLineTest) {

  }

// BEGIN Student Test TIMER variables and functions

  componentDidMount() {
    const students = this.props.students;
    for (var i = 0; i < this.props.selTests.length; i++) {
      if (students[this.props.key] == this.props.selStudents[i]) {
        this.startTimer(this.props.selStudents[i], this.props.selTests[i]);
      }
    }
  }

  relay(value, boolean) {
    return {
      boolean: boolean,
      value: value
    }
  }

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

    this.relay(test, true);

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

    return {
      countdown: this.state.countdown,
      top: this.state.topBarWidth,
      bottom: this.state.bottomBarWidth,
      topBarDividend: this.state.topBarDividend,
      bottomBarDividend: this.state.bottomBarDividend
    }

  }

  pauseTimer(key, test) {
    // const { student } = this.props;
    // const updatedStudent = {
    //   ...student,
    //   [test.isTimerPaused]: true,
    //   [test.total]: (test.startTime + test.total) - Date.now(),
    //   [test.startTime]: 0,
    //   [test.pausedTime]: Date.now()
    //
    // }
    // this.props.updateStudent(key, updatedStudent);

    this.setState((prevState, props) => {
      test.isTimerPaused: true,
      test.total: (prevState.student.tests.test.total + test.startTme) - Date.now(),
      test.startTime: 0,
      test.pausedTime: Date.now()
    }));

    this.relay(test, false);

    this.timer(key, test);
  }

  // In case you need to refactor above function:

  // this.props.updateStudent(key, updatedStudent) =

  // updateStudent(key, updatedStudent) {
  //   const students = {...this.state.students};
  //   students[key] = updatedStudent;
  //   this.setState({ fishes })
  // }

  resumeTimer(key, test) {
    // const { student } = this.props;
    // const updatedStudent = {
    //   ...student,
    //   [test.isTimerPaused]: false,
    //   [test.pausedTotal]: test.pausedTotal + Date.now() - test.pausedTime
    //
    // }
    // this.props.updateStudent(key, updatedStudent);

    this.setState((prevState, props) => {
      test.isTimerPaused: false,
      test.pausedTotal: prevState.student.tests.test.pausedTotal + Date.now() - prevState.student.tests.test.pausedTime,
      test.startTime: 0,
      test.pausedTime: Date.now()
    }));

    this.startTimer(key, test)
  }

  resetTimer(key, test) {
    // const { student } = this.props;
    // const updatedStudent = {
    //   ...student,
    //   [test.isTimerPaused]: false,
    //   [test.total]: test.time * student.extendTime,
    //   [test.pausedTime]: 0,
    //   [test.pausedTotal]: 0,
    //   [test.startTime]: 0,
    //   [test.hasTimerStarted]: false
    //
    // }
    // this.props.updateStudent(key, updatedStudent);

    this.setState((prevState, props) => {
      test.isTimerPaused: false,
      test.pausedTotal: prevState.student.tests.test.pausedTotal + Date.now() - prevState.student.tests.test.pausedTime,
      test.startTime: 0,
      test.pausedTime: Date.now()
    }));

    // componentWillUnmount() {
      clearInterval(this.timerVar);
    // }
  }

  endTimer(key, test) {
    // const { student } = this.props;
    // const updatedStudent = {
    //   ...student,
    //   [test.isTestOneOver]: true,
    //   [test.endedAt]: Date.now(),
    //
    // }
    // this.props.updateStudent(key, updatedStudent);

    this.setState({
      test.isTestOneOver: true,
      test.endedAt: Date.now()
    });

    clearInterval(this.timerVar);
  }

  startTime(test) {
    if (test.startRec == 0) {
      return "00:00:00";
    } else if (test.startRec > 0) {
      return test.startRec;
    }
  };

  endTime(key, test, option) {
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

  componentWillUpdate(newProps,newState){
    const { student } = this.props;
    if(!newState.show){
        $(ReactDOM.findDOMNode(this.refs.inlineForm)).css({'display':'initial'});
    } else{
      $(ReactDOM.findDOMNode(this.refs.inlineForm)).css({'display':'none'});
    }

    if(student.isSafeToDelete){
      $(ReactDOM.findDOMNode(this.refs.safeDeleteHighlight)).css({'padding-left': '1em',
        'transition': 'all 1s ease-in-out'});
    } else{
      $(ReactDOM.findDOMNode(this.refs.safeDeleteHighlight)).css({'padding-left': '0',
      'transition': 'all 1s ease-in-out'});
    }


  }

  componentDidUpdate(oldProps,oldState){
    if(this.state.show){
        $(ReactDOM.findDOMNode(this.refs.elem)).css({'display':'initial'});
    }else{
      $(ReactDOM.findDOMNode(this.refs.elem)).css({'display':'none'});
    }

    if(!student.isSafeToDelete){
      $(ReactDOM.findDOMNode(this.refs.safeDeleteHighlight)).css({'padding-left': '1em',
        'transition': 'all 1s ease-in-out'});
    } else{
      $(ReactDOM.findDOMNode(this.refs.safeDeleteHighlight)).css({'padding-left': '0',
      'transition': 'all 1s ease-in-out'});
    }
  }

  componentDidMount() {
    mountNumberInput();
  }

  componentWillUpdate(nextProps, nextState) {
    const { student } = this.props;
    // The above = const student = this.props.students[key]

    if(this.relay().isOn) {
      this.timerVar = setInterval(
        () => this.timer(key, this.relay().test),
        1000
      );
    }

  }

  componentWillUnmount() {
    if(!this.relay().isOn) {
      clearInterval(this.timeVar);
    }
  }

  fullBarStyle(key, test) {
    return {
      width: (this.timer(key, test).bottom + this.timer(key, test).top) + '%'
    }
  }

  standardBarStyle(key, test) {
    return {
      width: this.timer(key, test).bottom + '%'
    }
  }

  extendBarStyle(key, test) {
    return {
      width: this.timer(key, test).top + '%'
    }
  }

  extendZeroBarStyle() {
    return {
      width: 0 + '%'
    }
  }

  renderFormButton(testTotal, addInLineTest) {
    if(testTotal == 0 || !addInLineTest) {
      return (
        <div className="addTest dataButtonsAndBars col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div>
            <i className="fa fa-plus" aria-hidden="true" onClick={() => this.changeState(addInLineTest, true)}></i>
          </div>
        </div>
      )
    }
  }

  // renderInlineForm(key, test) {
  //   const { student } = this.props;
  //   if(student.tests.)
  renderFormOrData(key, test, addInLineTest, hideFinishedTest, redHover) {
    const { student } = this.props;
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
          <button type="submit" type="button" className="addTestBtn col-lg-1 col-md-1 col-sm-1 col-xs-1" onClick={() => this.changeState(addInLineTest, false)}><i className="fa fa-check checkAdd" aria-hidden="true"></i></button>
        </div>
      )
    } else if(test.total > 0 && !addInLineTest && !hideFinishedTest) {
      // TEST ONE DATA
      return (
        // <div className={"dataButtonsAndBars col-lg-12 col-md-12 col-sm-12 col-xs-12" + (student.isSafeToDelete) ? "deleteHighlight" : ""} onMouseOver={() => this.changeState(redHover, true)} onMouseLeave={() => this.changeState(redHover, false)}>
        <div className="dataButtonsAndBars col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="safeDeleteHighlight" onMouseOver={() => this.changeState(redHover, true)} onMouseLeave={() => this.changeState(redHover, false)}>
          <div className="testTimeData">
{/* test hide */}
            <div className={"hideTest col-lg-1 col-md-1 col-sm-1 col-xs-1" + (redHover && test.isOver) ? "hidden" : ""}>
              <button><i className="fa fa-minus" aria-hidden="true" onClick={() => this.changeState(hideFinishedTest, true)}></i></button>
            </div>
            <div className="testTimeCell marginLeft marginRight col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <p className="dataPointLabel col-lg-5 col-md-5 col-sm-5 col-xs-12">
                started:
              </p>
              <p className="dataPoint col-lg-7 col-md-7 col-sm-7 col-xs-12">
                {this.startTime(test)}
              </p>
            </div>
            <div className= "testTimeCell marginLeft marginRight col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <p className="dataPointLabel col-lg-5 col-md-5 col-sm-5 col-xs-12">
                paused:
              </p>
              <p className="dataPoint col-lg-6 col-md-6 col-sm-6 col-xs-6">
                {parseTime(test.pausedTotal).hourMinSec}
              </p>
            </div>
            <div className="testTimeCell marginLeft marginRight col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <p className="dataPointLabel col-lg-5 col-md-5 col-sm-5 col-xs-12">
                std. end:
              </p>
              <p className="dataPoint col-lg-7 col-md-7 col-sm-7 col-xs-12">
                {this.endTime(key, test, "standard")}
              </p>
            </div>
            <div className="testTimeCell marginLeft marginRight col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <p className="dataPointLabel col-lg-5 col-md-5 col-sm-5 col-xs-12">
                ext. end:
              </p>
              <p className="dataPoint col-lg-6 col-md-6 col-sm-6 col-xs-6">
                {this.endTime(key, test, "extended")}
              </p>
            </div>
          </div>
{/* TEST ONE NAME */}
          <div className="buttonsAndBars">
            <div className="testNameCell marginRight marginLeft">
              <div className={"buttonContainer col-lg-12 col-md-12 col-sm-12 col-xs-12" + (!test.hasTimerStarted && !test.isOver) ? "" : "hidden"}>
                <button className="countBtn" onClick={() => this.startTimer(key, test)}>
                  <p className="countBtnText">
                    start {test.name} test
                  </p>
                </button>
              </div>
              <div className={"buttonContainer col-lg-12 col-md-12 col-sm-12 col-xs-12" + (test.isOver && test.total > 0) ? "" : "hidden"}>
                <button className="redBtn">
                  <p className="countBtnText">
                    {test.name} test is over
                  </p>
                </button>
              </div>
              <div className={"buttonContainer col-lg-12 col-md-12 col-sm-12 col-xs-12" + (test.hasTimerStarted && !test.isTimerPaused && !test.isOver) ? "" : "hidden"}>
                <button className="pauseBtn" onClick={() => this.pauseTimer(student, test)}>
                  <p className="pauseBtnText">
                    pause {test.name} test
                  </p>
                </button>
              </div>
              <div className={"buttonContainer col-lg-12 col-md-12 col-sm-12 col-xs-12" + (test.hasTimerStarted && test.isTimerPaused && !test.isOver) ? "" : "hidden"}>
                <button className="resumeBtn col-lg-4 col-md-4 col-sm-4 col-xs-4" onClick={() => this.resumeTimer(student, test)}>
                  <p className="resumeBtnText">
                    resume
                  </p>
                </button>
                <button className="resetBtn col-lg-4 col-md-4 col-sm-4 col-xs-4" onClick={() => this.resetTimer(student, test)}>
                  <p className="resetBtnText">
                    reset
                  </p>
                </button>
                <button className="endBtn col-lg-4 col-md-4 col-sm-4 col-xs-4" onClick={() => this.endTimer(student, test)}>
                  <p className="endBtnText">
                    end
                  </p>
                </button>
              </div>
            </div>
{/* BEGIN TEST ONE BARS */}
            <div className="bars col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="progress fullBar">
                <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style={this.fullBarStyle(key, test)}>
                  <p className="barLabel">
                    {/* {timer(key, test).countdown} */}
                    {this.state.countdown}
                  </p>
                </div>
              </div>
              <div className="progress splitBar"> {/* Begin Bars */}
                <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style={this.standardBarStyle(key, test)}>
                  <p className={"barLabel" + (this.timer(key, test).countdown - this.testTime(key, test, "extended") > 0) ? "" : "hidden"}>
                    {this.testTime(key, test, "extended")}
                  </p>
                  <p className={"barLabel" + (this.timer(key, test).countdown - this.testTime(key, test, "extended") <= 0) ? "" : "hidden"}>
                    {/* {timer(key, test).countdown} */}
                    {this.state.countdown}
                  </p>
                </div>
                <div className={"progress-bar progress-bar-success" + (this.timer(key, test).countdown - this.testTime(key, test, "extended") > 0) ? "" : "hidden"} role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style={this.extendBarStyle(key, test)}>
                  <p className="barLabel">
                    {/* {timer(key, test).countdown - this.testTime(key, "testOneExtBar")} */}
                    {this.state.countdown - this.testTime(key, test, "extendedBar")}
                  </p>
                </div>
                <div className={"progress-bar progress-bar-success" + (this.timer(key, test).countdown - this.testTime(key, test, "extended") <= 0) ? "" : "hidden"} role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style={this.extendZeroBarStyle()}>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    const { student, index, key } = this.props;
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
              <input type="checkbox" className="checkbox" checked={student.isSafeToDelete} onChange={(e) => this.handleChange(e, key)}/>
              <div className="indexAndNameCell">
                <p className="indexAndName">
                  {student.order + 1}. {student.name} ({student.extendTime})
                </p>
  {/*delete*/}
                <button onClick={() => this.props.removeStudent}>
                  <i className={"fa fa-times deleteBtn" + (student.isSafeToDelete) ? "" : "hidden"}></i>
                </button>
              </div>
            </div>
          </div>
  {/* END STUDENT DISPLAY */}

  {/* BEGIN A TEST */}
  {/* Plus button */}
          {this.renderFormButton(student.tests.Atest.total, this.state.addInlineAtest)}
  {/* INLINE FORM OR A TEST DATA */}
          {this.renderFormOrData(key, student.tests.Atest, this.state.addInlineAtest, this.state.hideFinishedAtest, this.state.redHoverA)}
  {/* END A TEST */}

  {/* BEGIN A TEST */}
  {/* Plus button */}
          {this.renderFormButton(student.tests.Btest.total, this.state.addInlineBtest)}
  {/* INLINE FORM OR A TEST DATA */}
          {this.renderFormOrData(key, student.tests.Btest, this.state.addInlineBtest, this.state.hideFinishedBtest, this.state.redHoverB)}
  {/* END A TEST */}

  {/* BEGIN A TEST */}
  {/* Plus button */}
          {this.renderFormButton(student.tests.Ctest.total, this.state.addInlineCtest)}
  {/* INLINE FORM OR A TEST DATA */}
          {this.renderFormOrData(key, student.tests.Ctest, this.state.addInlineCtest, this.state.hideFinishedCtest, this.state.redHoverC)}
  {/* END A TEST */}

  {/* BEGIN A TEST */}
  {/* Plus button */}
          {this.renderFormButton(student.tests.Dtest.total, this.state.addInlineDtest)}
  {/* INLINE FORM OR A TEST DATA */}
          {this.renderFormOrData(key, student.tests.Dtest, this.state.addInlineDtest, this.state.hideFinishedDtest, this.state.redHoverD)}
  {/* END A TEST */}


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
