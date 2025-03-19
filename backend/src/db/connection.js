import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.log(error, "❌ MongoDB Connection Error:")
        throw new Error("Cannot Connect To MongoDB");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("💥 MongoDB Disconnected from MongoDB");
    } catch (error) {
        console.log(error, " ❌ MongoDB Disconnection Error:");
        throw new Error("Could not Disconnect From MongoDB")
    }
}

export { connectToDatabase, disconnectFromDatabase }

