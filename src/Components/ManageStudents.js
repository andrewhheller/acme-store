import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateStudent } from '../reducers/students';

import EnrolledStudents from './EnrolledStudents';
import CreateStudentWithSchool from './CreateStudentWithSchool';



class ManageStudents extends Component {

  constructor() {
    super();
    this.state = {
      studentId: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    const { onUpdateStudent, students, schoolId } = this.props;
    const studentId = +this.state.studentId; // type coerce for === match

    event.preventDefault()
    onUpdateStudent(students, studentId, schoolId)
      .catch(error => console.log(error));
  }
 
  render() {
    const { handleChange, handleSubmit } = this;
    const { students, schoolId, schoolName } = this.props;

    return (
      <div>

        <div className="update-school-sub-title">
          <h3>Manage Students</h3>
        </div>

        <br />

        <EnrolledStudents schoolId={schoolId} schoolName={schoolName} />

        <div className="enrolled-students-area">

           <form onSubmit={handleSubmit}>

             <h3 className="enrolled-students-subtitle">
                Enroll Student
                <br />
                <span className="enrolled-school-name"> in {schoolName}</span>
              </h3>

             <select className="enroll-student-list" name="studentId" onChange={handleChange}>
               <option value="">(select student)</option>
               {
                students.map(student => <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>)
                }
            </select>

            <button className="enroll-student-btn" type="submit">+</button>
          </form>

        </div>

        <CreateStudentWithSchool schoolId={schoolId} schoolName={schoolName} />

    </div>

    )
  }

}

const mapStateToProps = ({ students }) => {
 
  return {
    students
  }
}

const mapDispatchToProps = (dispatch) => {

  return {

    // takes in students array, studentId (selected from drop down from state) and schoolId (from Parent Component prop)
    // finds student to update from student array
    // modifies schoolId with selected school from drop down
    // invokes thunk to update student in DB and store
    onUpdateStudent: (students, studentId, schoolId) => {
      const student = students.find(student => student.id === studentId);
      student.schoolId = schoolId
      return dispatch(updateStudent(student))
    }
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ManageStudents);
