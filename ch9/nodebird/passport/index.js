const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    //불러온 사용자 정보 객체를 세션에 아이디로 저장(db->세션)
    passport.serializeUser((user, done)=> {
        //세션에 유저 정보 전체를 저장하면 용량 문제 생기니 user.id만 저장하세요 하는 말
        done(null, user.id);
    });

    //세션에 저장한 아이디를 통해 사용자 정보 객체 호출(세션->db)
    passport.deserializeUser((id, done)=> {
        User.findOne({
            where: {id},
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }]
        })

            .then(user=> done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
};
