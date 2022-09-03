import User from "../../../models/users/User";
import { errorHander, responseHander, validateAllOnce } from "../../../util/common";
import {dbConncet} from '../../../util/index'
import bcrypt from 'bcrypt';

export default async function handler(req,res){
   
   if(req.method == 'POST'){
      // return error
      errorHander("Invalid request Type",res)
   }
   else{
    try{
      const {name,email,password} = req.body;
      validateAllOnce(req.body)

      //create DB connection
      await dbConncet()

      const hashPassword = await bcrypt.hash(password,8);

      const user = new User({
        ...req.body,
        password:hashPassword
      });
      const saveUser = await user.save();
      if(saveUser){
          const userDOc = saveUser._doc;
          delete userDOc.password
          responseHander(userDOc,res,201)

        //responseHander(saveUser,res,201)
      }
      else{
        errorHander("Something went wrong",res)
      }
   }
   catch(error){
     errorHander(error,res)
   }
}
}