const mongoose = require('mongoose');
const schema = mongoose.Schema;

const mycartschema = new schema({
    
        //   username:{
        //       type:String,
        //       required:true
    
        //   },

        //service you want
    servicename: {
        type: String,
        required:true
    
    },
    
    assigned: {
        type: String,
        required:true
    },

    customerid:{
        type:String,
    }

 
    

   

});

const mycart = mongoose.model('mycart', mycartschema);

module.exports = mycart;
