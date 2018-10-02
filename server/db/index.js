const conn = require('./conn');
const School = require('./School');
const Student = require('./Student');


// associations
Student.belongsTo(School);
School.hasMany(Student);

// sync and seed
const syncAndSeed = () => {

  conn.sync({ force: true } )
    .then(() => {
      return Promise.all([
        School.create({
          name: 'Baruch College',
          description: 'business school',
          street: '55 Lexington Ave.',
          city: 'New York',
          state: 'NY',
          zip: '10010'
        }),
        School.create({
          name: 'Harvard University',
          description: 'law school',
          street: 'Smith Campus Center',
          city: 'Cambridge',
          state: 'MA',
          zip: '01231'
        }),
        School.create({
          name: 'MIT',
          description: 'engineering school',
          street: '77 Massachusetts Ave.',
          city: 'Cambridge',
          state: 'MA',
          zip: '02132'
        })
      ])
    })
    .then(([baruch, harvard, mit]) => {
      Promise.all([
        Student.create({
          firstName: 'George',
          lastName: 'Washington',
          gpa: 3.5,
          schoolId: baruch.id
        }),
        Student.create({
          firstName: 'John',
          lastName: 'Adams',
          gpa: 3.2,
          schoolId: harvard.id
        }),
        Student.create({
          firstName: 'Thomas',
          lastName: 'Jefferson',
          gpa: 3.9,
          schoolId: mit.id
        }),
        Student.create({
          firstName: 'Benjamin',
          lastName: 'Franklin',
          gpa: 4.0
        }),
        Student.create({
          firstName: 'James',
          lastName: 'Madison',
          gpa: 4.0,
          schoolId: mit.id
        }),
      ])
    })
    .catch(error => console.log(error));

}

module.exports = {
  syncAndSeed,
  models: {
    School,
    Student
  }
}
