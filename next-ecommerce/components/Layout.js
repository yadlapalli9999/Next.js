import React, { useContext } from "react";
import Head from "next/head";
import { AppBar, Container, CssBaseline, Link, Switch, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import NextLink from 'next/link';
import UseStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";


export default function Layout({children,title,description}){
    const {state,dispatch} = useContext(Store);
    const {darkMode} = state;
    
    const theme = createTheme({
        typography:{
            h1:{
                fontSize:'1.6rem',
                fontWeight:400,
                margin:'1rem 0'
            },
            h2:{
                fontSize:'1.6rem',
                fontWeight:400,
                margin:'1rem 0'
            },
            body1:{
                fontWeight:'normal'
            }
        },
        palette:{
            type:darkMode?'dark':'light',
            primary:{
                main:'#f0c000'
            },
            secondary:{
                main:'#208080'
            }
        }
    })
    const classes = UseStyles();
    const darkModeHandlerChange = ()=>{
        dispatch({type:darkMode?'DARK_MODE_OFF':'DARK_MODE_ON'})
        let  newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode? 'ON':'OFF')
    }
    return(
        <div>
            <Head>
              <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
              {description && <meta name="description" content={description}></meta>}            
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <NextLink href="/" passHref>
                        <Link>
                        <Typography className={classes.brand}>Next eCommerce</Typography>
                        </Link>
                    </NextLink>
                    <div className={classes.grow}></div>
                    <div>
                        <Switch checked={darkMode} onChange={darkModeHandlerChange}></Switch>
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
            </ThemeProvider>
            
        </div>
    )
}
