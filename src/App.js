import React from "react";
import Navbar from "./components/Navbar/Navbar.js";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PostDetails from './components/PostDetails/PostDetails';
import { Container } from "@material-ui/core";
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxwidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />}/>
          <Route path="/auth" exact component={Auth}/>
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
        </Switch>
        
      </Container>
    </BrowserRouter>
  );
};
export default App;
