const router = require("express").Router();

const orderController = require("../controller/orders")


router.get("/", orderController.getAll);

router.get("/:id", orderController.getSingle);

router.post("/", orderController.createOrder);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;