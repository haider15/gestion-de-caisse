
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServeurSchema = new Schema({
    firstName: {
    type: String,
    required: true,
  },
 
  cin: { 
    type: String,
    required: true,
  },
  
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});


ServeurSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
module.exports = mongoose.model("serveur", ServeurSchema);
