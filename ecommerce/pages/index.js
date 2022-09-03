import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react';
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import Product from '../models/Product';
import styles from '../styles/Home.module.css';
import db from '../util/db';
import { Store } from '../util/Store';
import axios from 'axios';
import data from '../util/data';

export default function Home({products}) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };
  return (
    <div>
      <Layout title="home page">
         <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {/* {products.map((product)=>(
              <ProductItem product={product} key={product.id}/>
            ))
          } */}
          { data.products.map((product)=>{
            return <ProductItem product={product} key={product.id}/>
})}
         </div>
      </Layout>

      
    </div>
  )
}

export async function getServerSideProps(){
  await db.connect();
  const products = await await Product.find().lean()
 // const data = await JSON.stringify(allproducts);
  return{
    props:{
      products:products.map(db.convertDocToObj)
    }
  }
}