const router = require("express").Router();


router.get("/", (req, res) => {
    res.send("Hello Welcome to my website!");
});

router.use("/orders", require("./orders"));

router.use("/products", require("./products"));

router.use("/", require("./swagger"));

module.exports = router;