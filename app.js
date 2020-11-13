//모듈
const express = require("express");
const app = express();
const bodyParser = require("express");
const indexRouter = require("./routes/index");
const compression = require("compression");
//passport를 사용하기 위한 모듈
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

//-----------------------------------------------미들웨어-------------------------------------------------------
// 정적파일 기본폴더 선언
app.use(express.static("./public"));
// json데이터로 받기
app.use(bodyParser.json());
// post방식으로 들어온 데이터를 변환
app.use(bodyParser.urlencoded({extended : true}));
// ejs view엔진
app.set("view engine", 'ejs');
// 압축
app.use(compression());

//-----------------------------------------------passport--------------------------------------------------
// 세션 설정
app.use(session({
    secret : "asldkjfjl@asd!SA",
    resave : false,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//-----------------------------------------------------------------------------------------------------------


// 라우트 모듈
app.use("/", indexRouter);

app.listen(3000, ()=>{
    console.log("start!! express server on port 3000");
});

