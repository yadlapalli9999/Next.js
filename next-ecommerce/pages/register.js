import { Button, Input, Link, List, ListItem, TextField, Typography } from "@mui/material";
import Layout from "../components/Layout";
import NextLink from 'next/link';
import UseStyles from "../utils/styles";
import Axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";


export default function Register(){
    let router = useRouter();
    const { redirect } = router.query; // login?redirect=/shipping
    let {state,dispatch} = useContext(Store);
    let {userInfo} = state;
    useEffect(()=>{
       if(userInfo){
        router.push('/')
       }
    },[])
    let [name,setName] = useState('');
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [confirmPassword,setConfirmPassword] = useState('');

    let classes = UseStyles();
    let handleSubmitLogin = async(event)=>{
       event.preventDefault();
       if(password !== confirmPassword){
        alert('password doesn`t match')
        return;
    }
       try{
       
         let {data} = await Axios.post('/api/users/register',{name,email,password,confirmPassword})
         dispatch({type:'USER_LOGIN', payload:data})
         // dataSet = JSON.stringify(data);
         console.log(data)
         Cookies.set('userInfo',data)
         router.push(redirect || '/')
         alert('success login')
       }catch(err){
        alert(err.response.data?err.response.data.message:err.message)
       }
    }
    return(
        <Layout title="Login">
            <form className={classes.form} onSubmit={handleSubmitLogin}>
                <Typography variant="h1" component="h1">Register</Typography>
                <List>
                <ListItem>
                        <TextField variant="outlined" fullWidth id="name" label="Name" inputProps={{type:'text'}} onChange={e=>setName(e.target.value)}></TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" fullWidth id="email" label="Email" inputProps={{type:'email'}} onChange={e=>setEmail(e.target.value)}></TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" fullWidth id="password" label="Password" inputProps={{type:'password'}} onChange={e=>setPassword(e.target.value)}></TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" fullWidth id="confirmpassword" label="ConfirmPassword" inputProps={{type:'password'}} onChange={e=>setConfirmPassword(e.target.value)}></TextField>
                    </ListItem>
                    <ListItem>
                        <Button type="submit" variant="contained" fullWidth color="primary">Register</Button>
                    </ListItem>
                    <ListItem>
                       Already have an account?&nbsp; <NextLink href={`/login/redirect=${redirect || '/'}`} passHref><Link>Login</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}