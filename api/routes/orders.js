const express = require('express');

const router = express.Router();

router.get('/' , (req, res, next) => {
    res.status(200).json({
        message  : 'Orders Featched'
    })
});

router.post('/' , (req, res, next) => {
    const order = {
        productId : req.body.productId,
        quantity : req.body.quantity,
    };
    res.status(201).json({
        message  : 'Orders Created',
        order  : order
    })
});

router.get('/:ordersId', (req,res,next) => {
   res.status(200).json({
    message : 'order details',
    ordersId : req.params.ordersId,
   })
})


router.delete('/:ordersId', (req,res,next) => {
    res.status(200).json({
     message : 'Orders deleted'
    })
 })

module.exports = router;