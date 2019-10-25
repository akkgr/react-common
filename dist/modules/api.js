import _regeneratorRuntime from "@babel/runtime/regenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import storage from './storage';

function getJson(_x) {
  return _getJson.apply(this, arguments);
}

function _getJson() {
  _getJson = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee6(req) {
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return req.json();

          case 3:
            return _context6.abrupt("return", _context6.sent);

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            console.error('json serialization error', _context6.t0);
            return _context6.abrupt("return", null);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 6]]);
  }));
  return _getJson.apply(this, arguments);
}

function errorHandler(_x2, _x3) {
  return _errorHandler.apply(this, arguments);
}

function _errorHandler() {
  _errorHandler = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee7(res, body) {
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (res.ok) {
              _context7.next = 2;
              break;
            }

            throw new Error(body && body.Message || "".concat(res.statusText, " (").concat(res.status, ")"));

          case 2:
            return _context7.abrupt("return", body);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _errorHandler.apply(this, arguments);
}

function request(_x4) {
  return _request.apply(this, arguments);
}

function _request() {
  _request = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee8(_ref) {
    var method, headers, url, data, bodyParser, errorHandler, signal, options, isJson, res, parsed, handled;
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            method = _ref.method, headers = _ref.headers, url = _ref.url, data = _ref.data, bodyParser = _ref.bodyParser, errorHandler = _ref.errorHandler, signal = _ref.signal;
            _context8.prev = 1;
            options = {
              method: method,
              headers: headers,
              signal: signal
            };
            isJson = headers.get('Content-Type') === 'application/json';

            if (data) {
              options.body = isJson ? JSON.stringify(data) : data;
            }

            _context8.next = 7;
            return fetch(url, options);

          case 7:
            res = _context8.sent;
            _context8.next = 10;
            return bodyParser(res);

          case 10:
            parsed = _context8.sent;
            _context8.next = 13;
            return errorHandler(res, parsed);

          case 13:
            handled = _context8.sent;
            return _context8.abrupt("return", handled);

          case 17:
            _context8.prev = 17;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);

            if (_context8.t0.name === 'AbortError') {
              console.log('fetch aborted', url);
            }

            return _context8.abrupt("return", _context8.t0);

          case 22:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 17]]);
  }));
  return _request.apply(this, arguments);
}

var Api =
/*#__PURE__*/
function () {
  function Api(baseUrl) {
    _classCallCheck(this, Api);

    this.baseUrl = baseUrl || process.env.REACT_APP_API_URL;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.bodyParser = getJson;
    this.errorHandler = errorHandler;
  }

  _createClass(Api, [{
    key: "withToken",
    value: function withToken(token) {
      if (!token) {
        token = storage.get('token');
      }

      if (typeof token === 'function') {
        token = token();
      }

      this.headers.delete('Authorization');

      if (token) {
        this.headers.set('Authorization', "Bearer ".concat(token));
      }

      return this;
    }
  }, {
    key: "withHeader",
    value: function withHeader(key, value) {
      if (!value) {
        this.headers.delete(key);
        return this;
      }

      this.headers.set(key, value);
      return this;
    }
  }, {
    key: "withBodyParser",
    value: function withBodyParser(bodyParser) {
      this.bodyParser = bodyParser;
      return this;
    }
  }, {
    key: "withErrorHandler",
    value: function withErrorHandler(errorHandler) {
      this.errorHandler = errorHandler;
      return this;
    }
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(url, abortSignal) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return request({
                  method: 'GET',
                  headers: this.headers,
                  url: this.baseUrl + url,
                  bodyParser: this.bodyParser,
                  errorHandler: this.errorHandler,
                  signal: abortSignal
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x5, _x6) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(url, data, abortSignal) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return request({
                  method: 'POST',
                  headers: this.headers,
                  url: this.baseUrl + url,
                  data: data,
                  bodyParser: this.bodyParser,
                  errorHandler: this.errorHandler,
                  signal: abortSignal
                });

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function post(_x7, _x8, _x9) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "put",
    value: function () {
      var _put = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(url, data, abortSignal) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return request({
                  method: 'PUT',
                  headers: this.headers,
                  url: this.baseUrl + url,
                  data: data,
                  bodyParser: this.bodyParser,
                  errorHandler: this.errorHandler,
                  signal: abortSignal
                });

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function put(_x10, _x11, _x12) {
        return _put.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: "patch",
    value: function () {
      var _patch = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(url, data, abortSignal) {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return request({
                  method: 'PATCH',
                  headers: this.headers,
                  url: this.baseUrl + url,
                  data: data,
                  bodyParser: this.bodyParser,
                  errorHandler: this.errorHandler,
                  signal: abortSignal
                });

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function patch(_x13, _x14, _x15) {
        return _patch.apply(this, arguments);
      }

      return patch;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(url, abortSignal) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return request({
                  method: 'DELETE',
                  headers: this.headers,
                  url: this.baseUrl + url,
                  bodyParser: this.bodyParser,
                  errorHandler: this.errorHandler,
                  signal: abortSignal
                });

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _delete(_x16, _x17) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return Api;
}();

export default Api;