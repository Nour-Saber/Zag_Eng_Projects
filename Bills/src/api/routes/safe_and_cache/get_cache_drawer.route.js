import {Router} from 'express';
import { CacheDrawer } from '../../models/cache drawer/cache drawer.model.js';
const router = Router();
 
const initializeCacheDrawer = async() =>{
  const existing = await CacheDrawer.findOne();
  if (!existing) {
    await CacheDrawer.create({ balance: 0 }); 
    
  }
}
initializeCacheDrawer();
const ShowCache = async (req,res)=>{
    try{
       const cacheDrawer = await CacheDrawer.findOne();
       res.status(200).json({data:cacheDrawer});
    }
    catch(err)
    {
     res.status(500).json({msg:err.message});
    }
}
router.get('/',ShowCache);
export {router as CacheDrawerRouter};