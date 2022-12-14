import express from 'express'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config()
const app = express()
const port = process.env.PORT || 8080
const mongoUri = process.env.MONGO_URI

// connect to database
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to database successfully!`))
    .catch(err => console.log(err))

// enable parsing data    
app.use(express.json());

// middleware
app.use(express.urlencoded({ extended: true }));

// route
app.use("/api/v1/user", userRoutes)



// create server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})