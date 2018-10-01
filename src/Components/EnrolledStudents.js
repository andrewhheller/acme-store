import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateStudent } from '../reducers/students';

const EnrolledStudents = ({ enrolledStudents, onRemoveStudent, schoolName }) => {

  return (
    <div className="enrolled-students-area">

      <h3 className="enrolled-students-subtitle">
        Enrolled Students
        <br /><span className="enrolled-school-name"> in {schoolName}</span>
      </h3>

      <table className="enroll-table">
      <tbody>
        {
          enrolledStudents.map(student => {
            return (
              <tr key={student.id}>
                <td className="enrolled-student">
                  <Link to={`/students/${student.id}`}>
                      {student.firstName} {student.lastName}
                  </Link>
                </td>
                <td>
                  <button className="unenroll-student-btn" onClick={() => onRemoveStudent(student)}>x</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </table>

    </div>   
  )

}

const mapStateToProps = ({ students }, { schoolId }) => {

  return {
    enrolledStudents: students.filter(student => student.schoolId == schoolId)
  }

}

const mapDispatchToProps = dispatch => {

  return {
    onRemoveStudent: (student) => {
      student.schoolId = null
      dispatch(updateStudent(student))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EnrolledStudents);
