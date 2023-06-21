module.exports = mongoose => {
const traderSchema = new mongoose.Schema({


    fname: {
        type: String,
        require: true
     },
     email:{
        type: String,
        require: true
     },
     password:{
        type: String,
        require: true
     },

    // Additional fields specific to traders
    businessName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
   
});

 traderSchema.method("toJSON", function() {
        const{__v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
       });


let Trader = mongoose.model('Trader', traderSchema);
return Trader

}