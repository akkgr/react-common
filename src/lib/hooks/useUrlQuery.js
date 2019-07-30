import { useState, useEffect } from 'react'
import { useLocation } from './useRouter'

export function useUrlQuery() {
  const { location, navigate } = useLocation()
  const [query, setQuery] = useState(new URLSearchParams(location.search))

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

  function onChange({ pagination, filters, sorter }) {
    const search = new URLSearchParams(location.search)
    changePagination(search, pagination)
    changeSorting(search, sorter)
    navigate(location.pathname + '?' + search.toString())
  }

  useEffect(() => {
    setQuery(prevQuery => {
      return prevQuery.toString() === location.search.slice(1)
        ? prevQuery
        : new URLSearchParams(location.search)
    })
  }, [location.search])

  return {
    query,
    onChange,
    page: parseInt(query.get('page')),
    pageSize: parseInt(query.get('pageSize')),
    sortBy: query.get('sortBy'),
    sortDescending: query.get('sortDescending')
  }
}
