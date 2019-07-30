// modules
import storage from './modules/storage'
import Api from './modules/api'

// contexts
import AuthProvider, { useAuth } from './contexts/AuthProvider'
import LayoutProvider, { useLayout } from './contexts/LayoutProvider'
import LoadingProvider, { useLoading } from './contexts/LoadingProvider'

// hooks
import { useRouter, useLocation, useParams } from './hooks/useRouter'
import { useUrlQuery } from './hooks/useUrlQuery'

export { storage, Api }
export {
  AuthProvider,
  useAuth,
  LayoutProvider,
  useLayout,
  LoadingProvider,
  useLoading
}
export { useRouter, useLocation, useParams, useUrlQuery }
