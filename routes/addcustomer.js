const express = require('express');
const router = express.Router();
const customer_electronics = require('../models/electronics_store');
const customer_toys = require('../models/toys_store');
const Electronics_fields = require('../models/addedf_electronics');
const Toys_fields = require('../models/addedf_toys');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');
// const { findOne } = require('../models/electronics_store');

// Elctrionics_store_form
router.get('/add/electronics',ensureAuthenticated,async (req, res) =>{

let f = await Electronics_fields.find();

  res.render('addcustomer',{field: f})
});

// addcustomer_form_landing
router.get('/addcustomer',ensureAuthenticated,async (req, res) =>{

    let f = await Electronics_fields.find();
    
      res.render('addcustomer',{field: f})
    });

// Toys_store_form
router.get('/add/toys',ensureAuthenticated,async (req, res) =>{

    let f = await Toys_fields.find();
    
      res.render('addcustomer_toys',{field: f})
    });
    

// Newfield_add
router.post('/add/newfield' ,ensureAuthenticated, async (req,res) =>{
    const{store} = req.body;
    const{name} = req.body;
    let n = await Electronics_fields.findOne({name: name ,deleted: {$ne: 'true'}});

    if(store == "Electronics_store"){
    if(n){
        req.flash('success_msg','Field already exists!');
        res.redirect('/add/electronics');
    }else{
            
    try{
    let count = await Electronics_fields.countDocuments();    
    if(count < 20){   
    const{name, type, deleted,imp}  = req.body;
    let new_field = new Electronics_fields
    ( {
        name : name,
        type : type,
        deleted : deleted,
        imp : imp,
    });
    await new_field.save();
    return res.redirect('/add/electronics');
    }else{
        req.flash('success_msg', 'Cannot add more fields! Field Limit :20 Reached! ');
        res.redirect('/add/electronics');
    }
 }catch(err){
    res.send(err);
 }
 }
}else{
    try{
        const{name} = req.body;
        let n = await Toys_fields.findOne({name: name ,deleted: {$ne: 'true'}});
        if(n){
            req.flash('success_msg','Field already exists!');
            res.redirect('/add/toys');            
        }
        else{
        
        let count = await Toys_fields.countDocuments();
        if(count < 20){ 
        const{name, type, deleted,imp} = req.body;
        let new_field = new Toys_fields
        ( {
            name : name,
            type : type,
            deleted : deleted,
            imp : imp,
        });
        await new_field.save();
        res.redirect('/add/toys');
    }else{
        req.flash('success_msg', 'Cannot add more fields! Field Limit :20 Reached! ');
        res.redirect('/add/toys');
    }
    }
    }catch(err){
        res.send(err);
    }

}

});

// Delete_a_field_electronics

router.post('/delete/electronics', ensureAuthenticated,async (req,res) =>{
    try{
    const {id} = req.body.id;    
    await Electronics_fields.updateOne({ id: id }, {$set: {deleted: 'true'}});
    let field = await Electronics_fields.findById(req.body.id);
    await field.remove();
    req.flash('success_msg','Field Deleted!');
    res.redirect('/add/electronics');
    }catch(err){
        res.status(500).send(err);
    }
});

//Delete_a_field_toys

router.post('/delete/toys', ensureAuthenticated,async (req,res) =>{
    try{
    const {id} = req.body.id;    
    await Toys_fields.updateOne({ id: id }, {$set: {deleted: 'true'}});
    let field = await Toys_fields.findById(req.body.id);
    await field.remove();
    req.flash('success_msg','Field Deleted!');
    res.redirect("/add/toys");
    }catch(err){
        res.status(500).send(err);
    }
})

// add_new_customer_electronics

router.post('/addcustomer/newfield/customer_electronics', ensureAuthenticated,async (req, res) => {
    try{
                
        const{Name,Email,Mobileno,Gender,Address} = req.body;
        if(!Name || !Email|| !Mobileno || !Gender || !Address){
                req.flash('success_msg','Enter all the fields!');
                res.redirect('/add/electronics')                
        }
    
        let user = await customer_electronics.findOne({Email});
        if(user){
            req.flash('success_msg','Customer already exists!');
            return res.redirect('/add/electronics');

        }else{

        let t  = await customer_electronics(req.body)

        await t.save();
        req.flash('success_msg', 'Saved!');
        res.redirect('/add/electronics')
        }
    }catch(err){
        res.send({msg : 'Something went wrong'});
    }
});

// add_new_customer_toys

router.post('/addcustomer/newfield/customer_toys', ensureAuthenticated,async (req, res) => {
    
    try{
        
        const{Name,Email,Mobileno,Gender,Address} = req.body;
        if(!Name || !Email|| !Mobileno || !Gender || !Address){
                req.flash('success_msg','Enter all the fields!');
                res.redirect('/add/toys')                
        }
        
        let user = await Toys_fields.findOne({Email});
        if(user){
            console.log(user);
            req.flash('success_msg','Customer already exists!');
            return res.redirect('/add/toys'); 
            // jis block me do reponses hote hain unme se ek ko we have to return
            
        }else{

            let t  = await customer_toys(req.body)

            await t.save();
            req.flash('success_msg', 'Saved!');
            res.redirect('/add/toys');
        }
    }
    catch(err){
        res.send({msg : "Something went wrong!"})
        
    }
});
  
router.get('/gg',async(req,res)=>{
    let c = await Electronics_fields.countDocuments();
    res.send({c});
})

module.exports = router;