const express = require('express');
const router = express.Router();
const customer_electronics = require('../models/electronics_store');
const customer_toys = require('../models/toys_store');
const Electronics_fields = require('../models/addedf_electronics');
const Toys_fields = require('../models/addedf_toys');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

// Show_Electronics_store_data

router.get('/show/electronics_store',ensureAuthenticated, async (req,res) =>{

    let customers =  await customer_electronics.find();
    let fields = await Electronics_fields.find();
    res.render('showelectronics',{fields : fields,customers : customers });

});

// Show_Toys_store_data

router.get('/show/toys_store',ensureAuthenticated, async (req,res) =>{

    let customers =  await customer_toys.find();
    let fields = await Toys_fields.find();
    res.render('showtoys',{fields : fields,customers : customers });
    
});

router.post('/delete/customer_electronics' ,ensureAuthenticated, async (req,res) => {
    const{id} = req.body;
    let customer = await customer_electronics.findById(id);
    await customer.remove();
    req.flash('success_msg','Customer Deleted!');
    res.redirect('/show/electronics_store');
});

router.post('/delete/customer_toys' ,ensureAuthenticated, async (req,res) => {
    const{id} = req.body;
    let customer = await customer_toys.findById(id);
    await customer.remove();
    req.flash('success_msg','Customer Deleted!');
    res.redirect('/show/toys_store');
});


//test 

router.get('/show/es', async (req,res) =>{

    let customers =  await customer_electronics.find();
    let fields = await Electronics_fields.find();
    res.send(customers);

});

module.exports = router;