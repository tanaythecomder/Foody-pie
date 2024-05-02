const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;
const mongoose = require('mongoose')
const connectDB = require('./db')
require('dotenv').config()

connectDB();
app.use(cors({
    origin: '*'
}));
// app.use((req,res, next)=>{
//     // console.log('In 1')
//     // console.log(process.env.SECRETKEY )
//     res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173")
//     res.header(
//         "Access-Control-Allow-Headers",
//         "*"
//     )
//     next();
// })

app.use(express.json());

app.get('/', (req,res)=>{
    res.json('Hello World')
})

app.use('/api', require('./router/loginUser'));
app.use('/api', require('./router/createUser') );
app.use('/api', require('./router/getFooddata') );
app.use('/api', require('./router/orderData'));
app.use('/api', require('./router/orderHistory'))
app.listen(port, ()=>{
    console.log(`Listening on port : ${port}`)
})