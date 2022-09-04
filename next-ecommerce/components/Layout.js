import React from "react";
import Head from "next/head";
import { AppBar, Container, Link, Toolbar, Typography } from "@mui/material";
import NextLink from 'next/link';
import UseStyles from "../utils/styles";


export default function Layout({children,title,description}){
    const classes = UseStyles();
    return(
        <div>
            <Head>
              <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
              {description && <meta name="description" content={description}></meta>}            
            </Head>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <NextLink href="/" passHref>
                        <Link>
                        <Typography className={classes.brand}>Next eCommerce</Typography>
                        </Link>
                    </NextLink>
                    <div className={classes.grow}></div>
                    <div>
                        <NextLink href="/cart" passHref>
                            <Link>
                               Cart
                            </Link>
                        </NextLink>
                        <NextLink href="/login" passHref>
                            <Link>
                               Login
                            </Link>
                        </NextLink>
                    </div>
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
