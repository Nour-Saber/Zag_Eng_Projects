import { Router } from "express";
import { User } from "../../models/users/user.model.js";
import { BadRequestError } from "../../../core/errors/Errors.js";
import { comparePassword } from "../../../core/services/password.services.js";
import { generateToken } from "../../../core/services/jwt.services.js";

const router = Router();
const login = async (req,res)=>{
    try{
     const data=req.body;
     const email=data.email;
     const user= await User.findOne({email:email});
     if(!user)
        throw new BadRequestError("Invalid email or password !")
    const password = data.password;
    const match =comparePassword(password,user.password);
    if(!match)
        throw new BadRequestError("Invalid email or password !")
     const token = generateToken(user.name,user.email,user._id);
     res.status(200).json({
        data:user,
        token:token
     })

    }
    catch(err)
    {
      res.status(err.status || 500).json({message:err.message})
    }

}
router.post('/login',login);
export {router as loginRouter}