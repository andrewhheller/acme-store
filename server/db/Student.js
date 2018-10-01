const conn = require('./conn');

const Student = conn.define('student', {
  
  firstName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  lastName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  gpa: {
    type: conn.Sequelize.DECIMAL(10, 1),
    validate: {
      isNumeric: true,
      min: 0,
      max: 4
    }
  }

})

// transform first and last name into Capital Case
Student.beforeValidate(student => {
  student.firstName = student.firstName[0].toUpperCase() + student.firstName.slice(1);
  student.lastName = student.lastName[0].toUpperCase() + student.lastName.slice(1);
})



module.exports = Student;
