import { Button, Input, Link, List, ListItem, TextField, Typography } from "@mui/material";
import Layout from "../components/Layout";
import NextLink from 'next/link';
import UseStyles from "../utils/styles";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";



export default function Shipping(){
    const { control, handleSubmit, formState: { errors },setValue } = useForm();

    let router = useRouter();
    const { redirect } = router.query; // login?redirect=/shipping
    let {state,dispatch} = useContext(Store);
    let {userInfo,cart:{shippingAddress}} = state;
    useEffect(()=>{
       if(!userInfo){
        router.push('/login?redirect=/shipping')
       }
       setValue('fullName', shippingAddress?.fullName);
       setValue('address', shippingAddress?.address);
       setValue('city', shippingAddress?.city);
       setValue('postalCode', shippingAddress?.postalCode);
       setValue('country', shippingAddress?.country);    
    },[])
   

    let classes = UseStyles();
    let handleSubmitShipping = ({fullName, address,city,postalCode,country})=>{
    
       
         //let {data} = await Axios.post('/api/users/s',{fullName,address,city,postalCode,country})
         dispatch({type:'SAVE_SHIPPING_ADDRESS', payload:{fullName,address,city,postalCode,country}})
        // const dataSet = {fullName,address,city,postalCode,country};
         Cookies.set('shippingAddress',JSON.stringify({fullName,address,city,postalCode,country}))
         router.push('/payment')
    }
   
    return(
        <Layout title="Shipping order">
          <CheckoutWizard activeStep={1}/>
            <form className={classes.form} onSubmit={handleSubmit(handleSubmitShipping)}>
                <Typography variant="h1" component="h1">Shipping</Typography>
                <List>
                <ListItem>
            <Controller
              name="fullName"
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
                  id="fullName"
                  label="FullName"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name length is more than 1'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
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
                  id="address"
                  label="Address"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'Address length is more than 1'
                        : 'Address is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

           <ListItem>
            <Controller
              name="city"
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
                  id="city"
                  label="City"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'City length is more than 1'
                        : 'City is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
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
                  id="postalCode"
                  label="Postal Code"
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'Postal Code length is more than 1'
                        : 'Postal  Code is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="country"
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
                  id="country"
                  label="Country"
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === 'minLength'
                        ? 'Country length is more than 1'
                        : 'Country is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
                    <ListItem>
                        <Button type="submit" variant="contained" fullWidth color="primary">Continue</Button>
                    </ListItem>
                    
                </List>
            </form>
        </Layout>
    )
}