import { Button, Input, Link, List, ListItem, TextField, Typography } from "@mui/material";
import Layout from "../components/Layout";
import NextLink from 'next/link';
import UseStyles from "../utils/styles";
import Axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';



export default function Register(){
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
    let handleSubmitLogin = async({name,email,password,confirmPassword})=>{
        closeSnackbar()
       if(password !== confirmPassword){
        enqueueSnackbar('password doesn`t match',{variant:'error'})
        return;
    }
       try{
       
         let {data} = await Axios.post('/api/users/register',{name,email,password})
         dispatch({type:'USER_LOGIN', payload:data})
         // dataSet = JSON.stringify(data);
         console.log(data)
         Cookies.set('userInfo',data)
         router.push(redirect || '/')
         alert('success login')
       }catch(err){
        enqueueSnackbar(err.response.data?err.response.data.message:err.message,{variant:'error'})
       }
    }
    return(
        <Layout title="Login">
            <form className={classes.form} onSubmit={handleSubmit(handleSubmitLogin)}>
                <Typography variant="h1" component="h1">Register</Typography>
                <List>
                <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name length is more than 1'
                        : 'Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
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
            <Controller
              name="confirmPassword"
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
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Confirm Password length is more than 5'
                        : 'Confirm  Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
                    <ListItem>
                        <Button type="submit" variant="contained" fullWidth color="primary">Register</Button>
                    </ListItem>
                    <ListItem>
                       Already have an account?&nbsp; <NextLink href={`/login?redirect=${redirect || '/'}`} passHref><Link>Login</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}