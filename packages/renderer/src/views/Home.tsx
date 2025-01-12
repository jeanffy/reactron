import { Trans } from 'react-i18next';

import Assets from '../components/Assets';
import Dummies from '../components/Dummies';
import ProgramInfo from '../components/ProgramInfo';
import appContext from '../services/app-context';
import styles from './Home.module.scss';

export default function Home(): JSX.Element {
  //const { t } = useTranslation();

  appContext.logger.debug({ module: 'Home', msg: 'rendering Home component' });

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.headParagraph}>
          {/*
            {t('views.home.greeting')}
            Trans component here to handle <br/> in translation files
          */}
          <Trans i18nKey="views.home.greeting" />
        </p>
        <div>
          <ProgramInfo />
        </div>
        <div>
          <Assets />
        </div>
        <div>
          <Dummies howMany={3} />
        </div>
      </div>
    </>
  );
}
