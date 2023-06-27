const mongoose = require('mongoose')
//const dbConfig = require('../config/db.config');

mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;
db.user = require("./user.model")(mongoose);
db.trader = require("./trader.model")(mongoose);
db.customer = require("./customer.model")(mongoose);
db.products = require("./products.model")(mongoose);
db.orders = require("./orders.model")(mongoose);
db.items = require("./items.model")(mongoose);



module.exports = db;