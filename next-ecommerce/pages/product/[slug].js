import { useRouter } from "next/router";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import NextLink from 'next/link';
import Image from 'next/image'
import Layout from "../../components/Layout";
import data from "../../utils/data";
import UseStyles from "../../utils/styles";
import Axios from 'axios';
import { Link,Grid, List, ListItem, Typography, Card, Button } from "@mui/material";
import db from "../../utils/db";
import Product from "../../model/Product";
import { Store } from "../../utils/Store";



function ProductDetail(props){
    const {dispatch} = useContext(Store)
    const {product} = props;
    const router = useRouter();
    //const {slug} = router.query;
    //const product = data.products.find((a)=> a.slug === slug);
    if(!product){
        return <div>Product Not Found</div>
    }
    const classes = UseStyles();

    const handleAddToCart = async()=>{
      const {data} = await Axios.get(`/api/products/${product._id}`);
    //   dynamic(() => import(), {ssr: false})

      console.log(data)
      if(data.countInStock <= 0){
         typeof window.alert('Sorry. Product is out of Stock')
         return;
      }
      dispatch({type:'CART_ADD_ITEM',payload:{...product,quantity : 1}})
      router.push('/cart')
    }
    return(
        <Layout title={product.name} description={product.description}>
           <div className={classes.section}>
             <NextLink href="/" passHref>
                <Link>
                   <Typography>Back to Products</Typography></Link>
             </NextLink>
           </div>
           <Grid container spacing={1}>
             <Grid item md={6} xs={12}>
                <Image src={product.image} alt={product.name} layout="responsive" width={640} height={640}/>
             </Grid>
             <Grid item md={3} xs={12}>
                <List>
                    <ListItem>
                        <Typography component="h1" variant="h1">Category: {product.category}</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Brand: {product.brand}</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Rating :{product.rating} stars ({product.numReviews} reviews)</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Description: {product.description}</Typography>
                    </ListItem>
                </List>
             </Grid>
             <Grid item md={3} xs={12}>
                <Card>
                    <List>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={6}><Typography>Price</Typography></Grid>
                                <Grid item xs={6}>${product.price}</Grid>
                            </Grid>
                           
                        </ListItem>
                        <ListItem>
                        <Grid container>
                                <Grid item xs={6}><Typography>Status</Typography></Grid>
                                <Grid item xs={6}>{product.countInStock >0 ? 'In Stock':'Unavaliable'}</Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Button fullWidth variant="contained" color="primary"  onClick={handleAddToCart}>Add to Cart</Button>
                        </ListItem>
                    </List>
                </Card>
             </Grid>
           </Grid>
        </Layout>
    )
}
export async function getServerSideProps(conetxt){
    const {params} = conetxt;
    const {slug} = params;
    await db.connect();
    const product = await Product.findOne({slug}).lean();
    await db.disconnect();
    return{
        props:{
            product: db.convertDocToObj(product)
        }
    }
}

export default dynamic(()=>Promise.resolve(ProductDetail),{ssr:false})