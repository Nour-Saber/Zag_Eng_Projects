import {Router} from 'express'
import { Safe } from '../../models/safe/safe.model.js';
const router = Router ();
const initializeSafe = async()=>{
    const existing = await Safe.findOne();
    if(!existing)
        await Safe.create({balance:0});

}
initializeSafe();

const ShowSafe = async (req,res)=>{
    try{
       const safe = await Safe.findOne();
       res.status(200).json({data:safe});
    }
    catch(err)
    {
     res.status(500).json({msg:err.message});
    }

} 
router.use('/',ShowSafe);
export {router as SafeRouter};
