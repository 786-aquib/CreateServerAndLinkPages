const express = require('express');
const path= require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app=express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));

var contactList = [
{
        name:"Aquib",
        phone:"7754945402"
    },
]>
app.get('/',function(req,res){
   

    Contact.find({},function(err,Contacts){
        if(err){console.log('Error in fetching contacts from db');
    return;}
    return res.render('home', {
        title: "My Contacts list",
        contact_list: Contacts
    });
});
});

app.get('/practice',function(req,res){
   
    return res.render('practice', {
        title:"Let us play with ejs"
    });
});


app.post('/create-contact', function(req,res){
//    contactList.push({
//     name: req.body.name,
//     phone: req.body.phone
//    });
Contact.create({
    name: req.body.name,
    phone: req.body.phone
},function(err,newContact){
    if(err){console.log('error in creating contact');
return;}
console.log('*******',newContact);
return res.redirect('back');
});
});

// app.get('/delete-contact/:phone', function(req,res){
//     console.log(req.params);
//     let phone =req.params.phone;
    
    
        
// })
app.listen(port,function(err){
    if(err){console.log('Error in running the server',err);}
    console.log('yup my server in port',port);
})