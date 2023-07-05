module.exports = (sequelize, Sequelize)=>{
      const Course = sequelize.define("courses",{
        name: {
            type: Sequelize.STRING
          },
        course_fee: {
            type: Sequelize.STRING
          },
        part_payment: {
            type: Sequelize.INTEGER
          },
        percentages: {
            type: Sequelize.STRING
          },
        link: {
            type: Sequelize.STRING
          },
        status: {
            type: Sequelize.STRING
          },
        school: {
            type: Sequelize.STRING
          },
        community_link: {
            type: Sequelize.STRING
          },
         duration: {
            type: Sequelize.STRING
          },
          course_email: {
            type: Sequelize.STRING
          },
          advisor_contact_detail: {
            type: Sequelize.STRING
          },
          advisor_name: {
            type: Sequelize.STRING
          },
          course_type: {
            type: Sequelize.STRING
          },
          format: {
            type: Sequelize.STRING
          },
          curriculum: {
            type: Sequelize.STRING
          },
          referral_code: {
            type: Sequelize.STRING
          }
      })

      return Course;
}