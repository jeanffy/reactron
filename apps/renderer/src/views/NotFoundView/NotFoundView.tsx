import { ReactElement } from 'react';

import MainNavigation from '../../components/MainNavigation';
import MainLayout from '../../layouts/MainLayout';
import css from './NotFoundView.module.scss';

export default function NotFoundView(): ReactElement {
  return (
    <MainLayout>
      <h1 className={css.notFound}>Not found</h1>
      <p>{window.location.href}</p>
      <MainNavigation />
    </MainLayout>
  );
}
