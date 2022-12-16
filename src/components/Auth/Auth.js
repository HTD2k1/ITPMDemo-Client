import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {AUTH} from '../../constants/actionTypes'
import { signup, signin } from "../../actions/auth";
const initialForm = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  // Use hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  //Use states 
  const [form, setForm] = useState(initialForm)
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  
  const googleSuccess = async (res) =>{
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      console.log("Result: ",result)
      dispatch({type: AUTH, data: {result,token}})
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) =>{
    console.log(error);
    console.log("Google Sign In Unsuccessful");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup){
      dispatch(signup(form,history))
    }
    else{
      dispatch(signin(form,history))
    }
  };
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };
  const switchMode = () => {
    setForm(initialForm)
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false)
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
              />
            )}
          </Grid>
          <Button
            type="Submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="739787854968-lg7l9j1ivtebqtjck1r4212qada3d8td.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Sign In With Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
