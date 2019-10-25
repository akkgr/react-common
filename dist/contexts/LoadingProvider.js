import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { createContext, useContext, useState } from 'react';
var LoadingContext = createContext(null);

function LoadingProvider(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  return React.createElement(LoadingContext.Provider, {
    value: {
      loading: loading,
      setLoading: setLoading
    }
  }, props.children);
}

export var useLoading = function useLoading() {
  return useContext(LoadingContext);
};
export default LoadingProvider;