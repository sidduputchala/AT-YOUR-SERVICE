const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer')
const Employee = require('./models/employee')
const Mycart = require('./models/mycart')
const Contactus = require('./models/contactus')
const Request = require('./models/request');
const { updateOne } = require('./models/customer');
const { render, type } = require('express/lib/response');
const res = require('express/lib/response');
const { validateMail, validatePhone, validateZip, validatePass } = require('./public/validations')

// const bodyparser = require('body-parser');
//express app
const app = express();

const dburi = 'mongodb+srv://Siddu:3645@cluster0.hc9mc.mongodb.net/project?retryWrites=true&w=majority';

mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for requests

// middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));


var cus1 = {};
var senddata = {};
var orders = [];
var employees = [];
var customers = [];
//signup

app.post('/signup', (req, res) => {
    const customer = new Customer(req.body);
    if ((validatePass(req.body.password) == false) || (validatePhone(req.body.contactnumber) == false) || (validateMail(req.body.email) == false) || (validateZip(req.body.zipcode) == false)) {
        const flagP = validatePass(req.body.password)
        const flagC = validatePhone(req.body.contactnumber);
        const flagM = validateMail(req.body.email);
        const flagZ = validateZip(req.body.zipcode);
        res.render('signup', { flagP, flagC, flagM, flagZ })
    } else {
        console.log("Sign up process started");
        // console.log(customer);
        Customer.find()
            .then((result) => {
                var count = 0;
                result.forEach(element => {
                    if (element.email == customer.email) {

                        count += 1;
                    }
                })
                console.log(count)
                if (count == 0) {
                    customer.save()
                        .then((result) => {
                            console.log("new result" + result);
                            cus1 = result;
                            senddata = result;
                            res.render('home', { result });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
                else
                    // res.send(" <h1>   AN USER  ALREADY  EXISTS  WITH  THIS  EMAIL <h1>");
                    return res.json({ status: 'err', err: "invalid username or password" })
            })
    }
});


// login
app.post('/home', (req, res) => {
    const customer = new Customer(req.body);
    Customer.find()
        .then((result) => {
            var found = 0;
            result.forEach(element => {
                if (element.email == customer.email && element.password == customer.password) {
                    found += 1;
                    result = element;
                    cus1 = element;
                    senddata = element;
                }
            })
            // console.log(found)
            if (found == 0) {
                const flag=false;
                // res.send(" 404: error  There is no defined user with this email id");
                //return res.json({ status: 'err', err: "invalid username or password" })
                res.render('login',{flag})
            }
            else {
                // console.log("data is " + cus1);
                res.render('home', { result: cus1 });
            }
        })
});


//cart intial for rendering after login if he didn't order i.e cache data
var cart = [];
Mycart.find({ customerid: cus1._id })
    .then((result) => {
        // console.log("bye");
        cart = result;
    });

Request.find()
    .then((result) => {
        orders.length = 0;
        orders = result;
    });


//Salon requests
app.post('/S11', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;

    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });

});

app.post('/S12', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;
    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });


});


app.post('/S13', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;
    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });

});



//House cleaning
app.post('/S21', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;

    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });

});

app.post('/S22', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;
    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });


});


app.post('/S23', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;
    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });

});


//Appliances
app.post('/S31', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;

    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });

});

app.post('/S32', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;
    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });


});


app.post('/S33', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;
    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });

});


//packers and movers
app.post('/S41', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;

    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });

});

app.post('/S42', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;
    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });


});


app.post('/S43', (req, res) => {
    const mycart = new Mycart(req.body);
    mycart.assigned = '0';
    mycart.customerid = cus1._id;
    mycart.save()
        .then((result) => {
            cart.push(result);
            res.render('home');
        });

});

///// deleting cart items if 
app.post('/delete/:id', (req, res) => {

    var id = req.params.id;
    Mycart.findByIdAndDelete(id)
        .then(result => {
            res.render('home');
        })
        .catch(err => {
            console.log(err);
        })

});


///////order page 
app.get('/carts/:id', (req, res) => {

    var id = req.params.id;

    Mycart.findById(id)
        .then(result => {
            res.render('details', { cart: result });
            console.log("nowwwwwwwwwwwww" + result)
        })
        .catch(err => {
            console.log(err);
        })

});


