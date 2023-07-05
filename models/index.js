const Sequelize= require("sequelize");


const sequelize = new Sequelize("pluralcode_database", "pluralcode_admin", "Saintseverus911@", {
    host: "pluralcode.academy",
    dialect: "mysql",
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  
  const db = {};
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.enrollment = require("./enrollment.model.js")(sequelize, Sequelize);
//   db.student = require("./student.model.js")(sequelize, Sequelize);
  db.course = require("./course.model.js")(sequelize, Sequelize);
  db.admin = require("./superadmin.model.js")(sequelize, Sequelize);
  module.exports = db;