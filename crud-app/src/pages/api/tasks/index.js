import Task from '../../../Model/Task';
import { dbConncet,runMiddleware } from '../../../util/index';
import Morgan from 'morgan';
dbConncet();

export default async(req,res)=>{
    const {method,body} = req;
    const morgan = Morgan("dev")

    switch(method){
        case "GET":
            try{
                const tasks = await Task.find();
                await runMiddleware(req,res,morgan)
                return res.status(200).json(tasks)
            }
            catch(error){
               return res.status(400).json({msg:error.message})
            }
        case "POST":
            try{
                const newTask = new Task(body);
                const savedTask = await newTask.save();
                await runMiddleware(req,res,morgan)
                return res.status(200).json(savedTask)
            }  
            catch(error){
                return res.status(400).json({msg:error.message})
            }
        default: return res.status(400).json({msg:"This method is not supported"})    
    }
}