import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Home from '../pages/Home/index';
import Profile from '../pages/Profile/index';
import MainInfo from '../pages/Profile/MainInfo';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/SignUp';
import Products from '../pages/Products/index';
import MainLayout from '../layouts/Main';
import Services from '../pages/Services';

function Router({ token }) {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <Switch location={location}>
          <Route path="/login">{token ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/signUp">
            {token ? <Redirect to="/" /> : <Signup />}
          </Route>

          <MainLayout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/services">
                <Services />
              </Route>
              <Route path="/profile">
                <Profile>
                  <Route>
                    <Switch>
                      <Route path="/profile/main-info">
                        <MainInfo />
                      </Route>
                    </Switch>
                  </Route>
                </Profile>
              </Route>
            </Switch>
          </MainLayout>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token,
  };
};

export default connect(mapStateToProps)(Router);
