const connectToMongo= require('./db');
const cors=require('cors');
connectToMongo();
const express=require('express');
const app=express();

const port=5000;

//routers available
app.use(express.json());        //this is middleware to change input into json format
app.use(cors());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port,()=>{
    console.log(`succeccfully listend at port ${port} !!`);
})