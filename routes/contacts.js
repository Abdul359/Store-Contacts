const express = require("express");
const routes = express.Router();
const Contact = require("../models/Contact");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// you know these all CRUD
routes.get("/", auth, async (req, res) => {
	try {
		const foundContacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(foundContacts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("server error");
	}
});

routes.post(
	"/",
	[auth, [check("name", "Name is required").notEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, phone, type } = req.body;
		try {
			const addedContact = await new Contact({
				name,
				email,
				type,
				phone,
				user: req.user.id,
			});
			const savedContact = await addedContact.save();
			res.json(savedContact);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("server error");
		}
	}
);
routes.put("/:id", auth, async (req, res) => {
	const { name, email, phone, type } = req.body;
	const tailoredContact = {};
	if (name) tailoredContact.name = name;
	if (email) tailoredContact.email = email;
	if (phone) tailoredContact.phone = phone;
	if (type) tailoredContact.type = type;
	try {
		const foundContact = await Contact.findById(req.params.id);
		if (!foundContact)
			return res.status(404).json({ message: "contact not found" });

		if (foundContact.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ message: "unauthorized to change contact" });
		}
		const updatedContact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: tailoredContact },
			{ new: true }
		);
		res.json(updatedContact);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("server error");
	}
});
routes.delete("/:id", auth, async (req, res) => {
	try {
		const foundContact = await Contact.findById(req.params.id);
		if (!foundContact)
			return res.status(404).json({ message: "contact not found" });
		if (foundContact.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ message: "unauthorized to change contact" });
		}
		const deletedContact = await Contact.findByIdAndDelete(req.params.id);
		// console.log(deletedContact);
		res.json({ message: "contact deleted" });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("server error");
	}
});

module.exports = routes;
