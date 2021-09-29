import { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'

const LogInRoute = lazy(() => import('./LogInRoute'))
const SignUpRoute = lazy(() => import('./SignUpRoute'))
const BookRoute = lazy(() => import('../book'))

export default [
  {
    path: '/',
    exact: true,
    component: () => (
      is_authenticated ? <Redirect to="/book" /> : <Redirect to="/login" />
    ),
  }, {
    path: '/login',
    exact: true,
    component: () => (
      is_authenticated ? <Redirect to="/book" /> : (
        <Suspense fallback={null}>
          <LogInRoute />
        </Suspense>
      )
    ),
  }, {
    path: '/signup',
    exact: true,
    component: () => (
      is_authenticated ? <Redirect to="/book" /> : (
        <Suspense fallback={null}>
          <SignUpRoute />
        </Suspense>
      )
    ),
  }, {
    path: '/book',
    exact: true,
    component: () => (
      is_authenticated ? (
        <Suspense fallback={null}>
          <BookRoute />
        </Suspense>
      ) : <Redirect to="/login" />
    ),
  },
]
