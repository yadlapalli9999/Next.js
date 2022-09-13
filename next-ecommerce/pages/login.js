import { Button, Input, Link, List, ListItem, TextField, Typography } from "@mui/material";
import Layout from "../components/Layout";
import NextLink from 'next/link';
import UseStyles from "../utils/styles";
import Axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from 'notistack';
export default function Login(){
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    let router = useRouter();
    const { redirect } = router.query; // login?redirect=/shipping
    let {state,dispatch} = useContext(Store);
    let {userInfo} = state;
    useEffect(()=>{
       if(userInfo){
        router.push('/')
       }
    },[])
    
    let classes = UseStyles();
    let handleSubmitLogin = async({email,password})=>{
        closeSnackbar()
       try{
         let {data} = await Axios.post('/api/users/login',{email,password})
         dispatch({type:'USER_LOGIN', payload:data})
         // dataSet = JSON.stringify(data);
         console.log(data)
         Cookies.set('userInfo',data)
         alert('success login')
         router.push(redirect || '/')

       }catch(err){
        //enqueueSnackbar(getError(err), { variant: 'error' });
        //alert(err.response.data? err.response.data.message:err.message)
        enqueueSnackbar(err.response.data? err.response.data.message:err.message,{variant:'error'})

       }
    }
    return(
        <Layout title="Login">
            <form className={classes.form} onSubmit={handleSubmit(handleSubmitLogin)}>
                <Typography variant="h1" component="h1">Login</Typography>
                <List>
                    <ListItem>
                    <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
                    </ListItem>
                    <ListItem>
                    <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
                    </ListItem>
                    <ListItem>
                        <Button type="submit" variant="contained" fullWidth color="primary">Login</Button>
                    </ListItem>
                    <ListItem>
                        Don't have an account?&nbsp; <NextLink href={`/register?redirect=${redirect || '/'}`} passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}