import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'

import 'dotenv/config'
const app = express();

app.listen( process.env.PORT,()=>
    {console.log(`Listen on port ${ process.env.PORT}`)}
)
const connectToDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("connected to DB !");
  } catch (err) {
    console.log(err.message);
  }
};
connectToDB();
app.use(morgan("dev"));
app.use(express.json());