import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({ students, schools }) => {

  // finds name of school for each student via student.schoolId
  const getSchoolName = id => schools.find(school => school.id == id).name

  return (

    <div>
    
      <div className="student-grid-container">

        <div className="student-grid-item-1">
          <h2 className="sub-title-students">All Students</h2>
        </div>
        
        <div className="student-grid-item-2">
          <Link to="/students/create">
            <button className="create-btn">Create Student</button>
          </Link>
        </div>

      </div>

      <br />
      <br />
     
      <table className="student-table">
        <tbody>
          <tr className="table-heading">
            <th className="name-heading">Student</th>
            <th>School</th>
          </tr>
          <tr>
            <td className="blank-row"></td>
          </tr>

          { 
            students.map(student => {
              return (
                student.schoolId
                  ? 
                    <tr key={student.id}>
                      <td className="student-cell">
                        <Link to={`/students/${student.id}`}>
                          {student.firstName} {student.lastName}
                        </Link>
                      </td>
                      <td className="school-cell">
                        <Link to={`/schools/${student.schoolId}`}>
                          { getSchoolName(student.schoolId) }
                        </Link>
                      </td>
                    </tr>
                  :
                    <tr key={student.id}>
                      <td>
                        <Link to={`/students/${student.id}`}>
                          {student.firstName} {student.lastName}
                        </Link>
                      </td>
                      <td>
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

const mapStateToProps = ({ schools, students }) => {

  return {
    schools,
    students
  }
}





export default connect(mapStateToProps)(Students);
