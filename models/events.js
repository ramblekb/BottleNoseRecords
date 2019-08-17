module.exports = function (sequelize, DataTypes) {
    var Event = sequelize.define("Event", {

        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        text: DataTypes.STRING

    });
    //  
    //   });
    return Event;
};