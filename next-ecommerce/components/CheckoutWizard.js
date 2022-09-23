import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import UseStyles from "../utils/styles";


export default function CheckoutWizard({activeStep=0}){
   const classes = UseStyles();

   return(
    <React.Fragment>
        <Stepper className={classes.transparentBackgroud} activeStep={activeStep} alternativeLabel>
        {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step)=>(
            <Step key={step}>
                <StepLabel>{step}</StepLabel>
            </Step>
        ))
        }
        </Stepper>
    </React.Fragment>
   )
}