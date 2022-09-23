import React from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";

export default function Payment(){
    return(
        <React.Fragment>
            <Layout title="payment method">
                <CheckoutWizard activeStep={2}/>
            </Layout>
        </React.Fragment>
    )
}