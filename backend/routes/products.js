const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req,res) => {
    Product.find().then(customers => res.json(customers)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const price = Number(req.body.price);
    const description = req.body.description;
    const createdDate = Date.parse(req.body.createdDate);
    const newProduct = new Product({name, price, description, createdDate});
    newProduct.save().then(() => res.json('Product added.')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Product.findById(req.params.id).then(product => res(product)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {
    Product.findByIdAndUpdate(req.params.id).then(product => {
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.createdDate = req.body.createdDate;
        
        product.save().then(() => res.json('Product updated.')).catch(err => res.status(400).json('Error: ' + err));
    });
});

module.exports = router