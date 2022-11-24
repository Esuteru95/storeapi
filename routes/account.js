import express  from "express";
const router = express.Router();

import bcryptjs from "bcryptjs";
import Account from '../models/account.js';

//CRUD::CREATE read Update Delete

//CREATE NEW ACCOUNT 18.11

router.post('/create_new_account',async(req,res)=>{
       //Get user data
        const {firstname, lastname, email, password} = req.body;
       //Check if user exist
        Account.findAll({where:{email:email}})
        .then( async account=>{
    
            if(account.length==0){
              //Crypt username password
              const hash = await bcryptjs.hash(password, 10);
             //Create new account
              Account.create({
              firstname:firstname,
              lastname:lastname,
              email:email,
              password:hash,
              isApproved: false
              })
             .then(account_created=>{
                 return res.status(200).json({
                message:account_created
              })
             })
             .catch(error=>{
                return res.status(500).json({
                message:error
              })
             })
            }
           else{
                return res.status(200).json({
                message:'Account not available'
                 })
            }
    
        })
         .catch(error=>{
           return res.status(500).json({
           message:error.message
           })
        })
})

//VERIFY 20.11
// router.put('/verify',async(req,res)=>{
//     const {email,code}=req.body;
//     Account.findAll({where:{email:email}})
//     .then(accounts => {
//         if(accounts.length==0){
//             return res.status(200).json({
//                 message:'Account not exist'
//             })
//         }
//         else{
//             const user = accounts[0]
//             if(code== user.passcode){
//                 user.isApproved = true;
//                 user.save()

//             }
//             else{
//                 return res.status(500).json({
//                     message:error.message
//                 })
//             }
//         }
//     })
//     .catch()
// })

//GET ALL ACCOUNTS 18.11
router.get('/get_all_users', async(req,res)=>{
Account.findAll()
.then(allusers=>{
return res.status(200).json({
    message:allusers
})
})
.catch(error=>{
    return res.status(500).json({
        message: error.message
    })
})
})

//UPDATE ACCOUNT 20.11
// router.put('/update_account',async(req,res)=>{
//     const {id, firstname, lastname}=req.body;
//     Account.findByPk(id)
//     .then(account =>{
//         account.firstname = firstname;
//         account.lastname = lastname;
//         account.save()
//         .then(account_updated=>{})
//         .catch(error=>{

//         })
//     })
//     .catch(error=>{
//         return res.status(500).json({
//             message:error.message
//         })
//     })
// })

//DELETE ACCOUNT. "id" שם המשתנה 20.11
// router.delete('/delete_account/:id',async(req,res)=>{
// const id = req.params.id;
// Account.findByPk(id)
// })

export default router;