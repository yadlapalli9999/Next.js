import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import NextLink from 'next/link';
import styles from '../styles/Home.module.css'
import data from '../utils/data'

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {
            data.products.map((product)=>(
              <Grid item md={4} key={product.name}>
                <Card>
                  <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea >
                    <CardMedia component="img" image={product.image} title={product.name}/>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                  </CardActionArea>
                  </NextLink>

                  <CardActions>
                    <Typography>${product.price}</Typography>
                    <Button size="small" color='primary'>Add To Cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </div>
    </div>
    </Layout>
    
  )
}
