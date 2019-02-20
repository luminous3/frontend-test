import React from 'react';

const withLoading = (LoadingComponent) => (WrappedComponent) => (props) => {
  return props.loading
    ? <LoadingComponent />
    : <WrappedComponent {...props} />
}

export default withLoading;
