const express = require("express");
const demoController = require("../controllers/demoController");
const router = express.Router();

router.get("/demo", demoController.getAll);
router.post("/demo", demoController.addDemo);
router.put("/update-demo", demoController.updateDemo);
router.put("/delete-demo", demoController.deleteDemo);

module.exports = router;