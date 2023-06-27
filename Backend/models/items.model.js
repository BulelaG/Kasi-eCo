// const mongoose = require("mongoose");

module.exports = mongoose => {

 const schemaItem = mongoose.Schema({

   item_name: {
      type: String,
      require: true
   },
   desc:{
      type: String,
      require: true
   },
   seller:{
      type: String,
      require: true
   },
   img: {
    type: String,
    required: false,
  }
  });

    schemaItem.method("toJSON", function() {
                const{__v, _id, ...object } = this.toObject();
                object.id = _id;
                return object;

    });

let Item = mongoose.model('Item', schemaItem);
return Item


}

