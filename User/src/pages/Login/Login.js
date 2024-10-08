import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BaseURL } from '../../global';
import toast from 'react-hot-toast';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {'Flicks&Goods '} 
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide({ setToken }) {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

    React.useEffect(() => {
        // Add overflow hidden to body when the component mounts
        document.body.style.overflow = 'hidden';
    
        // Remove the overflow hidden when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const [user, setUser] = React.useState({})
    let nav = useNavigate()
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BaseURL}/user/login`, user)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    localStorage.setItem("token", res.data.token)
                    setToken(res.data.token)
                    toast.success("Login Successful")
                    nav('/')
                }
                else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" 
            sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                justifyContent:'center',
                alignItems: 'center',
            }}>
                <CssBaseline />
                {/* <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url("/static/images/templates/templates-images/sign-in-side-bg.png")',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                /> */}
                <Grid item xs={12} sm={8} md='auto' component={Paper} elevation={8} 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginBottom:'6rem',
                        borderRadius: '16px'
                    }}
                >
                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%', // Ensure the box takes full width
                            maxWidth: '300px', // Limit the max width for better centering
                            
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main',width: 30, height: 30 }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h6">
                            Login
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type='email'
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                onChange={handleChange}
                                id="password"
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        {"Don't have an account? Register"}
                                    </Link>
                                </Grid>
                            </Grid> <br />
                            <Grid item>
                                    <Link to="/" variant="body2">
                                        {"Go to Home page"}
                                    </Link>
                                </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}