import React from 'react';
import PropTypes from 'prop-types';

export default class Root extends React.Component {
  static propTypes = {
    feedItems: PropTypes.array.isRequired,
  };

  componentDidMount = () => {
    this.props.initialize();
  }

  render() {
    return (
      <ul>
        {this.props.feedItems.map((feedItem) => {
          return <li key={feedItem.id}>{feedItem.body}</li>;
        })}
      </ul>
    );
  }
}
