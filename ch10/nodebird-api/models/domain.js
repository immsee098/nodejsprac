module.exports=(sequelize, DataTypes) => (
    sequelize.define('domain', {
        host: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        clientSecret: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
    }, {
        //데이터 추가 검증 속성
        validate: {
            unKnownType(){
                console.log(this.type, this.type !== 'free', this.type !== 'premium');
                if(this.type !=='free' && this.type !=='premium') {
                    throw new Error('type 컬럼은 free나 Premium이어야 합니다');
                }
            },
        },
        timestamps:true,
        paranoid: true,
    })
);