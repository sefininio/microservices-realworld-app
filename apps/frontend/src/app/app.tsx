import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header } from '../components';
import { Article, Home, Login, Publish, Register } from '../pages';
import { StyledApp } from './app.styled';

export function App() {
  return (
    <StyledApp>
      <Header />
      <Switch>
        <Redirect from="/" to="/home" exact />
        <Route path="/home" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/article" component={Article} exact />
        <Route path="/publish" component={Publish} exact />
      </Switch>
    </StyledApp>
  );
}

export default App;
