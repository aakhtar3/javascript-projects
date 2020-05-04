import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Graph from './Graph';
import Alert from './Alert';
import service from '../service';
import { addEvent } from '../actions/eventAction';
import { RATE } from '../constants/timeConstant';

/**
 * Real-Time Seris Graph.
 */
export class TimeSeries extends React.Component {
  /**
   * Starts the interval to pull data by the rate.
   */
  componentDidMount() {
    this.pullData();
    this.interval = setInterval(() => this.pullData(), RATE);
  }

  /**
   * Clear out the interval once the component is unmounted.
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Fetch data from API.
   * @returns {Object}
   */
  async fetchData() {
    let data = {};
    try {
      const response = await service.fetchLoadAverageRequest();
      data = response.body;
    } catch (err) {
      // console.error(err);
    }
    return data;
  }

  /**
   * Determines if the alert threshold has been triggered.
   * @param {Array} events
   * @param {Boolean} hasAlertThreshHold
   * @returns {Boolean}
   */
  checkAlertThreshHold(events, hasAlertThreshHold) {
    let hasMetThreshold = false;
    // Two minutes is 12 elements in event state.
    const twoMinutesSize = 12;
    // Check if there are at least 2 minutes of data.
    if (events && events.length > twoMinutesSize - 1) {
      // Compute the last two minutes to see if there is a threshold break or recovery.
      const lastTwoMinutes = events.slice(Math.max(events.length - twoMinutesSize, 1)).reverse();

      // Get the average for the past two minutes.
      let sum = 0;
      lastTwoMinutes.forEach((item) => {
        const [time, event, alert] = item;
        // Use Max comparison to get the true value of the event,
        // min values will be -0.9, which is off the graph view.
        sum += Math.max(event, alert);
      });
      const average = sum / twoMinutesSize;
      hasMetThreshold = average > 1;

      // Determine if we need to display an alert of the threshold
      // has been broken or if it has been recovered.
      const [time, belowThreshold, aboveThreshold] = lastTwoMinutes[0];
      if (!hasAlertThreshHold && hasMetThreshold) {
        const load = Math.max(belowThreshold, aboveThreshold);
        Alert(
          `error`,
          `High load - ${ load }, triggered at ${ time }`,
        );
      } else if (hasAlertThreshHold && !hasMetThreshold) {
        Alert(`success`, `Alert recovered at ${ time }`);
      }
    }

    return hasMetThreshold;
  }

  /**
   * Business logic to pull data, identify alert, and update state.
   */
  async pullData() {
    const { timeStamp, averageLoad } = await this.fetchData();
    if (timeStamp && averageLoad) {
      const { events, hasAlertThreshHold, dispatch } = this.props;
      const currentTime = new Date(timeStamp + RATE);
      const hasBrokenThreshold = this.checkAlertThreshHold(events, hasAlertThreshHold);

      // Hide values with -0.9 from graph based on hasBrokenThreshold
      // values are determined with max comparison.
      const belowThreshold = !hasBrokenThreshold ? averageLoad : -0.9;
      const aboveThreshold = hasBrokenThreshold ? averageLoad : -0.9;
      const event = [currentTime, belowThreshold, aboveThreshold];

      const payload = {
        ...(events && { events: [...events, event] }),
        hasAlertThreshHold: hasBrokenThreshold,
        currentTime,
      };

      dispatch && dispatch(addEvent(payload));
    }
  }

  render() {
    const { currentTime } = this.props;

    return (
      <div>
        <span>{ `${ currentTime }` }</span>
        <hr />
        <Graph />
        <ToastContainer position="bottom-right" />
      </div>
    );
  }
}

export const mapStateToProperties = (state) => ({
  currentTime: state.eventReducer.currentTime,
  events: state.eventReducer.events,
  hasAlertThreshHold: state.eventReducer.hasAlertThreshHold,
});

Graph.propTypes = {
  currentTime: PropTypes.object,
  events: PropTypes.array,
  hasAlertThreshHold: PropTypes.bool,
};

export default connect(mapStateToProperties)(TimeSeries);
