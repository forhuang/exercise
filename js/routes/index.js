import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const LogInRoute = lazy(() => import('./LogInRoute'))
const SignUpRoute = lazy(() => import('./SignUpRoute'))
const BookRoute = lazy(() => import('../book'))

export default [
  {
    path: '/',
    exact: true,
    element: (
      is_authenticated ? <Navigate replace to="/book" /> : <Navigate replace to="/login" />
    ),
  }, {
    path: '/login',
    exact: true,
    element: (
      is_authenticated ? <Navigate replace to="/book" /> : (
        <Suspense fallback={null}>
          <LogInRoute />
        </Suspense>
      )
    ),
  }, {
    path: '/signup',
    exact: true,
    element: (
      is_authenticated ? <Navigate replace to="/book" /> : (
        <Suspense fallback={null}>
          <SignUpRoute />
        </Suspense>
      )
    ),
  }, {
    path: '/book',
    exact: true,
    element: (
      is_authenticated ? (
        <Suspense fallback={null}>
          <BookRoute />
        </Suspense>
      ) : <Navigate replace to="/login" />
    ),
  },
]
