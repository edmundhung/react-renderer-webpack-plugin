import React, { Component, PropTypes } from 'react';
import storeShape from '../utils/storeShape';

class Provider extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  getChildContext() {
    return { store: this.store };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.propTypes = {
  store: storeShape.isRequired,
  children: PropTypes.element.isRequired,
};

Provider.childContextTypes = {
  store: storeShape.isRequired,
};

export default Provider;
