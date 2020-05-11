import React from 'react';
import { Router, Route, Switch, withRouter } from 'react-router-dom';

import LazyLoading from '../../components/LazyLoading';
import { history } from './app-history'

import styles from '../../style/index.css';


// This is show case how you can lazy loading component
const ExampleRouteHandler = LazyLoading(() => import('../../views/example'))
const Header = LazyLoading(() => import('../../components/Header/Header'))

// Please remove that, it is an example
const JustAnotherPage = () => (
  <div>
    <h2>This is Just Another Page</h2>
    <p>
      Please remove this from your route, it is just to show case basic setup
      for router.
    </p>
  </div>
)

// This show case how you can access routing info in your component
const HeaderWithRouter = withRouter((props) => <Header {...props} />)

const AppRouter = () => (
  <Router history={history}>
    <div className={styles.container}>
      <HeaderWithRouter />
      <hr />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/" component={ExampleRouteHandler} />
          <Route path="/page" component={JustAnotherPage} />
          <Route path="*" component={ExampleRouteHandler} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default AppRouter;
