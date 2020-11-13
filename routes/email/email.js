const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../../lib/db");

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../../public/form.html"));
})

router.post("/", (req, res)=>{
    //post데이터는 body에 담겨서 온다. 
    console.log(req.body.email);
    res.render("email.ejs", 
        {"email" : req.body.email,
         "name" : "lee"
        }
    );
});

router.post("/ajax", (req, res)=>{
    let email = req.body.email;
    let resData = {};
    db.query("SELECT name FROM user where email=?",[email],(err, result)=>{
        if(err) throw err;
        if(result[0] !== undefined){
            resData.result = "OK";
            resData.name = result[0].name;
        } else {
            resData.result = "FAIL";
        }
        res.json(resData);
    });
});

module.exports = router;
 