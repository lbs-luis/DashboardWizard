import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from './pages/app/dashboard/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { SignUp } from './pages/auth/sing-up'
import { Sales } from './pages/app/sales/sales'
import { NotFound } from './pages/404'
import { Error } from './pages/error'
import { Products } from './pages/app/products/products'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/sales',
        element: <Sales />,
      },
      {
        path: '/products',
        element: <Products />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
