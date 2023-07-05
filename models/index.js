const Sequelize= require("sequelize");


const sequelize = new Sequelize("pluralcode_database", "pluralcode_admin", "Saintseverus911@", {
    host: "pluralcode.academy",
    port:3306,
    dialect: "mysql",
   
  });
  
  const db = {};
  
  db.Sequelize = Sequelize;

  db.sequelize = sequelize;
  
  db.enrollment = require("./enrollment.model.js")(sequelize, Sequelize);
//   db.student = require("./student.model.js")(sequelize, Sequelize);
  db.course = require("./course.model.js")(sequelize, Sequelize);
  db.admin = require("./superadmin.model.js")(sequelize, Sequelize);
  module.exports = db;