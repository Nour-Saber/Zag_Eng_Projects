import { Router } from "express";
import { Category } from "../../models/categories/category.model.js";

const router = Router();

const GetAllCategories = async (req,res)=>{
    try{
        const categories = await Category.find({is_deleted:"false"});
       
        res.status(200).json({message:"Categories found successfully !",data:categories})
    }
    catch(err)
    {
      res.status(500).json({message:err.message});
    }

}
router.get('/get_all',GetAllCategories)
export {router as GetAllCategoriesRouter}