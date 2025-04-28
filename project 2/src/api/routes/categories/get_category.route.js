import {Router} from 'express'
import { Category } from '../../models/categories/category.model.js';
import { NotFoundError } from '../../../core/errors/Errors.js';
const router = Router();
const GetOneCategory = async(req,res)=>{
    try{
    const {id} = req.params;
    const category= await Category.findOne({_id:id,is_deleted:false});
    if(!category)
        throw new NotFoundError ();
    res.status(200).json({
        data:category
    })
}
catch(err)
{
    res.status(err.status_code).json({message:err.message});
}
}
router.get('/:id',GetOneCategory)
export {router as GetOneCategoryRouter};