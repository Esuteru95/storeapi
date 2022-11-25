import express  from "express";
const router = express.Router();
import bcryptjs from "bcryptjs";
import Account from '../models/account.js';
import jwt from 'jsonwebtoken';

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
              const code = generateRandomIntegerInRange(1000,9999);
             //Create new account
              Account.create({
              firstname:firstname,
              lastname:lastname,
              email:email,
              password:hash,
              isApproved: false,
              passcode: code
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
                message:'Account exists'
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
  router.put('/verify',async(req,res)=>{
      const {email,code}=req.body;
      Account.findAll({where:{email:email}})
      .then(accounts => {
          if(accounts.length==0){
              return res.status(200).json({
                  message:'Account not exist'
              })
          }
          else{
              const user = accounts[0]
              if(code== user.passcode){
                  user.isApproved = true;
                  user.save()
                  .then(verified=>{
                      return res.status(200).json({
                             message: verified
                      })
                   })
              }
              else{
                  return res.status(500).json({
                      message:'Code not match'
                  })
              }
          }
      })
      .catch(error=>{
        return res.status(500).json({
           message:error.message
        })
      })
  })


 //LOGIN 25.11
// router.post('/login',async(req,res)=>{
        //Get data
        //Check if exist
        //Check password
        //Check if account verified
        //Create Token
        //Response
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
 router.put('/update_user',async(req,res)=>{
     const {id, firstname, lastname}=req.body;
     //חיפוש דרך .י.ד. בשביל דוגמה  בלבד, בתכנות לא עושים  ככה!!!
     Account.findByPk(id)
     .then(account =>{
         account.firstname = firstname;
         account.lastname = lastname;
         account.save()
         .then(account_updated=>{
            return res.status(200).json({
                message:account_updated
            })

          })
         .catch(error=>{
                return res.status(500).json({
                    message:error.message
                })
         })
     })
     .catch(error=>{
         return res.status(500).json({
             message:error.message
         })
     })
 })

//DELETE ACCOUNT. "id" שם המשתנה 20.11
 router.delete('/delete_account/:id',async(req,res)=>{
    const id = req.params.id;
    Account.findByPk(id)
    .then(account =>{
         account.destroy()
         .then(removed =>{
            return res.status(200).json({
                message:'Account removed from DB'
            })
         })
    })
    .catch(error=>{
               return res.status(500).json({
                   message:error.message
               })
       
    })
 })

 //GET ACCOUNT BY ID
 router.get('/getAccountById/:accountId', async(req,res) => {
    const id = req.params.accountId;
    Account.findByPk(id)
    .then(account => {
        return res.status(200).json({
            message: account
        })
    })
    .catch(error=>{
        return res.status(500).json({
            message: error.message
        })
    })
 })





//פונקציה חצונית(RANDOM!)
function generateRandomIntegerInRange(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}



export default router;