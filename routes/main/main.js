const express = require("express");
const router = express.Router();

//main page 는 login이 될 때만 접근 가능
router.get("/", (req, res)=>{
    if(req.user == undefined){
        res.render("login.ejs");
    } else {
        res.render("main.ejs", {email : req.user});
    }
    // res.sendFile(path.join(__dirname, "../../public/main.html"));
});

module.exports = router;