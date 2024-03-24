const express = require("express");
const majorController = require("../controllers/majorController");
const router = express.Router();

router.get("/major", majorController.getAll);
router.post("/major", majorController.addMajor);
router.put("/update-major", majorController.updateMajor);
router.put("/delete-major", majorController.deleteMajor);

module.exports = router;
