import { useRouter } from "next/router";
import React from "react";
import NextLink from 'next/link';
import Image from 'next/image'
import Layout from "../../components/Layout";
import data from "../../utils/data";
import UseStyles from "../../utils/styles";
import { Link,Grid, List, ListItem, Typography, Card, Button } from "@mui/material";



export default function ProductDetail(){
    const router = useRouter();
    const {slug} = router.query;
    const product = data.products.find((a)=> a.slug === slug);
    if(!product){
        return <div>Product Not Found</div>
    }
    const classes = UseStyles();
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
                <Image src={product.image} alt={product.name} Layout="responsive" width={640} height={640}/>
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
                            <Button fullWidth variant="contained" color="primary">Add to Cart</Button>
                        </ListItem>
                    </List>
                </Card>
             </Grid>
           </Grid>
        </Layout>
    )
}