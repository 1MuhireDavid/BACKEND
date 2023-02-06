const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoute = require('./route/blog');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const signinRoutes =require("./route/signin");
const signupRoutes =require('./route/signup');
const users = require('./route/user.routes')
const port = process.env.PORT || 3003;
require('dotenv/config'); 
const app = express();

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My APIs documentation',
            version: '1.0.0',
            description: 'This is my API documentation'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerformat: 'JWT',
                }
            }
        },
        securit: [{
            bearerAuth: []
        }],
        servers: [{
            url: 'http://localhost:3000'
        }]
        
    },
    apis: ['route/*.js','module/*.js'],
}
const specs = swaggerJsDoc(options)
// ROUTES 
app.use(bodyParser.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/posts',blogRoute); 
app.use("/signup", signupRoutes);
app.use("/signin", signinRoutes);
app.use("/users", users);


// ENDPOINTS 
app.get('/',(req,res)=>{
            res.status(200).send("This is The home page");
        })
      
        
module.exports = app
