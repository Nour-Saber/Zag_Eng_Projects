import { UnAuthorizedError } from "../errors/Errors.js";

export const authorize = (roles)=>{
    return async (req,res,next)=>{
        try{
         const role=req.user.role;
         if(!roles.includes(role))
            throw new UnAuthorizedError("UnAuthorized : Access denied!");
        next();
        }
        catch(err)
        {
            res.status(err.status_code ||500 ).json({message:err.message});
        }
    }
}
