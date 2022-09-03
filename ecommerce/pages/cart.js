import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import {XCircleIcon} from '@heroicons/react/outline';
import dynamic from 'next/dynamic';
import Layout from "../components/Layout";
import { Store } from "../util/Store";
import { useRouter } from "next/router";

function CartScreen(){
    let {state,dispatch} = useContext(Store);
    let router = useRouter();
    let {cart:{cartItems}} = state;

    let handleRemoveItem =(item)=>{
        dispatch({type:'CART_REMOVE_ITEM',payload:item})
    }
    let updateCartHandler= (item,qty)=>{
        let quantity = Number(qty);
        dispatch({type:'CART_ADD_ITEM',payload:{...item,quantity}})
    }
    return(
        <React.Fragment>
          <Layout title="Shopping Cart">
             <h1 className="mb-4 text-xl">Shopping Cart</h1>
             {
                cartItems.length === 0?(
                    <div>Cart is empty.  <Link href="/">Go Shopping</Link></div>
                ):(
                    <div className="grid md:grid-cols-4 md:gaps-5">
                        <div className="overflow-x-auto md:col-span-3">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="px-5 text-left">Item</th>
                                        <th className="p-5 text-right">Quantity</th>
                                        <th className="p-5 text-right">Price</th>
                                        <th className="p-5 text-right">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems.map((item)=>(
                                           <tr key={item.slug} className="border-b">
                                              <td>
                                                <Link href={`/product/${item.slug}`}>
                                                    <a className="flex items-center">
                                                    <Image src={item.image} alt={item.name} width="50" height="50"/> &nbsp; {item.name}

                                                    </a>
                                                </Link>
                                              </td>
                                              <td className="p-5 text-right"><select value={item.quantity} onChange={(e)=>updateCartHandler(item,e.target.value)}>
                                                {
                                                    [...Array(item.countInStock).keys()].map((x)=>(
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                                </select></td>
                                              <td className="p-5 text-right">${item.price}</td>
                                              <td className="p-5 text-center"><button onClick={()=>handleRemoveItem(item)}>
                                                <XCircleIcon className="w-5 h-5"></XCircleIcon>
                                                </button> </td>
                                           </tr> 
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="card p-5">
                            <ul>
                                <li>
                                    <div className="pb-3 text-xl">
                                        Subtotal ({cartItems.reduce((a,c)=>a+c.quantity,0)}):$
                                        {cartItems.reduce((a,c)=>a+c.quantity * c.price,0)}
                                    </div>
                                </li>
                                <li>
                                    <button onClick={()=>router.push('login?redirect=/shipping')} className="primary-button w-full">Check out</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
             }
          </Layout>
        </React.Fragment>
    )
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });