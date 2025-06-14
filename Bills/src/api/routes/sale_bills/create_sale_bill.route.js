import {Router} from 'express';
import { SaleBill } from '../../models/bills/sale_bill.model.js';
import { BadRequestError } from "../../../core/errors/errors.js";
const router = Router();
const CreateSaleBill = async (req,res)=>{
    try{
      const data = req.body;
      const newSaleBill = await SaleBill({...data});
      if(!newSaleBill)
        throw new BadRequestError("Bill not created!")
      await newSaleBill.save();
    res.status(200).json({msg:"Bill created successfully!",data:newSaleBill });
    }
    catch(err)
    {
      res.status(err.status_code || 500).json({msg:err.message});
    }

}
router.post('/',CreateSaleBill);
export {router as CreateSaleBillRouter}


