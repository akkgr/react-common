import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray'
import { useState, useEffect } from 'react'
import { useLocation } from './useRouter'
export function useUrlQuery() {
  var _useLocation = useLocation(),
    location = _useLocation.location,
    navigate = _useLocation.navigate

  var _useState = useState(new URLSearchParams(location.search)),
    _useState2 = _slicedToArray(_useState, 2),
    query = _useState2[0],
    setQuery = _useState2[1]

  function changePagination(search, pagination) {
    if (
      pagination.page < 1 ||
      pagination.page > pagination.total ||
      pagination.pageSize < 1
    ) {
      return
    }

    search.set('pageSize', pagination.pageSize)
    search.set('page', pagination.page)
  }

  function changeSorting(search, sorter) {
    if (!sorter.field) {
      search.delete('sortBy')
      search.delete('sortDescending')
    } else {
      search.set(
        'sortBy',
        (sorter.column && sorter.column._sortBy) || sorter.field
      )
      search.set('sortDescending', sorter.order === 'descend')
    }
  }

  function onChange(_ref) {
    var pagination = _ref.pagination,
      filters = _ref.filters,
      sorter = _ref.sorter
    var search = new URLSearchParams(location.search)
    changePagination(search, pagination)
    changeSorting(search, sorter)
    navigate(location.pathname + '?' + search.toString())
  }

  useEffect(
    function() {
      setQuery(function(prevQuery) {
        return prevQuery.toString() === location.search.slice(1)
          ? prevQuery
          : new URLSearchParams(location.search)
      })
    },
    [location.search]
  )
  return {
    query: query,
    onChange: onChange,
    page: parseInt(query.get('page')),
    pageSize: parseInt(query.get('pageSize')),
    sortBy: query.get('sortBy'),
    sortDescending: query.get('sortDescending')
  }
}
