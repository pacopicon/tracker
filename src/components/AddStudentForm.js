import React from 'react';
import PropTypes from 'prop-types';


class AddStudentForm extends React.Component {
  createStudent(event) {
    event.preventDefault();
    console.log('Gonna make some student!')
    const student = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }
    this.props.addStudent(student);
    this.studentForm.reset();
  }

  render() {
    return(
      <form ref={(input) => this.studentForm = input} className="fish-edit" onSubmit={(e) => this.createStudent(e)}>
        {/* a comment in here */}
        <input ref={(input) => this.name = input} type="text" placeholder="Student name" />
        <input ref={(input) => this.price = input} type="text" placeholder="Student price" />
        <select ref={(input) => this.status = input}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(input) => this.desc = input} type="text" placeholder="Student desc"></textarea>
        <input ref={(input) => this.image = input} type="text" placeholder="Student Image" />
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

AddStudentForm.propTypes = {
  addStudent: PropTypes.func.isRequired
}

export default AddStudentForm;
