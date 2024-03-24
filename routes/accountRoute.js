const express = require("express");
const accountController = require("../controllers/accountController");
const router = express.Router();

router.get("/account", accountController.getAll);
router.post("/account", accountController.addAccount);
router.put("/update-name-account", accountController.updateName);
router.put("/update-password-account", accountController.updatePassword);
router.put("/delete-account", accountController.deleteAccount);

module.exports = router;
