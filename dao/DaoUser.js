const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const dotenv = require("dotenv");

dotenv.config();

var userSchema = mongoose.Schema(
	{
		telephone: {
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: true,
		},
		ville: String,
		genre: String,
		typeuser: { type: String, default: "client" },
		age: String,
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: { createdAt: "created_at" } }
);

userSchema.methods = {
	authenticate: function (password) {
		return passwordHash.verify(password, this.password);
	},
	getToken: function () {
		return jwt.encode(this, process.env.TOKEN_SECRET);
	},
};

module.exports = mongoose.model("User", userSchema);
