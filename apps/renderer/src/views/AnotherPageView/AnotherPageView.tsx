import { ReactElement } from 'react';

import MainNavigation from '../../components/MainNavigation.js';
import MainLayout from '../../layouts/MainLayout.js';

export default function AnotherPageView(): ReactElement {
  return (
    <MainLayout>
      <h3>Another page</h3>
      <MainNavigation />
    </MainLayout>
  );
}
