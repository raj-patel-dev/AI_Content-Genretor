import mongo from "mongoose";
import dns from  "node:dns/promises";
dns.setServers(["1.1.1.1"]);
const connectDB = async () => {
    try{
        const uri = process.env.MONGO_URI;
        const conn = await mongo.connect(uri);
        console.log(`Mongodb connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error connecting to MongoDB : ${error.message}`);
    }
};

export default connectDB;