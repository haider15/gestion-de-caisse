const express = require("express");
const router = express.Router();

const revenueController = require('../controllers/revenueController');
const Order = require("../model/Order");

router.get('/order', revenueController.showOrder);
router.post('/confirm', revenueController.confirmOrder);
router.get('/food', revenueController.showFood);
router.get('/type', revenueController.showType);
// router.post('/searchAccount', revenueController.searchAccountId);
// router.post('/searchItem', revenueController.searchItemId);
// router.post('/searchProduct', revenueController.searchProductId);
// router.get("/:id", async (req, res) => {
//     // const conditionFilter = { catelory: req.params.id };
//     const id=req.params.id
//     try {
//       const users = await Order.findById({_id:id});
//       res.status(200).send(users);
//     } catch (error) {
//       res.status(404).json({ message: error.stack });
//     }
//   });



module.exports = router;