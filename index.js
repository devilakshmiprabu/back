import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/myrouter.js';  // Importing user routes

const app = express();
dotenv.config();

app.use(bodyParser.json());  // Parsing incoming JSON requests

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })  // Connect to MongoDB
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));

// Use the user routes
app.use('/api/user', userRoutes);