//settings
app.post('/home/account/settings', (req, res) => {

    if ((req.body.firstname) != null) {
        let fname1 = req.body.firstname;
        senddata.firstname = fname1;
        Customer.findOneAndUpdate({ email: cus1.email }, { firstname: fname1 }, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data.firstname);
            }
        })
    }

    if ((req.body.lastname) != null) {
        let lname1 = req.body.lastname;
        senddata.lastname = lname1;
        Customer.findOneAndUpdate({ email: cus1.email }, { lastname: lname1 }, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data.lname);
            }
        })
    }
    if ((req.body.password) != null) {
        let pwd1 = req.body.password;
        senddata.password = pwd1;
        Customer.findOneAndUpdate({ email: cus1.email }, { password: pwd1 }, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data.password);
            }
        })

    }

    if ((req.body.contactnumber) != null) {
        let mob1 = req.body.contactnumber;
        senddata.contactnumber = mob1;
        Customer.findOneAndUpdate({ email: cus1.email }, { contactnumber: mob1 }, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data.contactnumber);
            }
        })
    }

    if ((req.body.address) != null) {
        let address1 = req.body.address;
        senddata.address = address1;
        Customer.findOneAndUpdate({ email: cus1.email }, { address: address1 }, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data.address);
            }
        })
    }

    if ((req.body.city) != null) {
        let city1 = req.body.city;
        senddata.city = city1;
        Customer.findOneAndUpdate({ email: cus1.email }, { city: city1 }, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data.city);
            }
        })
    }

    if ((req.body.state1) != null) {
        let state1 = req.body.state1;
        senddata.state = state1;
        Customer.findOneAndUpdate({ email: cus1.email }, { state: state1 }, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data.state);
            }
        })
    }

    if ((req.body.zipcode) != null) {

        let zipcode1 = req.body.zipcode;
        senddata.zipcode = zipcode1;
        Customer.findOneAndUpdate({ email: cus1.email }, { zipcode: zipcode1 }, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data.zipcode);
            }
        })
    }
    console.log("Post method");
    console.log(senddata);

    // Customer.findOneAndUpdate({email: cus1.email}, {firstname: fname, lastname: lname},(error,data)=> {
    //     if(error){
    //         console.log(error);
    //     }
    //     else{
    //         console.log(data);
    //     }
    // })
    res.redirect('profile');
}
)

//employee
app.post('/home/employee', (req, res) => {
    const employee = new Employee(req.body);
    if ((validatePass(req.body.password) == false) || (validatePhone(req.body.contactnumber) == false) || (validateMail(req.body.email) == false) || (validateZip(req.body.zipcode) == false)) {
        const flagP = validatePass(req.body.password)
        const flagC = validatePhone(req.body.contactnumber);
        const flagM = validateMail(req.body.email);
        const flagZ = validateZip(req.body.zipcode);
        res.render('register', { flagP, flagC, flagM, flagZ })
    } else {
        // console.log("hii");
        console.log(employee);
        Employee.find()
            .then((result) => {
                var count = 0;
                result.forEach(element => {
                    if (element.email == employee.email) {

                        count += 1;
                    }
                })
                console.log(count)
                if (count == 0) {
                    employee.free = "0";
                    employee.save()
                        .then((result) => {
                            console.log("new result" + result);
                            res.render('employee', { result });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
                else
                    res.send(" <h1>AN employee  ALREADY  EXISTS  WITH  THIS  EMAIL <h1>");
            })
    }
});

var emp = []
//employee login
app.post('/home/employeepage', (req, res) => {
    const employee = new Employee(req.body);
    Employee.find()
        .then((result) => {
            var found = 0;
            result.forEach(element => {
                if (element.email == employee.email) {
                    found += 1;
                    result = element;
                    emp = element;
                }
            })
            console.log(found)
            if (found == 0) {
                res.send(err)
            }
            else {
                // console.log( "data is "+cus1);
                res.render('employee', { result: emp });
            }
        })
});


////work for employees
app.get('/work', (req, res) => {

    Request.find()
        .then(result => {
            console.log(emp._id);
            console.log(result)
            getdata();
            res.render('work', { emp, order: result, customers });
        })
        .catch(err => {
            console.log(err);
        });

})
// here payment is updated  by the employee
///  payment : when posting amount
////  now update employee is freee  ////////////////////////////////////////////////////forgot
app.post('/payment/:id', (req, res) => {

    var id = req.params.id;
    var em = req.body.employeeid.toString()
    var amount = req.body.payment.toString();
    amount = amount.slice(0, -1);
    Request.findByIdAndUpdate(id, { cost: amount },
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated User : ", docs);

                console.log(em + "employeeeeeeeeeeeeeeeeeee")

                Employee.findByIdAndUpdate(em, { free: '0' },
                    function (err, docs) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("Updated employee : ", docs);

                        }
                    })

                res.render('home')
            }
        })
});


