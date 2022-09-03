import Task from '../../../Model/Task';
import { dbConncet,runMiddleware } from '../../../util/index';
import Morgan from 'morgan';
dbConncet();

export default async(req,res)=>{
    const {method,body,query:{id}} = req;
    const morgan = Morgan("dev")

    switch(method){
        case "GET":
            try{
                const task = await Task.findById(id);
                if(!task) return res.status(404).json({msg:"Task doen't exist"})
                await runMiddleware(req,res,morgan)
                return res.status(200).json(task)
            }
            catch(error){
               return res.status(400).json({msg:error.message})
            }
            
        case "DELETE":
            try{
                const deleteTask = await Task.findByIdAndDelete(id);
                if(!deleteTask) return res.status(404).json({msg:"Task doen't exist"})
                await runMiddleware(req,res,morgan)
                return res.status(200).json()
            }  
            catch(error){
                return res.status(400).json({msg:error.message})
            }
        case "PUT":
            try{
               const updateTask = await Task.findByIdAndUpdate(id,body,{
                new:true,
                runValidators:true
               })
               if(!updateTask) return res.status(404).json({msg:"Task doesn't exist"})
               return res.status(200).json(updateTask)
            }   
            catch(error){
                return res.status(400).json({msg:error.message})
            }   
        default: return res.status(400).json({msg:"This method is not supported"})    
    }
}