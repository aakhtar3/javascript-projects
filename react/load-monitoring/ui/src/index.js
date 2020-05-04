import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import store from './store';

/**
 * Render React application by passing redux store as a prop.
 */
render(
  <Root store={store} />,
  document.getElementById(`react`),
);