////// order details in new page individual page

app.get('/orders/:id', (req, res) => {
    var id = req.params.id;
    Request.findById(id)
        .then(result => {
            getdata();
            res.render('orderdetails', { order: result, customers, employees });
        })
        .catch(err => {
            console.log(err);
        });

})

//request: assigning a employee if found or else keeping sorry 
app.post('/myorders', (req, res) => {
    cart.forEach(x => {
        var d = x._id;
        const request = new Request(req.body);
        request.served = '0';
        request.customerid = cus1._id;
        request.cost = "-1";
        request.servicename = x.servicename;
        Employee.findOneAndUpdate({ profession: x.subtype, free: "0" }, { free: "1" }, { new: true })
            .then((result) => {
                if (!result) {
                    request.employeeid = "sorryyy";
                    
                    Mycart.deleteOne(d)
                        .then(() => {
                            request.save();
                        })
                }
                else {
                    // console.log(result._id); 
                    request.employeeid = result._id;
                    id = result._id;
                    Mycart.deleteOne(d)
                        .then(() => {
                            request.save();
                        })
                }

            })
    });

    res.render('home');
});

function updatecart() {

    Mycart.find()
        .then((result) => {
            cart.length = 0;
            cart = result;
        });

}

function ordinf() {
    Request.find()
        .then((result) => {
            orders.length = 0;
            orders = result;
        });
}

function getdata() {
    Customer.find()
        .then((result) => {
            customers = result
        });
    Employee.find()
        .then((result) => {
            employees = result
        });

}

//contact us 

app.post('/home/contactus', (req, res) => {

    const contactus = new Contactus(req.body)
    contactus.save()

    res.render('contactus', { res: 1 })



})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/home', (req, res) => {
    res.render('home', { result: cus1 });
})
// Our services
app.get('/home/services/packersandmovers', (req, res) => {
    res.render('packersandmovers')
})

app.get('/home/services/appliances', (req, res) => {
    res.render('Appliances')
})

app.get('/home/services/homecleaning', (req, res) => {
    res.render('homecleaning')
})

app.get('/home/services/salonathome', (req, res) => {
    res.render('salonathome')
})
//About page
app.get('/home/about', (req, res) => {
    res.render('about')
})

//Contact Us
app.get('/home/contactus', (req, res) => {
    res.render('contactus')
})

//login/SignUp
app.get('/login-signup', (req, res) => {
    flag=true;
    res.render('login',{flag})
})

//register as professional
app.get('/register', (req, res) => {
    const flagP = true;
    const flagC = true;
    const flagM = true;
    const flagZ = true;
    res.render('register', { flagP, flagC, flagM, flagZ });
})

//profile
app.get('/home/account/profile', (req, res) => {
    res.render('profile', { result: cus1 })
})

//cart
app.get('/home/account/cart', (req, res) => {
    updatecart();
    res.render('cart', { cart,cus1 })
})

app.get('/home/account/order', (req, res) => {
    ordinf();
    res.render('myorders', { orders, cus1 })
})

//settings
app.get('/home/account/settings', (req, res) => {
    res.render('settings', { results: senddata })
})


//employee login
app.get('/employee-login', (req, res) => {
    res.render('employeelogin')
})

app.get('/signup', (req, res) => {
    const flagP = true;
    const flagC = true;
    const flagM = true;
    const flagZ = true;
    res.render('signup', { flagP, flagC, flagM, flagZ });
})

//employee home
app.get('/home/employee', (req, res) => {
    res.render('employee')
})

//employee home
app.get('/home/employeepage', (req, res) => {
    res.render('employee',{result:emp})
})



//404 page
app.use((req, res) => {
    res.status(404).render('404')
});

//  if payment is done then make chages to the ordernpage such taht tey will be disabbled