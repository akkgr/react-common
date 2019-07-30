import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useContext } from 'react';
import jwt from 'jsonwebtoken';
import storage from '../modules/storage';
var tokenSuffix = 'token';
var sessionSuffix = 'auth';
var AuthContext = React.createContext(null);

var AuthProvider = function AuthProvider(props) {
  var token = storage.get(tokenSuffix);
  var session = storage.get(sessionSuffix);

  var getSession = function getSession() {
    if (!session && token) {
      session = jwt.decode(token);
      storage.set(sessionSuffix, session);
    }

    return session;
  };

  var isExpired = function isExpired() {
    var session = getSession();
    var expired = session && session.exp * 1000 < new Date().valueOf();
    return expired;
  };

  var initAuthentication = function initAuthentication() {
    session = getSession();
    var check = session && session.username && !isExpired();
    return check;
  };

  var signIn = function signIn(token) {
    var session = jwt.decode(token);
    storage.set(tokenSuffix, token);
    storage.set(sessionSuffix, session);
    setIsAuthenticated(true);
  };

  var signOut = function signOut() {
    storage.remove(tokenSuffix);
    storage.remove(sessionSuffix);
    setIsAuthenticated(false);
  };

  var _useState = useState(initAuthentication()),
      _useState2 = _slicedToArray(_useState, 2),
      isAuthenticated = _useState2[0],
      setIsAuthenticated = _useState2[1];

  return React.createElement(AuthContext.Provider, {
    value: {
      isAuthenticated: isAuthenticated,
      signIn: signIn,
      signOut: signOut
    }
  }, props.children);
};

export var useAuth = function useAuth() {
  return useContext(AuthContext);
};
export default AuthProvider;