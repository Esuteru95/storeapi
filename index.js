//zoom 18.11 and 20.11

import  express  from "express";
import Accounts from './routes/account.js';
import Store from './routes/store.js';
import Database from "./database.js";

//CREATE APP
const app = express();


//USE
app.use(express.json());
app.use('/api/account',Accounts);
app.use('/api/store',Store);


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

