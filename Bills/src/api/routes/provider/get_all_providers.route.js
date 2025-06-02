import { Router } from "express";
import { Provider } from "../../models/provider/providers.model.js";
const router = Router();
const GetAllProviders = async(req,res)=>{
    try{
      const providers= await Provider.find({is_deleted:false});
      res.status(200).json({data:providers})
    }
    catch(err)
    {
 res.status(500).json({msg:err.message})
    }
}
router.get('/',GetAllProviders);
export {router as GetAllProvidersRouter}