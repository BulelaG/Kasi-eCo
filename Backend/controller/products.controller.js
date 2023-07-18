const db = require("../models");
const Product = db.products;
const Trader = db.trader;
// / Create a new product
exports.createProduct = async (req, res) => {

// Create a new Product object from the request body
const product = new Product({
  p_name: req.body.p_name,
  price: req.body.price,
  description: req.body.description,
  category: req.body.category,
  image: req.body.image,
  createdBy: req.userId
});

console.log(product.createdBy)

// If the request body includes a createdBy field, find the trader with the specified name and set the createdBy property of the product to the trader's _i

// Save the product to the database
const savedProduct = await product.save();

// If the product was not created successfully, return an error message
if (!savedProduct) {
return res.status(500).send({ message: "The product was not created." });
}

// Return a success message
res.send({ message: "Product created successfully!" });
};



  // Get products by createdBy
  // exports.getProductsByCreatedBy = async (req, res) => {
  //   try {
  //     const createdBy = req.params.createdBy;
  //     const trader = await Product.findOne({ createdBy });
  //     if (!trader) {
  //       return res.status(404).json({ error: 'Trader not found' });
  //     }
  //     const products = await Product.find({ createdBy: trader.fname });
  //     res.json(products);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };
  
  exports.getProductsByCreatedBy = async (req, res) => {
    try {
      const createdBy = req.params.createdBy;
      const product = await Product.find({ createdBy });

      res.send(product)
      // if (!trader) {
      //   return res.status(404).json({ error: 'Trader not found' });
      // }
      // const products = await Product.find({ createdBy: trader._id });
      // res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
   
  // Get all products
  exports.getAllProducts = async (req, res) => {
    try {
      let category = req.params.category;
      let condition = category ? {category: {$regex: new RegExp(category), $options: 'i' }} : {}
      const products = await Product.find(condition);
      // console.log(products)
      res.json(products);
    } catch (error) {

      res.status(500).json({ message:error.message });
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
      console.log(product)
    } catch (error) {
      console.error('Error retrieving product by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  
  // Update a product by ID
  exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { p_name, price, description, category, image } = req.body;
      const product = await Product.findByIdAndUpdate(
        id,
        { p_name, price, description, category, image },
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
