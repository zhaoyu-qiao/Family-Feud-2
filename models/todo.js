// Cited Class Activity: https://harvard.bootcampcontent.com/Harvard-Coding-Boot-Camp/hu-cam-fsf-pt-09-2019-u-c/blob/master/Week_15/01-Activities/09-Sequelize-Update-Delete/Solved/server.js
module.exports = function (sequelize, DataTypes) {
    let Todo = sequelize.define("Todo", {
        // username: {
        //   type: DataTypes.STRING,
        //   unique: true,
        //   allowNull: false,
        // },
        userSuggestion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        complete: {
            type: DataTypes.BOOLEAN,
            // defaultValue is a flag that defaults a new todos complete value to false if
            // it isn't supplied one
            defaultValue: false
        }
    });
    return Todo;
};