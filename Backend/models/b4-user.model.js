//const mongoose = require("mongoose");

// module.exports = mongoose => {

//  const schemaUser = mongoose.Schema({

//      fname: {
//         type: String,
//         require: true
//      },
//      email:{
//         type: String,
//         require: true
//      },
//      password:{
//         type: String,
//         require: true
//      },
//      role: {
//         type: String,
//         enum: ['Trader', 'Customer'],
//         required: true
//      }

//        })

//     schemaUser.method("toJSON", function() {
//                 const{__v, _id, ...object } = this.toObject();
//                 object.id = _id;
//                 return object;

//     });

// let User = mongoose.model('User', schemaUser);
// return User


// }


const mongoose = require('mongoose');

//  user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Trader', 'Customer',],
    required: true
  }
});

// trader schema
const traderSchema = new mongoose.Schema({

      // Additional fields specific to traders
      businessName: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      
  
});

// Define the customer schema

const customerSchema = new mongoose.Schema({

   // Additional fields specific to customers

   shippingAddress: {
     type: String,
     required: true
   },
   contactNumber: {
     type: String,
     required: true
   },
 
 });
 

// Define the product schema
const productSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Define the order schema
const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Create the models based on the schemas
const User = mongoose.model('User', userSchema);
const Trader = User.discriminator('Trader', traderSchema);
const Customer = User.discriminator('Customer', customerSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// Export the models
module.exports = {
  User,
  Trader,
  Customer,
  Product,
  Order
};
