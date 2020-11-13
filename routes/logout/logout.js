const express = require("express");
const router = express.Router();

router.get("/",(request, response)=>{
    request.logOut();
    response.redirect("/");
});

module.exports = router;