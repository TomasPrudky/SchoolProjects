import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axiosInstance from '../axiosInstance/AxiosInstance';
import { Alert } from "@mui/material";
import { useState } from "react";

export default function SignUp() {

    const [showAlert, setShowAlert] = useState(false);

    function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("password") !== data.get("password_control")){
            setShowAlert(true);
            return;
        }
        console.log({
            username: data.get("username"),
            email: data.get("email"),
            password: data.get("password"),
        });

        axiosInstance.get('/test/all')
            .then(response =>{
                console.log(response.data);
            })
            .catch(error => {

            });

        axiosInstance.post('/auth/signup', {
            username: data.get("username"),
            email: data.get("email"),
            role: ["user"],
            password: data.get("password")
            })
            .then(response => {
                console.log(response);
                window.location.replace("/signin");
            })
            .catch(error => {
                console.log(console.error());
            })
        
            setShowAlert(false);
    };

    return (
        <Container component="main" maxWidth="sm">
            
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {showAlert && <Alert id="alert" margin="normal" severity="warning">This is a warning alert — check it out!</Alert>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="nickname"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password_control"
                        label="Password"
                        type="password"
                        id="password_control"
                        autoComplete="new-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                {"If you have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}