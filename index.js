const express = require("express");
const connectDatabase = require("./config/database");
const path = require("path");
const app = express();

app.use(express.json({ extended: false }));
connectDatabase();
app.use("/store/users", require("./routes/users"));
app.use("/store/contacts", require("./routes/contacts"));
app.use("/store/auth", require("./routes/auth"));

//server static assessts in production

// if (process.env.NODE_ENV === "production") {
// 	//set static folder
// 	app.use(express.static("client/build"));

// 	app.get("*", (req, res) =>
// 		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
// 	);
// }
if (process.env.NODE_ENV === "production") {
	// set static folder for render in client side
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
