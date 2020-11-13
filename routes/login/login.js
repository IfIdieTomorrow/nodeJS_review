const express = require("express");
const router = express.Router();
const db = require("../../lib/db");
const path = require("path");
const passport = require("passport");
const { json } = require("body-parser");
const LocalStrategy = require("passport-local").Strategy;

router.get("/", (request, response)=>{
    let msg;
    let errMsg = request.flash('error');
    if(errMsg !== undefined){
        msg = errMsg;
    }
    console.log(typeof msg);
    response.render("login.ejs", {message : msg});
});


//----------------------------------------------------------passport를 사용한 로그인 --------------------------------
passport.serializeUser(function(user, done) {
    done(null, user.email);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'pw',
        passReqToCallback : true
    },
    function(request, email, password, done){
        db.query("SELECT * FROM user WHERE email = ?",[email],(err, result)=>{
            if(err) throw err;
            if(result.length == 0){
                console.log("existed user");
                return done(null, false, {'message' : "Not found Email !!"});
            } else {
                if(result[0].pw == password){
                    return done(null, {email :email, name: result[0].name});
                } else {
                    return done(null, false, {message : "Not equal Password !!"})
                }
            }
        });
    }
));

// json데이터를 주기위한 Custom CallBack
// ajax로 비동기 처리
router.post("/", function(request, response, next){
    passport.authenticate('local-login', function(err, user, info){
        if(err) response.status(500).json(err);
        if(!user) return response.status(401).json(info.message);
        request.logIn(user, function(err2){
            if(err2) return next(err2);
            return response.json(user);
        });
    })(request, response, next);
});
//------------------------------------------------------------------------------------------------------------------

module.exports = router;