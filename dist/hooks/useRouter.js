import { useContext } from 'react';
import { __RouterContext as RouterContext } from 'react-router-dom';
export function useRouter() {
  return useContext(RouterContext);
}
export function useParams() {
  var _useRouter = useRouter(),
      match = _useRouter.match;

  return match.params;
}
export function useLocation() {
  var _useRouter2 = useRouter(),
      location = _useRouter2.location,
      history = _useRouter2.history;

  function navigate(to) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$replace = _ref.replace,
        replace = _ref$replace === void 0 ? false : _ref$replace;

    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
  }

  return {
    location: location,
    navigate: navigate
  };
}