const express = require("express");
const {geturl,getdata} = require("../controller/googlefitcontroller");
const { authMiddleware } = require("../middleware/userMiddleware");
const router = express.Router();

router.get("/geturl", geturl);

router.get("/getdata", getdata);


module.exports = router;