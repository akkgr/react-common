import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
var BREAKPOINT = 800;
var LayoutContext = createContext(null);

var LayoutProvider = function LayoutProvider(_ref) {
  var children = _ref.children;
  var auth = useAuth();

  var _useState = useState({
    view: window.innerWidth > BREAKPOINT ? 'web' : 'mobile',
    auth: auth.isAuthenticated
  }),
      _useState2 = _slicedToArray(_useState, 2),
      layout = _useState2[0],
      setLayout = _useState2[1];

  useEffect(function () {
    var handleResize = function handleResize() {
      if (window.innerWidth <= BREAKPOINT && layout.view !== 'mobile') {
        setLayout(function (prevLayout) {
          return _objectSpread({}, prevLayout, {
            view: 'mobile'
          });
        });
      }

      if (window.innerWidth > BREAKPOINT && layout.view !== 'web') {
        setLayout(function (prevLayout) {
          return _objectSpread({}, prevLayout, {
            view: 'web'
          });
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, [layout]);
  useEffect(function () {
    setLayout(function (prevLayout) {
      return _objectSpread({}, prevLayout, {
        auth: auth.isAuthenticated
      });
    });
  }, [auth.isAuthenticated]);
  return React.createElement(LayoutContext.Provider, {
    value: layout
  }, children);
};

export var useLayout = function useLayout() {
  return useContext(LayoutContext);
};
export default LayoutProvider;