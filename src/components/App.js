import React from 'react';
import Header from './Header';
import Order from './Order';
import Landing from './Landing';
import UserPage from './UserPage';
import Student from './Student';
import sampleStudentes from '../sample-students.js';
import rebase from '../base';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';

class App extends React.Component {
  constructor() {
    super();
    this.addStudent = this.addStudent.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    // getinitialState
    this.state = {
      students: {}
    };
  }

  componentWillMount() {
    this.ref = rebase.base.syncState(`users/${this.props.match.params.userID}/students`, {
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
  }

  updateStudent(key, updatedStudent) {
    const students = {...this.state.students};
    students[key] = updatedStudent;
    this.setState({ students });
  }

  removeStudent(key) {
    const students = {...this.state.students};
    students[key] = null;
    this.setState({ students });
  }

  loadSamples() {
    this.setState({
      students: sampleStudentes
    })
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order}
    // update or add the new number of student ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    // this.setState({order: order});
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order}
    delete order[key];
    this.setState({ order })
  }

  render() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header
            age="5000"
            state={this.state}/>
          <ul className="list-of-students">
            {
              Object
                .keys(this.state.students)
                .map(key => <Student key={key} index={key} details={this.state.students[key]} addToOrder={this.addToOrder}/>)

            }
            {/* .keys() extracts the keys from an object and pushes them all into an array.  .map() iterates over this array. */}
          </ul>
        </div>
        {/* <Order
          students={this.state.students} order={this.state.order}
          params={this.props.match.params}
          removeFromOrder={this.removeFromOrder}
        /> */}
        <UserPage
          students={this.state.students}
          addStudent={this.addStudent}
          loadSamples={this.loadSamples}
          updateStudent={this.updateStudent}
          removeStudent={this.removeStudent}
        />
      </div>
    )
  }
}

export default App;
