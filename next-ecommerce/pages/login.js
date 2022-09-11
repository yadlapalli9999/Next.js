import { Button, Input, Link, List, ListItem, TextField, Typography } from "@mui/material";
import Layout from "../components/Layout";
import NextLink from 'next/link';
import UseStyles from "../utils/styles";


export default function Login(){
    let classes = UseStyles();
    return(
        <Layout title="Login">
            <form className={classes.form}>
                <Typography variant="h1" component="h1">Login</Typography>
                <List>
                    <ListItem>
                        <TextField variant="outlined" fullWidth id="email" label="Email" inputProps={{type:'email'}}></TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" fullWidth id="password" label="Password" inputProps={{type:'password'}}></TextField>
                    </ListItem>
                    <ListItem>
                        <Button type="submit" variant="contained" fullWidth color="primary">Login</Button>
                    </ListItem>
                    <ListItem>
                        Don't have an account?&nbsp; <NextLink href="/register" passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}