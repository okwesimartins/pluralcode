const enrolment =require("../controllers/enrollment.controller.js");
const enrolRoutes = require("express").Router();

enrolRoutes.get("/course-list", enrolment.courseList);

module.exports = enrolRoutes;

