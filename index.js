const express = require('express');
const mongoose = require('mongoose');
const blogRoute = require('./route/blog');
const bodyParser = require('body-parser');
const signinRoutes =require("./route/signin");
const signupRoutes =require('./route/signup');
const port = 3000;
require('dotenv/config'); 
const app = express();

// ROUTES 
app.use(bodyParser.json());
app.use('/posts',blogRoute); 
app.use("/signup", signupRoutes);
app.use("/signin", signinRoutes);


// ENDPOINTS 
app.get('/',(req,res)=>{
            res.status(200).send("This is The home page");
        })

mongoose.set("strictQuery",true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('connected to DB'));
        
        
app.listen(port,()=>{
            console.log(`Server started on ${port}`);
        })