const express = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrupt = require("bcryptjs");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// these routes helps user to register in essence sign up and it is post request it is public

//user model

routes.post(
	"/",
	[
		check("name", "Name is required").notEmpty(),
		check("email", "Invalid email").isEmail(),
		check("password", "Password must be 6 characters").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ message: "user already exist" });
			}
			user = new User({ name, email, password });
			console.log(user);
			const salt = await bcrupt.genSalt(10);
			user.password = await bcrupt.hash(user.password, salt);
			await user.save();
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				config.get("secret"),
				{ expiresIn: 36000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("error in server");
		}
	}
);

module.exports = routes;
