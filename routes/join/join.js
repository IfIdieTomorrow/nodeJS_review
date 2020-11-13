const express = require("express");
const router = express.Router();
const db = require("../../lib/db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

router.get("/", (request, response)=>{
    let msg;
    let errMsg = request.flash('error');
    if(errMsg !== undefined){
        msg = errMsg;
    }
    response.render("join.ejs", {message : msg});
});


//----------------------------------------------------------passport를 사용한 회원가입 --------------------------------
passport.serializeUser(function(user, done) {
    done(null, user.email);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

passport.use('local-join', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'pw',
        passReqToCallback : true
    },
    function(request, email, password, done){
        console.log('local-join callback called');
        db.query("SELECT * FROM user WHERE email = ?",[email],(err, result)=>{
            if(err) throw err;
            if(result.length != 0){
                console.log("existed user");
                return done(null, false, {'message' : "Overlaped Email !!"});
            } else {
                db.query("INSERT INTO user VALUES(?,?,?,NOW())", [email,request.body.name,password], (err2, insert)=>{
                    if(err2) throw err2;
                    console.log("existed")
                    return done(null, {'email':email, name : request.body.name});
                });
            }
        });
    }
));

router.post("/", passport.authenticate("local-join", {
    successRedirect : "/main",
    failureRedirect : "/join",
    failureFlash : true
}));

//------------------------------------------------------------------------------------------------------------------

module.exports = router;