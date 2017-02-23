var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')
// Define our client schema
var clientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  id: String,
  secret: String,
  redirectUrl : String,
 });
clientSchema.methods.validateClient = function (secret) {
  //return this.AdminPassword === password;
 // return password == this.password;
  return bcrypt.compareSync(secret, this.secret);
};
// generating a hash
clientSchema.methods.generateHash = function(secret) {
    return bcrypt.hashSync(secret, bcrypt.genSaltSync(), null);
};

// Export the Mongoose model
module.exports = mongoose.model('Client', clientSchema);