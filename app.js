const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Chirag0509:'+ process.env.MONGO_ATLAS_PW +'@cluster0.rjjd3z7.mongodb.net/?retryWrites=true&w=majority' , 
{
    useMongoClient : true
})
const productRouter = require('./api/routes/product')
const ordersRouter = require('./api/routes/orders')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin','*');
    res.header('Acess-Control-Allow-Headers',
'Origin, X-Requested-With, Content-type, Accept, Authorization');

if(req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
}
   next();
});

app.use('/product', productRouter);
app.use('/orders', ordersRouter);

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})


module.exports = app;