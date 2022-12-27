const mongoose = require('mongoose');
const schema = mongoose.Schema;

const requestschema = new schema({
    
        //   username:{
        //       type:String,
        //       required:true
    
        //   },
    customerid: {
        type: String,
        required:true
    
    },
    employeeid: {
        type: String,
        required:true
    },

    address:{
        type:String
    },

    requesttype: {
        type: String,
            },
      
    served:{
        type:String,
        required:true
    }
   

});

const request = mongoose.model('Request', requestschema);

module.exports = request;
