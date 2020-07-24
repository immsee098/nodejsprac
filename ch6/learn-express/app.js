var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//custom
app.use(function (req, res, next) {
  console.log(req.url, '미들웨어 부분입니다');
  next();
}, function (req, res, next) {
  console.log('두 번째 미들웨어');
  next();
}, function (req, res, next) {
  console.log('세 번째 미들웨어');
  next();
})

app.use(logger('dev'));

//지정해둔 폴더의(이 경우는 'public')정적인 파일들 제공->isReadFile로 따로 처리 안해줘도됨
//쓸데없는 미들웨어 호출 방지를 위해 로그 미들웨어 바로 아래 위치시킴(수정 필요~>쿠키 기록 등 영향 갈수도 있으니 적절히 수정)
app.use(express.static(path.join(__dirname, 'public')));

//body-parser 부분 express() 자체에 내장되게됨
//이부분이 기존 req.on('data')와 req.on('end')를 대신해서 req.body에 추가해줌
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//쿠키와 세션
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret code',
  //세션 관리 시 클라이언트에 쿠키 전송(=세션 쿠키)
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

//일회성 메시지 브라우저에 표기(새로고침하면 안 보이는 메시지)
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 위의 라우터 요청들을 전부 처리하지 못했을 때 떨어지는 부분
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
