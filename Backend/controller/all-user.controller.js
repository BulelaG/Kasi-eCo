const db = require("../models")

const User = db.user
const Trader = db.trader
const Customer = db.customer
const Product = db.product
const Order = db.order

// const {User, Trader, Customer, Product, Order } = require('../models');



// GET ALL USERS 

exports.getAll = (req, res)=>{
    User.find()
      .then(data=>{
          res.send(data)
          console.log(data)
      })
      .catch(error=>{
       res.status(500).send("Could not find user", error)
       console.log("Could not find user", error)
      })
}


// CREATE 1 USER
exports.create = async (req, res)=>{
if(!req.body){
    res.status(400).send("Cannot add without info")
    return;   
}
// let results;

// await fetch('https://randomuser.me/api/')
//         .then(res=>res.json())
//         .then(data=>{
//         console.log(results=data.results[0].email)})

const user = new User ({
      fname: req.body.fname,
      email: req.body.email,
      password: req.body.password
})

try{
   user.save()
   .then(user=>{

       console.log(user)
       res.send(user)  
   })
   return
}catch (err){
   res.status(500).send('Could not create new user')
   console.log(`Some err occured : ${err.message}`)
}
}     



// GET A USER
exports.getOne = (req, res)=>{
    
  const id = req.params.id

  User.findById(id, { useFindAndModify: false})
         .then(data=>{
          res.send(data)
          console.log(data) })
          .catch((error) => {
           res.status(500).send("Could not find user", error);
           console.log("Could not find user", error);
        });
}

// CLEAR ALL
exports.deleteAll = (req, res)=>{

User.deleteMany()
   .then(data=>{
       res.send(data)
       console.log(data)
   })
   .catch(error=>{
       res.status(500).send("Could not delete all users ", error)
       console.log("Could not delete all", error)
   })
}


// DELETE A USER
exports.deleteOne = (req, res)=>{

const id = req.params.id

User.findByIdAndRemove(id, { useFindAndModify: false})
   .then(data =>{
       if(!data) {
          res.status(404).send({
           msg: `Cannot delete User with id=${id}. Maybe it was not exit/existing`
          })
       } else res.status(201).send({ msg: "User was deleted successfully"})
   })
   .catch(err => {
       res.status(500).send({ msg: `Error deleting User with id=${id}, Error:  ${err}`})
   })
}

// UPDATE A USER
exports.update = (req, res)=>{
if(!req.body){
   res.status(400).send("Cannot update user")
   return
}
const id = req.params.id

User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
.then(data =>{
   if(!data) {
      res.status(404).send({
        msg: `Cannot update User with id=${id}. Maybe it was not found`
      })
   } else res.status(201).send({ msg: "User was updated successfully"})
})
.catch(err => {
   res.status(500).send({ msg: `Error updating User with id=${id} ${err}`})
})
}


// Traders

// Create a new trader
exports.createTrader = async (req, res) => {                  //The was const , I replaced with ""exports.""
  try {
    const { email, password, fname, businessName, address } = req.body;
    const trader = new Trader({ email, password, fname, businessName, address });
    await trader.save();
    res.status(201).json({ message: 'Trader created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all traders
exports.getAllTraders = async (req, res) => {     //The was const , I replaced with ""exports.""
  try {
    const traders = await Trader.find();
    res.json(traders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a trader by ID
exports.getTraderById = async (req, res) => {         //The was const , I replaced with ""exports.""
  try {
    const { id } = req.params;
    const trader = await Trader.findById(id);
    if (!trader) {
      return res.status(404).json({ error: 'Trader not found' });
    }
    res.json(trader);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Update a trader by ID
exports.updateTrader = async (req, res) => {       //The was const , I replaced with ""exports.""
  try {
    const { id } = req.params;
    const { email, password, fname, businessName, address } = req.body;
    const trader = await Trader.findByIdAndUpdate(
      id,
      { email, password, fname, businessName, address },
      { new: true }
    );
    if (!trader) {
      return res.status(404).json({ error: 'Trader not found' });
    }
    res.json(trader);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a trader by ID
exports.deleteTrader = async (req, res) => {     //The was const , I replaced with ""exports.""
  try {
    const { id } = req.params;
    const trader = await Trader.findByIdAndDelete(id);
    if (!trader) {
      return res.status(404).json({ error: 'Trader not found' });
    }
    res.json({ message: 'Trader deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete all traders
exports.deleteAllTraders = async (req, res) => {
  try {
    await Trader.deleteMany();
    res.json({ message: 'All traders deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Customers

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { email, password, fname, deliveryAddress, contactNumber } = req.body;
    const customer = new Customer({ email, password, fname, deliveryAddress, contactNumber });
    await customer.save();
    res.status(201).json({ message: 'Customer created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {      //The was const , I replaced with ""exports.""
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update a customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, fname, shippingAddress, contactNumber } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      id,
      { email, password, fname, shippingAddress, contactNumber },
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete all customers
exports.deleteAllCustomers = async (req, res) => {
  try {
    await Customer.deleteMany();
    res.json({ message: 'All customers deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Products

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { fname, price, description } = req.body;
    const product = new Product({ fname, price, description });
    await product.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, price, description } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { fname, price, description },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.json({ message: 'All products deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Orders

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { customer, products } = req.body;
    const order = new Order({ customer, products });
    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer, products } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      { customer, products },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete all orders
exports.deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany();
    res.json({ message: 'All orders deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// module.exports = {
 
//   //Users


//   // getAll,
//   getOne,
//   create,
//   update,
//   deleteOne,
//   deleteAll,

//   // Traders

//   getAllTraders,
//   getTraderById,
//   createTrader,
//   updateTrader,
//   deleteTrader,
//   deleteAllTraders,

//   // Customers

//   getAllCustomers,
//   getCustomerById,
//   createCustomer,
//   updateCustomer,
//   deleteCustomer,
//   deleteAllCustomers,

//   // Products

//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   deleteAllProducts,

//   // Orders

//   getAllOrders,
//   getOrderById,
//   createOrder,
//   updateOrder,
//   deleteAllOrders,
//   deleteOrder,
  
 

// };

