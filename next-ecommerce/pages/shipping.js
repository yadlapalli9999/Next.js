import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Shipping(){
    let router = useRouter();
    router.push('/login')
    return(
        <Layout title="Shipping"></Layout>
    )
}