import React from 'react';

export default function Catch(component, errorHandler) {
  return class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: undefined
      };
    }

    static getDerivedStateFromError(error) {
      return { error };
    }

    componentDidCatch(error, info) {
      if (errorHandler) {
        errorHandler(error, info);
      }
    }

    render() {
      const { state, props } = this;
      return component(props, state.error);
    }
  };
}
