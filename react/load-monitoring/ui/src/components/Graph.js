import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from "d3-format";
import {
  ChartContainer,
  ScatterChart,
  ChartRow,
  Charts,
  YAxis,
  Resizable,
} from 'react-timeseries-charts';
import {
  TimeRange,
  TimeSeries,
} from 'pondjs';
import { MINUTE, RATE } from '../constants/timeConstant';

const formatter = format(`.2f`);

/**
 * The component that will render the current timestamp of the most recent metric.
 */
export class Graph extends React.Component {
  state = {
    highlight: null,
  };

  /**
   * Updates the highlight reference on graph.
   * @param {Object}
   */
  updateMouseHightlight = (point) => this.setState({ highlight: point });

  /**
   * Styles the node for reference when the load alert has been triggered.
   * @param {String} column
   * @param {Object} event
   * @return {Object}
   */
  styleNode = (column) => ({
    normal: {
      fill: column === `events` ? `green` : `red`,
      opacity: 1.0,
    },
  });

  /**
   * Computes the time range of nodes.
   * @param {Number} time
   * @param {Object}
   */
  computeTimeRange(time) {
    const timeWindow = 10 * MINUTE;

    const endTime = new Date(time.getTime() + RATE);
    const beginTime = new Date(endTime.getTime() - timeWindow);

    const timeRange = new TimeRange(beginTime, endTime);
    return timeRange;
  }

  buildTimseries(events) {
    let eventSeries;
    if (events) {
      // Time series object that will contain the time, events, and alerts.
      eventSeries = new TimeSeries({
        name: `loadAverage`,
        columns: [`time`, `events`, `alerts`],
        points: events,
      });
    }
    return eventSeries;
  }

  render() {
    const { currentTime, events } = this.props;
    const { highlight } = this.state;

    // Time series object that will contain the time, events, and alerts.
    const eventSeries = this.buildTimseries(events);

    // Gets the info value that is used to update the node selector info.
    const infoValues = highlight
      ? [{ label: `Load Average`, value: `${ formatter(highlight.event.get(highlight.column)) }` }]
      : [];

    // Get the Max height of graph to make it dynamic.
    const yAxisHeight = eventSeries && Math.ceil(Math.max(
      eventSeries.max(`events`),
      eventSeries.max(`alerts`),
    )) + 0.25 || 1;

    const renderCharts = () => (
      <Charts>
        <ScatterChart
          axis="y"
          series={eventSeries}
          columns={[`events`, `alerts`]}
          style={this.styleNode}
          radius={3}
          highlight={highlight}
          info={infoValues}
          infoHeight={28}
          infoWidth={110}
          infoOffsetY={10}
          onMouseNear={(p) => this.updateMouseHightlight(p)}
        />
      </Charts>
    );

    const renderGraph = () => (
      <div>
        <div>
          <Resizable>
            <ChartContainer timeRange={this.computeTimeRange(currentTime)}>
              <ChartRow height="100">
                <YAxis
                  id="y"
                  label="Load Average"
                  min={0}
                  max={yAxisHeight}
                  width="60"
                  type="linear"
                />
                { renderCharts() }
              </ChartRow>
            </ChartContainer>
          </Resizable>
        </div>
      </div>
    );

    return (currentTime && events && eventSeries
      ? renderGraph()
      : <div>Loading...</div>
    );
  }
}

export const mapStateToProperties = (state) => ({
  currentTime: state.eventReducer.currentTime,
  events: state.eventReducer.events,
});

Graph.propTypes = {
  currentTime: PropTypes.object,
  events: PropTypes.array,
};

export default connect(mapStateToProperties)(Graph);
