import React,{useState,useEffect} from "react";
import { useRouter } from "next/router";
import {Confirm,Button,Grid,Card} from 'semantic-ui-react';
import Error from "next/error";

const TaskId = ({task,error})=>{
   const [confirm,setConfirm] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const {push,query} = useRouter;

   const deletTask = async ()=>{
    const {id} = query;
    try{
        await fetch(`http://localhost:3000/api/tasks/${id}`,{method:'DELETE'})
    }catch(error){
        console.log(error)
    }
   }

   const open = ()=>setConfirm(true)
   const close = ()=>setConfirm(false)
   const handleDeleted= async ()=>{
    setIsDeleting(true),
    deletTask();
    push("/")
    close()
   }
   if(error && error.statusCode){
    return <Error statusCode={error.statusCode} title={error.statusText}/>
   }
   return(
    <Grid centered verticalAlign="middle" columns="1" style={{height:"80vh"}}>
        <Grid.Row>
            <Grid.Column textAlign="center">
                <Card centered>
                    <Card.Content>
                        <Card.Header>
                            {task.title}
                        </Card.Header>
                        <Card.Description>
                            {task.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button color="red" onClick={open} loading={isDeleting}>Delete</Button>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Confirm content="Are you sure to delete that task?" header="Please Confirm" open={confirm} onConfirm={handleDeleted} onCancel={close}/>
        </Grid.Row>
    </Grid>
   )
}
export default TaskId

export async function getServerSideProps({query:{id}}){
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
    if(response.status === 200){
        const task = await response.json();
        return{
            props:{
                task
            }
        }
    }
    return{
        props:{
            error:{
                statusCode:response.status,
                statusText:"InvalidID"
            }
        }
    }
}