import React, { useContext,useState } from "react";
import Head from "next/head";
import { AppBar, Container, CssBaseline, Link, Switch, ThemeProvider, Toolbar, Typography,Badge, Button,Menu,MenuItem } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import NextLink from 'next/link';
import UseStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";


export default function Layout({children,title,description}){
    const {state,dispatch} = useContext(Store);
    const {darkMode,cart,userInfo} = state;
    const router = useRouter();
    // console.log(JSON.stringify(userInfo.name))
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutUser = ()=>{
    setAnchorEl(null);
    dispatch({type:'USER_LOGOUT'});
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/')
    
  }
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
                            {cart.cartItems.length > 0? <Badge badgeContent={cart.cartItems.length}>Cart</Badge>:"Cart"}
                            </Link>
                        </NextLink>
                        {
                            userInfo?(
                                <>
                            <Button className={classes.navbarButton}  id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>{userInfo.name}</Button>
                            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogoutUser}>Logout</MenuItem>
      </Menu>
                            </>
                            ):(<NextLink href="/login" passHref>
                            <Link>
                               Login
                            </Link>
                        </NextLink>)
                        }
                        
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
