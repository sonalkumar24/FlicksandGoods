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

export default function SignInSide() {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };
    const [user, setUser] = React.useState({})
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    console.log(user, "user")
    let nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BaseURL}/api/user/register`, user)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    toast.success("Register Successfull")
                    nav('/login')
                }
                else{
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        // Add overflow hidden to body when the component mounts
        document.body.style.overflow = 'hidden';
    
        // Remove the overflow hidden when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" 
            sx={{ 
                height: '100vh',
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
                            'url("image.png")',
                        backgroundColor: (t) =>
                            t.palette.mode === 'dark' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                /> */}
                <Grid item xs={12} sm={8} md='auto' component={Paper} elevation={6} 
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 30, height: 30 }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h6">
                            Register
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                type='phone'
                                autoComplete="phone"
                                onChange={handleChange}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type='email'
                                autoComplete="email"
                                onChange={handleChange}
                                autoFocus
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
                                Register
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        {"Already have an account? Login"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}