import { PropsWithChildren, ReactElement } from 'react';

import css from './MainLayout.module.scss';

export default function MainLayout({ children }: PropsWithChildren): ReactElement {
  return (
    <>
      <div>MainLayout</div>
      <div className={css.wrapper}>{children}</div>
    </>
  );
}
