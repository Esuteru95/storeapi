//zoom 18.11 and 20.11

import  express  from 'express';
import bodyParser from 'body-parser';

//IMPORT API CONTROLLERS
import Accounts from './routes/account.js';
import Store from './routes/store.js';
import Company from './routes/company.js';
import Category from "./routes/category.js"; 


//IMPORT ADMIN CONTROLLERS
 import Admin from './controllers/admin.js'


import Database from "./database.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

// CREATE APP
const app = express();
app.use(bodyParser.urlencoded({extended:false}));

//USE
app.use(express.json());

app.set('view engine','ejs');
app.set('views','views');




const options ={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Store API Endpoints',
            version:'1.0.0'
        },
        servers:[
            {
                url:'http://localhost:3001'
            }
        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:'http',
                    scheme:'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security:[
            {
            bearerAuth: []
            }
        ]
    },
    apis:['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-doc',swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerSpec));

app.use('/api/company',Company)
app.use('/api/category',Category)
app.use('/api/account',Accounts);
app.use('/api/store',Store);

app.use('/admin',Admin)


//ROUTE
const port =3001;

Database
.sync()
.then(results =>{
    console.log(results)
    app.listen(port,function(){
        console.log(`Server is running via port ${port}`)
    })
})
.catch(error=>{
    console.log(error)
})

