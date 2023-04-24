const Order = require('../model/Order')
const Product = require('../model/Product')


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const { OrderItems, usingMethod, totalPrice, userName } = req.body

  if (OrderItems && OrderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      OrderItems,
      usingMethod,
      totalPrice,
      userName,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
}
/// payment par id

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}
//tajerba /////////////////////////////////////////////////////
// const pay = async (req, res) => {
//   const order = await Order.findById(req.params.id)

//   if (order) {
//     order.isPaid = true
//     order.paidAt = Date.now()
//     const updatedOrder = await order.save()

//     res.json(updatedOrder)
//   } else {
//     res.status(404)
//     throw new Error('Order not found')
//   }
// }
//////////////////////////////////////////////////////////
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private

const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id)
  console.log(order)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}

// // @desc    Get logged in user orders
// // @route   GET /api/orders/myorders
// // @access  Private
// const getMyOrders = async (req, res) => {
//   const orders = await Order.find({ user: req.user._id })
//   res.json(orders)
// }

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  const orders = await Order.find({})
  res.json(orders)
}

// const updateProduct = async (req, res) => {
//  console.log(req.params.orderid)
//  console.log(req.params.productid)


//   if (!req.params.orderid || !req.params.productid) {
//       return res
//           .status(404)
//           .json({
//               "message": "Not found, Orderid and Productid are both required"
//           });
//   }
//   Order
//       .findById(req.params.orderid)
//       .select('Product')
//       .exec((error, Order) => {
//         console.log(Order)
//           if (!Order) {
//               return res
//                   .status(404)
//                   .json({
//                       "message": "Order not found"
//                   });
//           } else if (error) {
//               return res
//                   .status(400)
//                   .json(error);
//           }
//           if (Order.Product && Order.Product.length > 0) {
//               const Product = Order.Product.id(product);
//               console.log(Product)
//               const quantity=Order.findOne(req.quantity.Orderid)
//               if (!Product) {
//                   return res
//                       .status(400) 
//                       .json({
//                           "message": "Product not found 2"
//                       });
//               } else {
//                 Product.Count =Product.Count-quantity ;
                 
//                   Order.save((error, Order)=>{
//                       if(error){
//                           return res
//                               .status(400)
//                               .json(error);
//                       }else{
//                           res = {
//                               Order: {
//                                   name: Order.name,
//                                   id: req.params.Orderid
//                               },
//                               Product
//                           };
//                           return res
//                               .status(200)
//                               .json(res);
//                       }
//                   });

//               }
//           } else {
//               return res
//                   .status(404)
//                   .json({
//                       "message": "No Product 1514 found"
//                   });
//           }

//       });
// }




module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  // updateProduct
}
