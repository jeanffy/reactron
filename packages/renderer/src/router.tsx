import { createHashRouter, Navigate } from 'react-router-dom';

import Home from './views/Home';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
