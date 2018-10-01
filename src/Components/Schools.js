import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


const Schools = ({ schools, students }) => {

  // finds total number of students per school
  const getStudentCount = id => students.filter(student => student.schoolId == id).length;

  return (
    <div>

      <div className="school-grid-container">

        <div className="school-grid-item-1">
          <h2 className="sub-title-school">All Schools</h2>
        </div>

        <div className="school-grid-item-2">
          <Link to="/schools/create">
            <button className="create-btn">
              Create School
            </button>
          </Link>
        </div>

      </div>
      
      <br />
      <br />
      
      <table className="school-table">
          <tbody>
            <tr className="table-heading">
              <th className="name-heading">School</th>
              <th>Students</th>
            </tr>
            <tr>
              <td className="blank-row"></td>
            </tr>

            {
              schools.map(school => {
                return (
                  <tr key={ school.id }>
                    
                      <td className="school-name">
                        <Link to={`/schools/${school.id}`}>
                          { school.name }
                        </Link>
                      </td>
                      <td className="student-count">{ getStudentCount(school.id) }</td>
                    
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
  
export default connect(mapStateToProps)(Schools);
