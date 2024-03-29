import React, { useContext,useState,useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from "../util/Store";
import { signOut, useSession } from "next-auth/react";
import { Menu } from '@headlessui/react';
import DropdownLink from "./DropDownLink";
import Cookies from "js-cookie";

export default function Layout({title,children}){
    const { status, data: session } = useSession();
    const {state,dispatch} = useContext(Store)
    const {cart} = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  let logoutClickHandler = () =>{
    Cookies.remove('cart');
    dispatch({type:'CART_RESET'})
    signOut({callbackUrl:'/login'})
  }
    return(
        <React.Fragment>
             <Head>
        <title>{title ? title + '- Ecommerce':'Ecommerce'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className='flex min-h-screen flex-col justify-between'>
            <header>
                <nav className="flex h-12 px-4 items-center justify-between shadow-md">
                    <Link href="/">
                        <a className="text-lg  font-bold">Ecommerce</a>
                    </Link>
                    <div >
                        <Link href="/cart"><a className="p-2">Cart {cart.cartItems.length > 0 && (
                            <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">{cartItemsCount}</span>
                        )}</a></Link>

                        {
                            status === 'loading'? ('Loading'):session?.user?(
                            <Menu as="div" className="relative inline-block">
                                <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                            </Menu>)
                            :(<Link href="/login"><a className="p-2">Login</a></Link>
                            )
                        }

                    </div>
                </nav>
            </header>
            <main className="container m-auto mt-4 px-4">{children}</main>
            <footer className="flex h-10 justify-center item-center shadow-inner"><p>Copyrights © 2022 Ecommerce  </p></footer>
      </div>      
        </React.Fragment>
    )
}