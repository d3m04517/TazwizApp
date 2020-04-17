const router = require('express').Router();
let Customer = require('../models/customer.model');
const mongoose = require('mongoose');

router.route('/').get((req,res) => {
    Customer.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {

    const UID = req.body.UID
    const name = req.body.name
    const email = req.body.email
    const address = req.body.address
    const approved = Boolean(req.body.approved)

    const newCustomer = new Customer({UID, name, email, address, approved})

    newCustomer.save().then(() => res.json('Customer added.')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Customer.findById(req.params.id).then(customer => res(customer)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Customer.findByIdAndDelete(req.params.id).then(() => res.json('Customer deleted.')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {
    Customer.findByIdAndUpdate(req.params.id).then(customer => {
        customer.name = req.body.name;
        customer.email = req.body.email;
        customer.address = req.body.address;
        customer.approved = Boolean(req.body.approved);
        
        customer.save().then(() => res.json('Customer updated.')).catch(err => res.status(400).json('Error: ' + err));
    });
});

module.exports = router;