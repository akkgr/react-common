import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import storage from './storage';
var defaultOptions = {
  timeOut: 2 * 60 * 1000,
  reconnectDelay: 6 * 1000,
  logLevel: LogLevel.Debug,
  accessTokenFactory: function accessTokenFactory() {
    return storage.get('token');
  }
};

function hubConnectionBuilder(_x, _x2) {
  return _hubConnectionBuilder.apply(this, arguments);
}

function _hubConnectionBuilder() {
  _hubConnectionBuilder = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(url, options) {
    var config, connection, start, _start;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _start = function _ref3() {
              _start = _asyncToGenerator(
              /*#__PURE__*/
              _regeneratorRuntime.mark(function _callee2() {
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (config.accessTokenFactory()) {
                          _context2.next = 2;
                          break;
                        }

                        return _context2.abrupt("return");

                      case 2:
                        _context2.prev = 2;
                        _context2.next = 5;
                        return connection.start();

                      case 5:
                        _context2.next = 11;
                        break;

                      case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](2);
                        console.log(_context2.t0);
                        setTimeout(function () {
                          return start();
                        }, config.reconnectDelay);

                      case 11:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[2, 7]]);
              }));
              return _start.apply(this, arguments);
            };

            start = function _ref2() {
              return _start.apply(this, arguments);
            };

            config = Object.assign({}, defaultOptions, options);
            connection = new HubConnectionBuilder().withUrl(url, {
              accessTokenFactory: config.accessTokenFactory
            }).configureLogging(config.accessTokenFactory).build();
            connection.serverTimeoutInMilliseconds = config.timeOut;
            connection.onclose(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee() {
              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return start();

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));
            _context3.next = 8;
            return start();

          case 8:
            return _context3.abrupt("return", connection);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _hubConnectionBuilder.apply(this, arguments);
}

export default hubConnectionBuilder;