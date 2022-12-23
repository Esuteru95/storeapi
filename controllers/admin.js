import express  from "express";
const router = express.Router();
import Category from "../models/category.js"

router.get('/', async(req,res)=>{

    const students=[
        {
            name:'Tali'
        },
        {
            name:'Esther'
        },
        {
            name:'Bushra'
        }
    ]

    res.render('index',{
        students: students
    })
})

router.get('/store', async(req,res)=>{
    res.render('store',{
        student_name: 'Sveta',
        day:'Sunday'
    })
})


router.post('/create_new_category',async(req,res)=>{
     //Get category data
     const categoryname = req.body.categoryname;
          //Create new category   
           Category.create({
           categoryname:categoryname,
           })
          .then(category_created=>{
             res.redirect('/admin')
           })
        
          .catch(error=>{
              console.log(error.message);
              res.redirect('/admin');
          })
      })

export default router;