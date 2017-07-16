import React from 'react';
import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';

class Student extends React.Component {
  constructor() {
    super();
    // this.renderUserPage = this.renderUserPage.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  // renderUserPage(key) {
  //   const student = this.props.students[key];
  //   return (
  //     <div key={key} className="student-edit">
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
    const { details, index } = this.props;
    // e.g. const details = this.props.details;
    // e.g. const index = this.props.index;

    // const isAvailable = details.status === 'available';
    // const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';
    return(
      <div className="student col-lg-12 col-md-12 col-sm-12 col-xs-12">
{/* STUDENT: checkbox, name, extend-time*/}
        <div className="checkboxIndexName marginRight marginLeft col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <input type="checkbox" className="checkbox" value=""/>
          {/* ng-model="student.isSafeToDelete" ng-change="saveAndToggleInvert(student)" */}
          <div className="indexAndNameCell">
            <p className="indexAndName">
              {details.order + 1}. {details.name} ({details.extendTime})
            </p>
{/*delete*/}
            <button onClick={() => this.props.removeStudent}>
              <i className="fa fa-times deleteBtn" ></i>
              {/* ng-show="student.isSafeToDelete" */}
            </button>
          </div>
        </div>
      </div>

    )

  }
}

Student.propTypes = {
  details: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  // addToOrder: PropTypes.func.isRequired
}


export default Student;
