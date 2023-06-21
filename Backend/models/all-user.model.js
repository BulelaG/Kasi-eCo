

const mongoose = require('mongoose');

//  User schema
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
    default: 'customer',
    required: true
  }
});

// Custom toJSON method to exclude unnecessary fields when converting to JSON
userSchema.method('toJSON', function() {
   const { __v, _id, password, ...object } = this.toObject();
   object.id = _id;
   return object;
 });


// Trader schema

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

// Customer schema

const customerSchema = new mongoose.Schema({

   // fields specific to customers

   deliveryAddress: {
     type: String,
     required: true
   },
   contactNumber: {
     type: String,
     required: true
   },
  });
 

 // Product schema

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

 // Order schema
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

//  Models based on the schemas
const User = mongoose.model('User', userSchema);
const Trader = User.discriminator('Trader', traderSchema);
const Customer = User.discriminator('Customer', customerSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// Exports of the models
module.exports = {
  User,
  Trader,
  Customer,
  Product,
  Order
};
