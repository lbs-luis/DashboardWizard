import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from './app/pages/dashboard/dashboard'
import { SignIn } from './app/auth/sign-in'
import { AppLayout } from './app/_layouts/app'
import { AuthLayout } from './app/_layouts/auth'
import { SignUp } from './app/auth/sing-up'
import { Sales } from './app/pages/sales/sales'
import { NotFound } from './app/404'
import { Error } from './app/error'
import { Products } from './app/pages/products/products'
import { Orders } from './app/pages/orders/orders'

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
      {
        path: '/orders',
        element: <Orders />,
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
