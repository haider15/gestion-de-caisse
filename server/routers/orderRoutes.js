const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController.js");
const Order = require("../model/Order.js");

router
  .route('/')
  .post(orderController.addOrderItems)
  .get(orderController.getOrders)
router.route('/:id').get(orderController.getOrderById)
router.route('/:id/pay').put(orderController.updateOrderToPaid)
router.route('/:id/deliver').put(orderController.updateOrderToDelivered)
// router.route('/:orderid/:productid').put(orderController.updateProduct)
router.delete("/" ,async (req, res) => {
  try {

    const productDeleted = await Order.deleteMany();
    res.send({
      success: true,
      message: "delete done",
      product: productDeleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
