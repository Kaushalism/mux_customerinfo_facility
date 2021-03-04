const express = require('express');
const router = express.Router();
const customer_electronics = require('../models/electronics_store');
const customer_toys = require('../models/toys_store');
const monDynamic = require('mongoose-dynamic-schemas');
const Electronics_fields = require('../models/addedf_electronics');
const Toys_fields = require('../models/addedf_toys');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

// Show_Electronics_store_data

router.get('/show/electronics_store', async (req,res) =>{

    let customers =  await customer_electronics.find().select('-__v');
    let fields = await Electronics_fields.find();
    res.render('showelectronics',{fields : fields,customers : customers });

});

// Show_Toys_store_data

router.get('/show/toys_store',ensureAuthenticated, async (req,res) =>{

    let customers =  await customer_toys.find().select(' -__v');
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

// update_customer_toys

router.post('/update/customer_form',async (req,res) =>{

    const{id} = req.body;
    console.log(id)
    let customer = await customer_toys.find({_id : id});
    let fields = await Toys_fields.find();
    
    res.render('updateform_toys',{field: fields ,info : customer});

});

// update_customer_electronics

router.post('/update/customer_form_el',async (req,res) =>{

    const{id} = req.body;
    console.log(id)
    let customer = await customer_electronics.find({_id : id});
    let fields = await Electronics_fields.find();

    res.render('updateform_electronics',{field: fields ,info : customer});

});

// update_save_electronics

router.post("/update/customer_el",async (req,res) => {
    const{id} = req.body;
    await customer_electronics.findOneAndUpdate({_id:id}, req.body, {upsert:true}, function(err){ 

        if (err) return res.send(500, { error: err }); 
        req.flash('success_msg','Updated successfully!');
        return res.redirect('/show/electronics_store/'); 
        
        });
});

// update_save_electronics

router.post("/update/customer_toy",async (req,res) => {
    const{id} = req.body;
    await customer_toys.findOneAndUpdate({_id:id}, req.body, {upsert:true}, function(err){ 

        if (err) return res.send(500, { error: err }); 
        req.flash('success_msg','Updated successfully!');
        return res.redirect('/show/toys_store/'); 
        
        });
});

//test 
router.post('/show/es', async (req,res) =>{
    const{name, type } = req.body;
    let result = await monDynamic.addSchemaField(customer_electronics,"fathersName",{type : String});
    res.send(result);
    
});



module.exports = router;