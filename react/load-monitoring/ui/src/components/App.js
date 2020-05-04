import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import TimeSeries from './TimeSeries';
import { setIsReady } from '../actions/appAction';

/**
 * App container that will load the Application
 */
export class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setIsReady({ isReady: true }));
  }

  render() {
    const { isReady } = this.props;

    return (isReady
      ? <TimeSeries />
      : <div>Attempting to Fetch Data...</div>
    );
  }
}

export const mapStateToProperties = (state) => ({
  isReady: state.appReducer.isReady,
});

App.propTypes = {
  isReady: PropTypes.bool,
};

export default connect(mapStateToProperties)(App);
