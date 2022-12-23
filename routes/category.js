import express  from "express";
const router = express.Router();
import Category from '../models/category.js'

//CREATE NEW CATEGORY 18.11
router.post('/create_new_category',async(req,res)=>{
    //Get category data
     const {categoryname} = req.body;
    //Check if category exist
     Category.findAll({where:{categoryname:categoryname}})
     .then( async category=>{
 
         if(Category.length==0){
          //Create new category   
           Category.create({
           categoryname:categoryname,
           
           })
          .then(category_created=>{
              return res.status(200).json({
             message:category_created
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
             message:'Category exists'
              })
         }
 
     })
      .catch(error=>{
        return res.status(500).json({
        message:error.message
        })
     })
})

export default router;
