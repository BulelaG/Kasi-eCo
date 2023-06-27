const db = require("../models")
const Trader = db.trader
const bcrypt = require('bcrypt');



// Traders

// Create a new trader
exports.createTrader = async (req, res) => {
  try {
    const { email, password, fname, businessName, address } = req.body;
    // salt and hashed the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const trader = new Trader({
      email,
      password: hashedPassword,
      fname,
      businessName,
      address
    });
    
    await trader.save();
    res.status(201).json({ message: 'Trader created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Trader signin
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the trader by email
    const trader = await Trader.findOne({ email });

    if (!trader) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, trader.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Add your authentication logic here (e.g., generating a token)

    res.json({ message: 'Signin successful', trader });
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
  