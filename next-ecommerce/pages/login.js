import { Button, Input, Link, List, ListItem, TextField, Typography } from "@mui/material";
import Layout from "../components/Layout";
import NextLink from 'next/link';
import UseStyles from "../utils/styles";
import Axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";


export default function Login(){
    let router = useRouter();
    const { redirect } = router.query; // login?redirect=/shipping
    let {state,dispatch} = useContext(Store);
    let {userInfo} = state;
    useEffect(()=>{
       if(userInfo){
        router.push('/')
       }
    },[])
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let classes = UseStyles();
    let handleSubmitLogin = async(event)=>{
       event.preventDefault();
       try{
         let {data} = await Axios.post('/api/users/login',{email,password})
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
                <Typography variant="h1" component="h1">Login</Typography>
                <List>
                    <ListItem>
                        <TextField variant="outlined" fullWidth id="email" label="Email" inputProps={{type:'email'}} onChange={e=>setEmail(e.target.value)}></TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" fullWidth id="password" label="Password" inputProps={{type:'password'}} onChange={e=>setPassword(e.target.value)}></TextField>
                    </ListItem>
                    <ListItem>
                        <Button type="submit" variant="contained" fullWidth color="primary">Login</Button>
                    </ListItem>
                    <ListItem>
                        Don't have an account?&nbsp; <NextLink href="/register" passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}