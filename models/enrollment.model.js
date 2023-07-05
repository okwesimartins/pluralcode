
module.exports =(sequelize, Sequelize)=>{
     const Enroll = sequelize.define("enrollment_table",{
        name: {
            type: Sequelize.STRING
          },
        email: {
            type: Sequelize.STRING
          },
        student_id: {
            type: Sequelize.INTEGER
          },
        mode_of_learning: {
            type: Sequelize.STRING
          },
        course_of_interest: {
            type: Sequelize.STRING
          },
          payment_status: {
            type: Sequelize.STRING
          },
          mode_of_payment: {
            type: Sequelize.STRING
          },
          date: {
            type: Sequelize.STRING
          },
          time: {
            type: Sequelize.STRING
          },
          balance: {
            type: Sequelize.STRING
          },
          certificate: {
            type: Sequelize.STRING
          },
          year: {
            type: Sequelize.STRING
          },
          month: {
            type: Sequelize.STRING
          },
          program_type: {
            type: Sequelize.STRING
          },
          certificate_link: {
            type: Sequelize.STRING
          },
          transcript: {
            type: Sequelize.STRING
          },
          graduation_status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          enrollment_type: {
            type: Sequelize.STRING
          },
          referral_code: {
            type: Sequelize.STRING
          },
          currency: {
            type: Sequelize.STRING
          },
          country: {
            type: Sequelize.STRING
          },
          payment_plan: {
            type: Sequelize.STRING
          },
          amount_paid: {
            type: Sequelize.STRING
          },
          cohort_id:{
            type: Sequelize.STRING
          },
          class_format:{
            type: Sequelize.STRING
          }
     })

     return Enroll;
}