import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import App from './App';

/**
 * Root component that connects Redux, router, and React together.
 * @param {Object} store
 */
const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </HashRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
