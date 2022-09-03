import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout = ({children}) =>{
    return(
        <>
          <Head>
            <title>Task App</title>
          </Head>
          <Navbar/>
          {children}
        </>
    )
}