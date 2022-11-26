import mongoose from "mongoose";

const database = async () => {
  try {
    const db = await mongoose.connect(`${process.env.MONGO_CLUSTER}`);
    console.log(db.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default database;
