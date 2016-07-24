import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import storeShape from '../utils/storeShape';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function select(...args) {
  const resultFunc = args.pop();
  const selectors = args.map(content => state => state[content]);

  return function wrapWithSelect(WrappedComponent) {
    const Select = function Select(props, context) {
      const store = context.store;
      const contents = store.getState();
      const selections = selectors.map(selector => selector(contents));

      return React.createElement(WrappedComponent, Object.assign(
        {},
        props,
        resultFunc(...selections)
      ));
    };

    Select.displayName = `Select(${getDisplayName(WrappedComponent)})`;
    Select.WrappedComponent = WrappedComponent;
    Select.contextTypes = { store: storeShape.isRequired };

    return hoistStatics(Select, WrappedComponent);
  };
}

export default select;
