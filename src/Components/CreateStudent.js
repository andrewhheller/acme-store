import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStudent } from '../reducers/students';

import { formFocus } from '../utils';

const initialState = {
  firstName: '',
  lastName: '',
  gpa: '',
  schoolId: ''
}

class CreateStudent extends Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { schoolId } = this.props;
    this.setState({ schoolId });

    // form focus
    const fields = [ 'field1', 'field2', 'field3' ];
    formFocus(fields);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    const { onCreateStudent, history } = this.props;

    event.preventDefault();
    onCreateStudent(this.state)
      .then(() => this.setState(initialState))
      .then(() => history.push('/students'))
      .catch(error => console.log(error))
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { schools } = this.props;

    return (

      <div className="create-student-grid-container">

        <div className="create-student-grid-item-1">
          <h2 className="sub-title-create">Create Student</h2>
        </div>

        <br />
        <br />

        <form className="create-school-grid-item-2" onSubmit={handleSubmit}>

            <label>First Name:<span className="required-field"> * required</span></label>
            <br />
            <input
              required
              id="field1"
              className="input-field"
              name="firstName"
              type="text" value={firstName}
              onChange={handleChange}
            />
            <br />
            <br />

            <label>Last Name:<span className="required-field"> * required</span></label>
            <br />
            <input
              required
              id="field2"
              className="input-field"
              name="lastName"
              type="text"
              value={lastName}
              onChange={handleChange}
            />
            <br />
            <br />

            <label>GPA:</label>
            <br />
            <input
              id="field3"
              className="input-field-gpa"
              name="gpa"
              type="number"
              // step="0.1"
              min="0.0"
              max="4.0"
              placeholder="0.0"
              value={gpa}
              onChange={handleChange}
            />
            <br />
            <br />

            <label>School:  </label>
            <br />
              <select
                className="input-field-school"
                name="schoolId"
                value={schoolId}
                onChange={handleChange}
              >

                <option value="">(select school)</option>
                {
                  schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
                }      
              </select>

            <br />
            <br />

            <button className="create-form-btn" type="submit">Save</button>

        </form>
      </div>
     
    )
  }

}

const mapStateToProps = ({ schools }, { match }) => {

  // a student can be created with a school id prepulated
  // if included, this id value will come from URL
  // this checks for value before passing id as a prop to Component
  const schoolId = match.params.id ? +match.params.id : '';
  

  return {
    schools,
    schoolId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateStudent: (student) => {
      if(student.schoolId === '') {
        student.schoolId = null
      }
      return dispatch(createStudent(student))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);
