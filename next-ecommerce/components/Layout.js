import React from "react";
import Head from "next/head";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import UseStyles from "../utils/styles";


export default function Layout({children}){
    const classes = UseStyles();
    return(
        <div>
            <Head>
                <title>Next Ecommerce</title>
            </Head>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Typography>Next eCommerce</Typography>
                </Toolbar>
            </AppBar>
            <Container className={classes.main}>
                {children}
            </Container>
            <footer className={classes.footer}>
                <Typography>All Rights Reserved. Next Ecommerce</Typography>
            </footer>
        </div>
    )
}
