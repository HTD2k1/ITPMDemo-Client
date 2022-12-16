import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import decode from 'jwt-decode'
import IUlogo from "../../images/IUlogo.png";

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  useEffect(() => {
    const token = user?.token;
    if( token){
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout(); 
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])
  const logout = () =>{
    dispatch({type:"LOGOUT"});
    setUser(null);
    history.push('/');
  }
  
  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
      <img className={classes.image} src={IUlogo} alt="IUlogo" height="100" />
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h3"
          align="center"
        >
          ChoIU 
        </Typography>
        
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
              styles ={{margin: "10px"}}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.name} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
