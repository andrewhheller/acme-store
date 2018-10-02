const expect = require('chai').expect;

const Sequelize = require('sequelize');
const testConn = new Sequelize('postgres://localhost/acme_schools_test', { logging: false });

const School = testConn.define('school', {

  name: {
    type: testConn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: testConn.Sequelize.TEXT
  },

  street: {
    type: testConn.Sequelize.STRING,
    alowNull: false,
    validate: {
      notEmpty: true
    }
  },

  city: {
    type: testConn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  state: {
    type: testConn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  zip: {
    type: testConn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }

})

const Student = testConn.define('student', {
  
  firstName: {
    type: testConn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  lastName: {
    type: testConn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  gpa: {
    type: testConn.Sequelize.DECIMAL(10, 1),
    validate: {
      isNumeric: true,
      min: 0,
      max: 4
    }
  }

});

Student.belongsTo(School);
School.hasMany(Student);



const syncAndSeed = () => {
  return testConn.sync({ force: true })
    .then(() => {
      return Promise.all([
        School.create({
          name: 'Starfleet Academy',
          description: 'main entrance school',
          street: '100 center street',
          city: 'San Fransisco',
          state: 'CA',
          zip: '90218'
        }),
        School.create({
          name: 'Daystrom Institute',
          description: 'engineering school',
          street: '500 Main Street',
          city: 'Chicago',
          state: 'IL',
          zip: '55113'
        }),
        School.create({
          name: 'Vulcan Science Academy',
          description: 'science school',
          street: '800 Lexington Ave.',
          city: 'New York',
          state: 'NY',
          zip: '10010'
        })
      ])
      .then(([starfleet, daystrom, vulcan]) => {
        return Promise.all([
          Student.create({
            firstName: 'Jean-Luc',
            lastName: 'Picard',
            gpa: '4.0',
            schoolId: starfleet.id
          }),
          Student.create({
            firstName: 'William T.',
            lastName: 'Riker',
            gpa: '3.9',
            schoolId: starfleet.id
          }),
          Student.create({
            firstName: 'Geordi',
            lastName: 'La Forge',
            gpa: '4.0'
          })
        ])
      })
   
    })
}

describe('DATA LAYER | acme schools suite of tests', () => {

  beforeEach(() => {
    return syncAndSeed();
  })

  describe('schools', () => {

    it('there are three (3) schools', () => {
      return School.findAll()
        .then(schools => expect(schools.length).to.equal(3))
    })

    it('the school Starfleet Academy exists', () => {
      return School.findOne({
        where: {
          name: 'Starfleet Academy'
        }
      })
        .then(school => expect(school.name).to.equal('Starfleet Academy'))
    })

    it('the school Klingon Military Academy does not exist', () => {
      return School.findOne({
        where: {
          name: 'Klingon Military Academy'
        }
      })
        .then(school => expect(school).to.equal(null))
    })

    it('a school can be updated', () => {
      return School.findOne({
        where: {
          name: 'Daystrom Institute'
        }
      })
        .then(school => school.update({ name: 'Daystrom Institute of Engineering' }))
        .then(school => expect(school.name).to.equal('Daystrom Institute of Engineering'))
    })

    it('a school can be deleted', () => {
      return School.create({
        name: 'Klingon Military Academy',
        description: 'military school',
        street: '400 battle ave.',
        city: 'Detroit',
        state: 'MI',
        zip: '03021'
      })
        .then(() => {
          return School.destroy({
            where: {
              name: 'Klingon Military Academy'
            }
          })
        })
        .then(() => {
          return School.findAll()
            .then(schools => expect(schools.length).to.equal(3))
        })
    })

  });

  describe('students', () => {

    it('there are three (3) students', () => {
      return Student.findAll()
        // .then(students => console.log(students))
        .then(students => expect(students.length).to.equal(3))
    })

    it('the student Jean-Luc Picard exists', () => {
      return Student.findOne({
        where: {
          lastName: 'Picard'
        }
      })
        .then(student => expect(student.lastName).to.equal('Picard'))
    })

    it('the student Worf does not exist', () => {
      return Student.findOne({
        where: {
          firstName: 'Worf'
        }
      })
        .then(student => expect(student).to.equal(null))
    })

    it('a student can be updated', () => {
      return Student.findOne({
        where: {
          lastName: 'Riker'
        }
      })
        .then(student => student.update({ firstName: 'Thomas' }))
        .then(student => expect(student.firstName).to.equal('Thomas'))
    })

    it('a student can be deleted', () => {
      return Student.create({
        firstName: 'Reginald',
        lastName: 'Barclay',
        gpa: 3.5
      })
        .then(() => {
          return Student.destroy({
            where: {
              lastName: 'Barclay'
            }
          })
        })
        .then(() => {
          return Student.findAll()
            .then(students => expect(students.length).to.equal(3))
        })
    })

    it('a student can be enrolled in a school', () => {
      return Student.findOne({
        where: {
          firstName: 'Geordi'
        }
      })
      .then(geordi => geordi.setSchool(3))
      .then(geordi => expect(geordi.schoolId).to.equal(3))
    })

    it('a student can be disenrolled from a school', () => {
      return School.findOne({
        where: {
          name: 'Daystrom Institute'
        }
      })
      .then(school => school.removeStudent(3))
      .then(() => {
        return Student.findOne({
          where: {
            firstName: 'Geordi'
          }
        })
      })
      .then(geordi => expect(geordi.schoolId).to.equal(null))
    })

  })

})
