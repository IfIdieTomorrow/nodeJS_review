const express = require("express");
const router = express.Router();
const path = require("path")
const mainRouter = require("./main/main");
const emailRouter = require("./email/email");
const joinRouter = require("./join/join");
const loginRoutre = require("./login/login");
const logoutRouter = require("./logout/logout");
const movieRouter = require("./movie/movie");
const db = require("../lib/db");

db.connect();

router.use("/main", mainRouter);
router.use("/email" , emailRouter);
router.use("/join", joinRouter);
router.use("/login", loginRoutre);
router.use("/logout", logoutRouter);
router.use("/movie" ,movieRouter);

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname , "../public/main.html"));
});

module.exports = router;