import express  from "express";
const router = express.Router();
import bcryptjs from "bcryptjs";
import Account from '../models/account.js';
import jwt from 'jsonwebtoken';
import isAuth from '../routes/Auth.js';


//the connection to the DB CREATE
/**
 * @swagger
 * definitions:
 *  Account:
 *   type: object
 *   properties:
 *    firstname:
 *     type: string,
 *     description: The First Name
 *     example: Petr
 *    lastname:
 *     type: string,
 *     description: The Last Name
 *     example: Petrov
 *    email:
 *     type: string,
 *     description: The e-mail
 *     example: your email
 *    password:
 *     type: string,
 *     description:  your password
 *     example: 2237
 */


//swag VERIFY DB
/**
* Verify:
*  type: object
*  properties:
*   email:
*    type: string
*    example: eli@qwamo.com
*   code:
*    type: int
*    example: 1111
*/



// swagger CREATE
/**
 * @swagger
 * /api/account/create_new_account:
 *  post:
 *   summary: Create new account
 *   description: Use this route to create new account
 *   tags: [ACCOUNT]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Account'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Error in operation
 */
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


//swagger VERIFY
/**
 * @swagger
 * /api/account/verify:
 *  put:
 *   summary: Verify new account
 *   description: Use this route to verify new account
 *   tags: [ACCOUNT]
 *   requestBody: 
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Verify'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Error in operation
 */

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
              if(code == user.passcode){
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


 //LOGIN 25.11 (01:10:50)
 router.post('/login',async(req,res)=>{
        //Get data
        const {email, password}=req.body;
        //Check if exist
        Account.findAll({where:{email:email}})
        .then(async accounts=>{
            if(accounts.length>0){
                const user = accounts[0];
                //Check password
                const isMatch = await bcryptjs.compare(password,user.password);
                if(isMatch)
                {
                 //Check if account verified
                    if(user.isApproved)
                    {
                        //Create_Token
                        const data={
                         id:user.id,
                         name:user.firstname+' '+user.lastname,
                         email:user.email
                        }
                        //RESPONSE
                        //פרמטר שני הוא המפתח של הטוקאן
                        const token=await jwt.sign({data},'DfGry345GF56OOFr0');
                        return res.status(200).json({
                            user: user,
                            token:token
                        })
                    }
                    else{
                        return res.status(200).json({
                         message:'Account was not verified'
                        })
                    }
                }
                else{
                    return res.status(200).json({
                        message:'Password not match'
                    })
                }
            }
            else{
                return res.status(200).json({
                    message:'Account not found'
                })
            }
        })
        .catch(error=>{
            return res.status(500).json({
                message:error.message
            })
        })
 })


//GET ALL ACCOUNTS 18.11

//swagger GET
/**
 * @swagger
 * /api/account/get_all_users:
 *  get:
 *   summary: Get a list of all users
 *   description: This is some description about getting all users
 *   tags: [ACCOUNT] 
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *    500:
 *     description: error in this operation   
 */
router.get('/get_all_users', isAuth, async(req,res)=>{

  console.log('Everifing is okay '+ req.account.firstname)
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
 router.put('/update_user', isAuth, async(req,res)=>{

    const id=req.account.id;

     const {firstname, lastname}=req.body;
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
 router.delete('/delete_account/:id',isAuth, async(req,res)=>{
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