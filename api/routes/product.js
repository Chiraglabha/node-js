const express = require('express');
const  Product = require('./models/product');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/' , (req, res, next) => {
    res.status(200).json({
        message  : 'Get method'
    })
});

router.post('/' , (req, res, next) => {
    const products = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    products.save().than(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(200).json({
        message  : 'Post method',
        createdProducts : product
    });
});


router.get('/:productID', (req,res,next) => {
    const id = req.params.productID;
    if(id === 'special') {
        res.status(200).json({
            message : 'You passes spacial ID',
            id : id
        });
    }else {
        res.status(200).json({
            message : 'You passed ID'
        });
    }
})

router.patch('/:productID', (req,res,next) => {
   res.status(200).json({
    message : 'Produts updated'
   })
})

router.delete('/:productID', (req,res,next) => {
    res.status(200).json({
     message : 'Product deleted'
    })
 })

module.exports = router;