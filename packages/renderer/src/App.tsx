import './App.scss';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import AppContext from './services/app-context';

function App(): JSX.Element {
  const { i18n } = useTranslation();

  useEffect(() => {
    void i18n.changeLanguage(AppContext.locale);
  }, [i18n]);

  return <RouterProvider router={router} />;
}

export default App;
