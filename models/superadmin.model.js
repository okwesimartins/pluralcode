module.exports = (sequelize, Sequelize)=>{
    const Admin = sequelize.define("users",{
        name: {
            type: Sequelize.STRING
          },
        email: {
            type: Sequelize.STRING
          },
        password: {
            type: Sequelize.INTEGER
          },
        exchange_rate: {
            type: Sequelize.STRING
          },
    });

    return Admin
}