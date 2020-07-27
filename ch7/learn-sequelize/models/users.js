module.exports = (sequelize, DataTypes=>{
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        married: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at:{
           type: DataTypes.DATE,
           allowNull:false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false, //컬럼에 로그 남기는 부분 created_at 해서 불필요
    })
})