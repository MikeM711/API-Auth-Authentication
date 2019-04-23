module.exports = function (sequelize, Sequelize) {
  
    const UserExport = sequelize.define('user', {
   
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
   
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            // All incoming emails will be converted to lowercase, before sent to database
            validate: { 
                isLowercase: true,
            }
        },
   
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
   
        })
   
        // Future: make a widget calculation model that you can save and display on your profile
       
        // UserExport.associate = (models) => {
        //   UserExport.hasMany(models.widgetCalculation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        // }
   
    return UserExport;
   
   }
   