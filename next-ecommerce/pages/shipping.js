import {useRouter}  from "next/router";
import { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function Shipping(){

    let {state,dispatch} = useContext(Store)
    let {userInfo} = state;
    let router = useRouter();

    if(!userInfo){
        router.push('/login?redirect=/shipping')

    }
    return(
        <Layout title="Shipping">
            <div>Shipping</div>
        </Layout>
    )
}