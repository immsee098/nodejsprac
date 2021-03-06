const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();

const pageRouter = require('./routes/page');
const authRounter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');
const passportConfig = require('./passport'); // require('./passport/index.js')와 같음

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001); //일반 express init시 이 부분은 bin/www에 포함되어 나중에 app에 set된다

if(process.env.NODE_DEV==='production'){
    app.use(morgan('combined'))
} else {
    app.use(morgan('dev'));
}

//static을 두 개 쓸 수도 있다는 것
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
};

if(process.env.NODE_ENV === 'production') {
    sessionOption.proxy =true;
    //배포 환경 시 쿠키 시큐어 적용 -> https 사용 시 or 로드밸런싱 위해 nginx같은 거 썼을 때는 꼭 적용 필요
    //sessionOption.cookie.secure=true;
}

app.use(session(sessionOption));

// // 위의 sessionOption 부분이 이 부분을 대신함. 설정 후 세션에 설정
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//     },
// }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRounter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next)=>{
    const err = new Error('NOT FOUND');
    err.status = 404;
    next(err);
});
//각종 시크릿 키 등은 .env 파일 안에다 모아둬야함
app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error=req.app.get('env')==='development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중');
});