import express  from "express";
const router = express.Router();
import Company from '../models/company.js'
import Category from '../models/category.js'

//the connection to the database
/**
 * @swagger
 * definitions:
 *  Company:
 *   type: object
 *   properties:
 *    companyname:
 *     type: string,
 *     description: The name of the company
 *     example: Fashion
 *    logo:
 *     type: string,
 *     description: The logo of the company
 *     example: F
 *    email:
 *     type: string,
 *     description: The e-mail
 *     example: The email of the company
 *    city:
 *     type: string, 
 *     description: The name of the city
 *     example: Tokyo
 *    phone:
 *     type: string,
 *     description: The phone number
 *     example: 053-764-34-64
 *    bio:
 *     type: string,
 *     description: Here is bio
 *     example: Here is bio of company
 *    categoryID:
 *     type: integer,
 *     description: The category ID
 *     example: 2237
 */

//swagger CREATE
/**
 * @swagger
 * /api/company/create_new_company:
 *  post:
 *   summary: Create new company
 *   description: Use this route to create new company
 *   tags: [COMPANY]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Company'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Error in operation
 */




//CREATE NEW COMPANY 18.11
router.post('/create_new_company',async(req,res)=>{
    //Get company data
     const {companyname, logo, email, city, phone, bio, categoryID} = req.body;
    //Check if company exist
     Company.findAll({where:{companyname:companyname}})
     .then( async company=>{
 
         if(company.length==0){
          //Create new company   
           Company.create({
           companyname:companyname,
           logo:logo,
           email:email,
           city:city,
           phone: phone,
           bio: bio,
           categoryID: categoryID
           })
          .then(company_created=>{
              return res.status(200).json({
             message:company_created
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
             message:'Company exists'
              })
         }
 
     })
      .catch(error=>{
        return res.status(500).json({
        message:error.message
        })
     })
})


//swagger get
/**
 * @swagger
 * /api/company/get_all_companies:
 *  get:
 *   summary: Get a list of all companies
 *   description: This is some description about getting all companies
 *   tags: [COMPANY]
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


//GET ALL COMPANIES
router.get('/get_all_companies', async(req,res)=>{
    Company.findAll()
    .then(allcomp=>{
        return res.status(200).json({
         message:allcomp
        })
    })
    .catch(error=>{
        return res.status(500).json({
         message: error.message
        })
    })
})


export default router;