const expect = require('chai').expect;

const { syncAndSeed } = require('../server/db');
const School = require('../server/db/School')
const Student = require('../server/db/Student')





describe('DATA LAYER | acme schools suite of tests', () => {

  beforeEach(() => {
    return syncAndSeed({ force: true });
  })

  describe('schools', () => {

    it('there are three (3) schools', () => {
      return School.findAll()
        .then(schools => expect(schools.length).to.equal(3))
    })

    it('the school Baruch College exists', () => {
      return School.findOne({
        where: {
          name: 'Baruch College'
        }
      })
        .then(school => expect(school.name).to.equal('Baruch College'))
    })

    it('the school Nassau Community College does not exist', () => {
      return School.findOne({
        where: {
          name: 'Nassau Community College'
        }
      })
        .then(school => expect(school).to.equal(null))
    })

    it('a school can be updated', () => {
      return School.findOne({
        where: {
          name: 'Harvard University'
        }
      })
        .then(school => school.update({ name: 'Harvard Law School' }))
        .then(school => expect(school.name).to.equal('Harvard Law School'))
    })

    it('a school can be deleted', () => {
      return School.create({
        name: 'Nassau Community College',
        description: 'community college',
        street: '1500 Old Country Rd',
        city: 'Westbury',
        state: 'NY',
        zip: '11764'
      })
        .then(() => {
          return School.destroy({
            where: {
              name: 'Nassau Community College'
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

    it('there are five (5) students', () => {
      return Student.findAll()
        .then(students => expect(students.length).to.equal(5))
    })

    it('the student George Washington exists', () => {
      return Student.findOne({
        where: {
          lastName: 'Washington'
        }
      })
        .then(student => expect(student.lastName).to.equal('Washington'))
    })

    it('the student Abraham Lincoln does not exist', () => {
      return Student.findOne({
        where: {
          firstName: 'Abraham'
        }
      })
        .then(student => expect(student).to.equal(null))
    })

    it('a student can be updated', () => {
      return Student.findOne({
        where: {
          lastName: 'Washington'
        }
      })
        .then(student => student.update({ firstName: 'Geordi' }))
        .then(student => expect(student.firstName).to.equal('Geordi'))
    })

    it('a student can be deleted', () => {
      return Student.create({
        firstName: 'John',
        lastName: 'Polk',
        gpa: 3.5
      })
        .then(() => {
          return Student.destroy({
            where: {
              lastName: 'Polk'
            }
          })
        })
        .then(() => {
          return Student.findAll()
            .then(students => expect(students.length).to.equal(5))
        })
    })

    it('a student can be enrolled in a school', () => {
      return Student.findOne({
        where: {
          lastName: 'Franklin'
        }
      })
      .then(franklin => franklin.setSchool(1))
      .then(franklin => expect(franklin.schoolId).to.equal(1))
    })

    it('a student can be disenrolled from a school', () => {
      return School.findOne({
        where: {
          name: 'Baruch College'
        }
      })
      .then(school => school.removeStudent(1))
      .then(() => {
        return Student.findOne({
          where: {
            lastName: 'Franklin'
          }
        })
      })
      .then(franklin => expect(franklin.schoolId).to.equal(null))
    })

  })

})
