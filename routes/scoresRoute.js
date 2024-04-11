const express = require("express");
const scoreController = require("../controllers/scoreController");
const router = express.Router();

router.get("/score", scoreController.getAll);
router.post("/score", scoreController.addScores);
router.put("/score", scoreController.updateScores);

module.exports = router;
