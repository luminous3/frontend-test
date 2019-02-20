import React from 'react';
import get from 'lodash/get';

const StateContext = React.createContext();

export const withContextState = (defaultState = {}) => (WrappedComponent) => {
  class StateProvider extends React.Component {
    state = defaultState;

    render() {
      return (
        <StateContext.Provider
          value={{
            ...this.state,
            setContextState: this.setContextState,
          }}
        >
          <WrappedComponent {...this.props} />
        </StateContext.Provider>
      );
    }

    setContextState = (state) => {
      this.setState(state);
    };
  }

  return StateProvider;
}

export const connectState = (key, getter) => (WrappedComponent) => (props) => (
  <StateContext.Consumer>
    {(state) => (
      <WrappedComponent {...{
        ...props,
        [key]: getter ? getter(state, props) : get(state, key),
        setContextState: state.setContextState
      }} />
    )}
  </StateContext.Consumer>
);
