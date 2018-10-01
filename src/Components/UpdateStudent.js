import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteStudent, updateStudent } from '../reducers/students';

import { formFocus } from '../utils';


class UpdateStudent extends Component {

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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    const { onUpdateStudent } = this.props;
   
    event.preventDefault();
    onUpdateStudent(this.state)
  }

  componentDidMount() {
    const { student } = this.props;
    this.setState(student);

    // form focus
    const fields = [ 'field1', 'field2', 'field3' ];
    formFocus(fields);
  }

  componentDidUpdate(prevProps) {
    const { student } = this.props;

    if(prevProps !== this.props) {
      this.setState(student)
    }
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { firstName, lastName, schoolId, gpa } = this.state;
    const { student, schools, onDeleteStudent } = this.props;

    return (
      <div className="update-student-grid-container">

        <div className="create-student-grid-item-1">
          <h2 className="sub-title-update">{firstName} {lastName}</h2>
        </div>

        <br />
        <br />

        <form className="create-school-grid-item-2" onSubmit={handleSubmit}>

            <label>First Name:<span className="required-field"> * required</span></label>
            <br />
            <input id="field1" className="input-field" name="firstName" type="text" value={firstName} onChange={handleChange} required />
            <br />
            <br />

            <label>Last Name:<span className="required-field"> * required</span></label>
            <br />
            <input id="field2" className="input-field" name="lastName" type="text" value={lastName} onChange={handleChange} required />
            <br />
            <br />

            <label>GPA: </label>
            <br />
            <input id="field3" className="input-field-gpa" name="gpa" type="number" step="0.10" min="0.0" max="4.0" value={gpa} onChange={handleChange} />
            <br />
            <br />

            <label>School: </label>
            <br />
            <select className="input-field-school" value={schoolId ? schoolId : ''} name="schoolId" onChange={handleChange} >
              <option value="">(select your school)</option>
              {
                schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
              }
            </select>

            <br />
            <br />

            <button className="create-form-btn" type="submit">Save</button>
            {/* <button className="create-form-btn" onClick={(event) => handleSubmit(event)}>Save</button> */}
            <button className="delete-form-btn" type="button" onClick={() => onDeleteStudent(student)}>Delete</button>

        </form>


      </div>
    )
  }


}

const mapStateToProps = ( { students, schools }, { match }) => {
  const id = +match.params.id;

  return {
    student: students.find(student => student.id === id),
    schools
  }
}

const mapDispatchToProps = (dispatch, { history }) => {

  return {
    onDeleteStudent: (student) => {
      dispatch(deleteStudent(student))
        .then(() => history.push('/students'))
        .catch(error => console.log(error))
    },

    onUpdateStudent: (student) => {
      if(student.schoolId === ''){
        student.schoolId = null
      }
      dispatch(updateStudent(student))
        .then(() => history.push('/students'))
        .catch(error => console.log(error))
    }
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);
