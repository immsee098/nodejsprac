const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const pageRouter = require('./routes/page');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001); //일반 express init시 이 부분은 bin/www에 포함되어 나중에 app에 set된다

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(flash());
app.use('/', pageRouter);
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