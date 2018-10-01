const conn = require('./conn');

const School = conn.define('school', {

  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: conn.Sequelize.TEXT
  },

  street: {
    type: conn.Sequelize.STRING,
    alowNull: false,
    validate: {
      notEmpty: true
    }
  },

  city: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  state: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  zip: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }

})



module.exports = School;
