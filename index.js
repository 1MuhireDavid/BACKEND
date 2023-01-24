const express = require('express');
const mongoose = require('mongoose');
const blogRoute = require('./route/blog');
const bodyParser = require('body-parser');
require('dotenv/config');
const app = express();

app.use(bodyParser.json());
app.get('/',(req,res)=>{
            res.send("This is The home page");
        })
 app.use('/posts',blogRoute);     

mongoose.set("strictQuery",true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('connected to DB'));
        
        
app.listen(3000,()=>{
            console.log('Server started on port 3000');
        })
  