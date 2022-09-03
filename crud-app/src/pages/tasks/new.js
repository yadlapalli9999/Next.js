import react,{useState,useEffect} from "react";
import {Button,Form,Grid,Loader} from 'semantic-ui-react';
import { useRouter } from "next/router";

const CreateTask = () =>{
    const [newTask,setNewTask] = useState({
        title:'',
        description:''
    })
    const {push,query} = useRouter();
    const [isSubmit,setIsSubmit] = useState(false)
    const [errors,setErrors] = useState({})
    const handleChange = (event)=>{
        const {name,value} = event.target;
        setNewTask({...newTask,[name]:value})
    }
    const validate = () =>{
        let errors = {};
        if(!newTask.title){
            errors.title = "Title is Required"
        }

        if(!newTask.description){
          errors.description = "Description is Required"
        }
        return errors
    }
    const handleSubmit = (event) =>{
      event.preventDefault();
      let errors = validate();
      if(Object.keys(errors).length) return setErrors(errors)
      setIsSubmit(true)
      if(query.id){
         updateTask()
      }else{
         createTask();
      }
      push('/')
    }

    const createTask = async ()=>{
        try{
            await fetch(`http://localhost:3000/api/tasks`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newTask)
            })
        }
        catch(error){
            console.log(error)
        }
    }

    const getTask = async ()=>{
        const response = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
        const data = await response.json()
        setNewTask({title:data.title,description:data.description})
    }
    useEffect(()=>{
       if(query.id) getTask()
    },[query.id])
    const updateTask = async ()=>{
        try{
            await fetch(`http://localhost:3000/api/tasks/${query.id}`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newTask)
            })
        }catch(error){
            console.log(error)
        }
    }
    return(
       <Grid centered verticalAlign="middle" columns="3" style={{height:"80vh"}}>
          <Grid.Row>
            <Grid.Column textAlign="center">
               <div>
                   <h1>Create Task</h1>
                   <div>
                    {
                        isSubmit?(<Loader active inline="centered"/>):
                        <Form onSubmit={handleSubmit}>
                            <Form.Input error={errors.title? {content:'Please enter title'}:null} label="Title" placeholder="Enter Title" name="title" onChange={handleChange}
                            value={newTask.title} autoFocus/>
                            <Form.TextArea error={errors.description? {content:'Please enter description'}:null}  label="Description" placeholder="Enter Description" name="description" onChange={handleChange} value={newTask.description}
                            autoFocus/>
                            <Button type="submit" primary>Submit</Button>
                        </Form>
                    }
                   </div>
               </div>
            </Grid.Column>
          </Grid.Row>
       </Grid>
    )
}

export default CreateTask;