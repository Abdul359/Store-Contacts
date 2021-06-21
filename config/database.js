const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongo");

const connectDatabase = () => {
	mongoose
		.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(() => {
			console.log("connected to mongooose");
		})
		.catch((err) => {
			console.log("Not connected");
			console.log(err);
		});
};

// const connectDatabase = async () => {
//   try {
//     await mongoose.connect(db, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("connected to mongooose");
//   } catch (error) {
//     console.log("Not connected");
//     console.log(err);
//   }
// };
module.exports = connectDatabase;
