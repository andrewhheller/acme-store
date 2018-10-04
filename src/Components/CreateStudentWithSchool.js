import React from 'react';
import { Link } from 'react-router-dom';

const CreateStudentWithSchool = ({ schoolId, schoolName }) => {

  return (

    <div className="enroll-school-grid-item-4 enrolled-students-area">

    <h3 className="enrolled-students-subtitle">
      Create New Student
      <br />
      <span className="enrolled-school-name"> in {schoolName}</span>
    </h3>

      <Link to={`/students/create/${schoolId}`}>
          <button className="create-btn">Create Student</button>
      </Link>
    </div>
  )

}

export default CreateStudentWithSchool;
