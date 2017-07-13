import React from 'react';
import PropTypes from 'prop-types';
// import '../css/user.min.css';
import TimePicker from 'antd/lib/time-picker';  // for js
import 'antd/lib/time-picker/style/css';        // for css
import moment from 'moment';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';



class AddStudentForm extends React.Component {
  constructor() {
    super();
    this.renderTestForm = this.renderTestForm.bind(this);
  }

  createStudent(event) {
    event.preventDefault();
    console.log('Gonna make some student!')
    const student = {
      name: this.name.value,
      extendTime: this.extendTime.value,
      tests: {
        Atest: {
          name: this.AtestName.value,
          time: this.AtestTime.value || 18000000,
          total: this.AtestTime.value * this.extendTime.value,
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
      <Col className="nameAndTime" lg="6" md="6" sm="12" xs="12">
        <Col className="testNameForm smallWidthMargin" lg="6" md="6" sm="6" xs="6">
          <FormGroup>
            <Input className="form-control testNameInput" ref={(input) => testName = input} type="text" placeholder="test" />
          </FormGroup>
        </Col>
        <Col className="testTimeForm smallWidthMargin" lg="6" md="6" sm="6" xs="6">
          <FormGroup>
            {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} value={moment('student.Atest.time', 'HH:mm')} /> */}
            {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} ref={(input) => this.AtestTime = input} /> */}
            <TimePicker defaultValue={moment('01:00:00', format)} ref={(input) => testTime = moment(input, format)} format={format} />
          </FormGroup>
        </Col>
      </Col>
    )
  }

  render() {
    const format = 'h:mm';
    return(
      <Form ref={(input) => this.studentForm = input} className="" onSubmit={(e) => this.createStudent(e)}>
        <Container>
          <Col className="form-fields marginRight marginLeft" lg="12" md="12" sm="12" xs="12">
            <Col className="nameAndExtend" lg="4" md="4" sm="4" xs="12">
              <Col className="nameForm smallWidthMargin" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Input ref={(input) => this.name = input} type="text" placeholder="student name" />
                </FormGroup>
              </Col>
            </Col>
            <Col className="extendForm smallWidthMargin" lg="6" md="6" sm="6" xs="12">
              {/* <Input type="select" name="select" ref={(input) => this.extendTime = Number(input)}> */}
              {/* <FormGroup>
                <Input type="select" name="select" ref={(input) => this.extendTime = input}>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                </Input>
              </FormGroup> */}
              <select type="select" name="select" ref={(input) => this.extendTime = input}>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
              </select>
            </Col>
{/*BEGIN A test and B test*/}
            <Col className="testOneAndTwo" lg="4" md="4" sm="4" xs="12">
              {/* <div>{this.renderTestForm(this.AtestName, this.AtestTime)}</div> */}
              <Col className="nameAndTime" lg="6" md="6" sm="12" xs="12">
                <Col className="testNameForm smallWidthMargin" lg="6" md="6" sm="6" xs="6">
                  <FormGroup>
                    <Input className="form-control testNameInput" ref={(input) => this.AtestName = input} type="text" placeholder="test" />
                  </FormGroup>
                </Col>
                <Col className="testTimeForm smallWidthMargin" lg="6" md="6" sm="6" xs="6">
                  <FormGroup>
                    {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} value={moment('student.Atest.time', 'HH:mm')} /> */}
                    {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} ref={(input) => this.AtestTime = input} /> */}
                    <TimePicker defaultValue={moment('01:00:00', format)} ref={(input) => this.AtestTime = moment(input, format)} format={format} />
                  </FormGroup>
                </Col>
              </Col>
              {/* <div>{this.renderTestForm(this.BtestName, this.BtestTime)}</div> */}
              <Col className="nameAndTime" lg="6" md="6" sm="12" xs="12">
                <Col className="testNameForm smallWidthMargin" lg="6" md="6" sm="6" xs="6">
                  <FormGroup>
                    <Input className="form-control testNameInput" ref={(input) => this.BtestName = input} type="text" placeholder="test" />
                  </FormGroup>
                </Col>
                <Col className="testTimeForm smallWidthMargin" lg="6" md="6" sm="6" xs="6">
                  <FormGroup>
                    {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} value={moment('student.Btest.time', 'HH:mm')} /> */}
                    {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} ref={(input) => this.BtestTime = input} /> */}
                    <TimePicker defaultValue={moment('01:00:00', format)} ref={(input) => this.BtestTime = moment(input, format)} format={format} />
                  </FormGroup>
                </Col>
              </Col>
            </Col>
{/*END A test and B test*/}
{/*BEGIN C test and D test*/}
            <Col className="testThreeAndFour" lg="4" md="4" sm="4" xs="12">
              {/* <div>{this.renderTestForm(this.CtestName, this.CtestTime)}</div> */}
              <Col className="nameAndTime" lg="6" md="6" sm="12" xs="12">
                <Col className="testNameForm smallWidthMargin" lg="6" md="6" sm="6" xs="6">
                  <FormGroup>
                    <Input className="form-control testNameInput" ref={(input) => this.CtestName = input} type="text" placeholder="test" />
                  </FormGroup>
                </Col>
                <Col className="testTimeForm smallWidthMargin" lg="6" md="6" sm="6" xs="6">
                  <FormGroup>
                    {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} value={moment('student.Ctest.time', 'HH:mm')} /> */}
                    {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} ref={(input) => this.CtestTime = input} /> */}
                    <TimePicker defaultValue={moment('01:00:00', format)} ref={(input) => this.CtestTime = moment(input, format)} format={format} />
                  </FormGroup>
                </Col>
              </Col>
              {/* <div>{this.renderTestForm(this.DtestName, this.DtestTime)}</div> */}
              <Col className="nameAndTime" lg="6" md="6" sm="12" xs="12">
                <Col className="testNameForm smallWidthMargin" lg="6" md="6" sm="6" xs="6">
                  <FormGroup>
                    <Input className="form-control testNameInput" ref={(input) => this.DtestName = input} type="text" placeholder="test" />
                  </FormGroup>
                </Col>
                <Col className="testTimeForm smallWidthMargin" lg="6" md="6" sm="6" xs="6">
                  <FormGroup>
                    {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} value={moment('student.Dtest.time', 'HH:mm')} /> */}
                    {/* <TimePicker defaultValue={moment('13:30:56', 'HH:mm')} ref={(input) => this.DtestTime = input} /> */}
                    <TimePicker defaultValue={moment('01:00:00', format)} ref={(input) => this.DtestTime = moment(input, format)} format={format} />
                  </FormGroup>
                </Col>
              </Col>
            </Col>
{/*END A test and B test*/}
          </Col>
          <Col className="btn-div" lg="12" md="12" sm="12" xs="12">
            <Button type="submit" className="addStudentBtn"></Button>
          </Col>
        </Container>
      </Form>
    )
  }
}

AddStudentForm.propTypes = {
  addStudent: PropTypes.func.isRequired
}

export default AddStudentForm;
