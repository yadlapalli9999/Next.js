import { ClassNames } from "@emotion/react";
import { useRouter } from "next/router";
import React from "react";
import NextLink from 'next/link';
import Layout from "../../components/Layout";
import data from "../../utils/data";
import UseStyles from "../../utils/styles";
import { Link } from "@mui/material";



export default function ProductDetail(){
    const router = useRouter();
    const {slug} = router.query;
    const product = data.products.find((a)=> a.slug === slug);
    if(!product){
        return <div>Product Not Found</div>
    }
    const classes = UseStyles();
    return(
        <Layout title={product.name}>
           <div className={classes.section}>
             <NextLink href="/" passHref>
                <Link>Back to Products</Link>
             </NextLink>
           </div>
           <Grid container spacing={3}>
             <Grid item md={3}></Grid>
           </Grid>
        </Layout>
    )
}