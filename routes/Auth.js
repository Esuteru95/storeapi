import jwt from 'jsonwebtoken';
import Account from '../models/account.js';


export default (req,res,next) =>{
    const header = req.headers['authorization'];
    if(header){

        //פונקציה מחלקת מחרוזת לשני ובונה מהן מערך
        const bearer = header.split(' ');
        //נתונים באינדק השני במערך היוצר
        const token = bearer[1];

        // -חייב להיות אותו מפתח כמן ב
        //LOGIN
        jwt.verify(token,'DfGry345GF56OOFr0', (err,authdata)=>{
            if(err){
                return res.sendStatus(403);
            }
            else{
                Account.findByPk(authdata.data.id)
                .then(user=>{
                    req.account = user;
                    next();
                })
                .catch(error=>{
                    return res.status(500).json({
                        message:error.message
                    })
                })
            }
        })
    }
    else{
        return res.sendStatus(403);
    }
}