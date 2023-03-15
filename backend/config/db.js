import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		// const options = {
		// 	useUnifiedTopology: true,
		// 	useNewUrlParser: true,
		// 	useCreateIndex: true,
		// };
		const conn = await mongoose.connect(process.env.MONGO_URI);

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.log(`Error: ${error.message}`.red.underline.bold);
		process.exit(1);
	}
};

export default connectDB;
