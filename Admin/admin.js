const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer')
const Employee = require('./models/employee')
const Mycart = require('./models/mycart')
const Contactus = require('./models/contactus')
const Request = require('./models/request');
const { updateOne, update } = require('./models/customer');
const { render, type } = require('express/lib/response');
const res = require('express/lib/response');
const customer = require('./models/customer');
const nodemailer = require('nodemailer');
const { validateMail, validatePhone, validateZip, validatePass } = require('./public/validations')  


// const bodyparser = require('body-parser');
//express app
const app = express();

const dburi = 'mongodb+srv://Siddu:3645@cluster0.hc9mc.mongodb.net/project?retryWrites=true&w=majority';

mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3001))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for requests

// middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));


let custcount;
let empcount;
let c;
let e;
let flag=0;

//Admin login
app.post('/login',(req, res)=>{
    var x = req.body.username;
    var y = req.body.password;
    if(x=='admin'&& y=='1234'){
        flag=0
         res.render('home',{custcount:c,empcount:e})
    }else{
        flag=1
        res.render('login',{flag:flag})
    }
})



//Admin home page
app.get('/',(req,res)=>{
    
    Customer.find()

        .then((result) => {
           c=0;
           custcount=0;
            result.forEach(element => {
                custcount++;
                console.log("Cust"+custcount);
                c=custcount;
            })
            
            
        })
        
    Employee.find()
        .then((result) => {
            e=0;
            empcount=0;
            result.forEach(element => {
            

                empcount++;
                console.log("Emp"+empcount);
                e = empcount;
            })
            
            
        })

        
    res.render('login',{flag:0});
})




//Admin home page after login
app.get('/home',(req,res)=>{


    Customer.find()

        .then((result) => {
           c=0;
           custcount=0;
            result.forEach(element => {
                custcount++;
                console.log("Cust"+custcount);
                c=custcount;
            })
            
            
        })
        
    Employee.find()
        .then((result) => {
            e=0;
            empcount=0;
            result.forEach(element => {
            

                empcount++;
                console.log("Emp"+empcount);
                e = empcount;
            })
            
            
        })

    
        console.log("cust count:"+ custcount);
        console.log("emp count:"+ empcount);

    res.render('home',{custcount:c,empcount:e});
})


var custlist=[];

var emplist=[];

// Display all details 
app.get('/displaydata',(req,res)=>{
Customer.find()
    .then((result) => {   
        //console.log("my resultttt"+result)  
           custlist = result ;
})
            
Employee.find()
    .then((result) => {     
       
    emplist = result;
});
// console.log("Customer Details:");
// console.log(custlist);
res.render('displaydata',{custlist:custlist,emplist:emplist});

})




app.post('/newemp',(req, res) => {
    const employee = new Employee(req.body);
    if ((validatePass(req.body.password) == false) || (validatePhone(req.body.contactnumber) == false) || (validateMail(req.body.email) == false) || (validateZip(req.body.zipcode) == false)) {
        const flagP = validatePass(req.body.password)
        const flagC = validatePhone(req.body.contactnumber);
        const flagM = validateMail(req.body.email);
        const flagZ = validateZip(req.body.zipcode);
        res.render('newemp', { flagP, flagC, flagM, flagZ })
    }
    else{
        employee.save();
        console.log("Employee CREATED");
        // console.log(employee);
        res.redirect('newemp');
    }
})




//Delete details
app.post('/empdelete/:id', (req, res) => {

    var id = req.params.id;
    Employee.findByIdAndDelete(id)
        .then(result => {
            console.log("Employee Deleted");
            up();
            res.render('displaydata',{custlist:custlist,emplist:emplist});

        
        })
        .catch(err => {
            console.log(err);
        })

});
app.post('/customerdelete/:id', (req, res) => {

    var id = req.params.id;
    Customer.findByIdAndDelete(id)
        .then(result => {
            console.log("Customer Deleted");
            up();
            res.render('displaydata',{custlist:custlist,emplist:emplist});
        })
        .catch(err => {
            console.log(err);
        })

});


function up(){ 

    Customer.find()
    .then((result) => {   
        //console.log("my resultttt"+result)  
           custlist = result ;
})
            
Employee.find()
    .then((result) => {     
       
    emplist = result;
});   
}



// Messages
var msglist=[];
app.get('/messages',(req,res)=>{

    Contactus.find()
    .then((result) => {   
         
           msglist = result ;
})
            


    res.render('messages',{msglist:msglist});
    
})


function updatemsgs(){

    Contactus.find()
    .then((result) => {   
        
           msglist = result ;
})
}

//Msgs delete
app.post('/msgdelete/:id', (req, res) => {

    var id = req.params.id;
    Contactus.findByIdAndDelete(id)
        .then(result => {
            console.log("Message Deleted");
            updatemsgs();
            res.render('messages',{msglist:msglist});

        
        })
        .catch(err => {
            console.log(err);
        })

});





//Send emails to all users
var maillist=[];
app.post('/home1',(req, res)=>{

    var ann = req.body.announcement;
    var sender = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'chillbrospacy2020@gmail.com',
            pass:'Spacy123'
        }
    });
    

    Customer.find()
    .then((result) => {   
        //console.log("my resultttt"+result)  
           maillist = result ;
    })

    //Nodemailer
    for(const iter of maillist) {
        var composemail = {
            from : 'chillbrospacy2020@gmail.com',
            to : iter.email,
            subject : 'Send mail using NodeJS',
            html : ann
        
        }
        
        sender.sendMail(composemail,function(error,info){
            if(error){
                console.log("hi");
            } 
            else{
                console.log("Mail Sent successfully" +info.response);
            }
        });
    
    }


    res.redirect('home')
    res.redirect('home')
})






//Create new employee data
app.get('/newemp',(req, res)=>{
    const flagP=true;
    const flagC=true;
    const flagM=true;
    const flagZ=true;
    res.render('newemp',{flagP,flagC,flagM,flagZ})
})

 //404 page
  app.use((req,res) => {
    res.status(404).render('404')
});


