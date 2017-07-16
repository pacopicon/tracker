import React from 'react';
import AddStudentForm from './AddStudentForm';
import PropTypes from 'prop-types';
import rebase from '../base';
import firebase from 'firebase';
import Student from './Student';
import App from './App';


class UserPage extends React.Component {

  constructor() {
    super();
    // this.renderUserPage = this.renderUserPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    rebase.app.auth().signOut().then(() => {
      console.log("should have been logged out");
    });
    this.setState({ uid: null });
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

  // renderUserPage(key) {
  //   const student = this.props.students[key];
  //   return (
  //     <div key={key} className="student-edit">
  //       shitskies!
  //       <input type="text" name="name" value={student.name} placeholder="Student Name" onChange={(e) => this.handleChange(e, key)} />
  //       <input type="text" name="price" value={student.price} placeholder="Student Price" onChange={(e) => this.handleChange(e, key)} />
  //       <select type="text" name="status" value={student.status} placeholder="Student Status" onChange={(e) => this.handleChange(e, key)} >
  //         <option value="available">Fresh!</option>
  //         <option value="unavailable">Sold Out!</option>
  //       </select>
  //       <textarea type="text" name="desc" value={student.desc} placeholder="Student Desc" onChange={(e) => this.handleChange(e, key)} ></textarea>
  //       <input type="text" name="image"  value={student.image} placeholder="Student Image" onChange={(e) => this.handleChange(e, key)} />
  //       <button onClick={ () => this.props.removeStudent(key)}>Remove Student</button>
  //     </div>
  //   )
  // }

  render() {
    // the long way: const logout = <button onClick={ () => this.logout()}>Log Out!</button>;

    // check if they are not logged in at all
    const logout = <button onClick={this.logout}>Log Out!</button>;
    return(
      <div>
        <h2>UserPage</h2>
        {logout}
        {/* {
          Object
            .keys(this.props.students)
            .map(this.renderUserPage)
        } */}
        <AddStudentForm
            addStudent={this.props.addStudent}
            students={this.props.students}
        />
        {/* <button onClick={this.props.loadSamples}>Load Sample Studentes</button> */}
      </div>
    )
  }
}

UserPage.propTypes = {
  students: PropTypes.object.isRequired,
  updateStudent: PropTypes.func,
  removeStudent: PropTypes.func,
  addStudent: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
};

export default UserPage;
