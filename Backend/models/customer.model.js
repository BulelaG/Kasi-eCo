module.exports = mongoose => {
const customerSchema = new mongoose.Schema({


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

    // Additional fields specific to customers
    deliveryAdress: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    }
    
});

    customerSchema.method("toJSON", function() {
        const{__v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
       });

let Customer = mongoose.model('Customer', customerSchema);
return Customer

}