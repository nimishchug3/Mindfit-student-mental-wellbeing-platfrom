const express = require("express");
const {geturl,getdata} = require("../controller/googlefitcontroller");
const { authMiddleware } = require("../middleware/userMiddleware");
const router = express.Router();

router.get("/geturl", authMiddleware, geturl);

router.get("/getdata", authMiddleware, getdata);


module.exports = router;