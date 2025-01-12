import { useTranslation } from 'react-i18next';

import image from '../assets/sea-5703965_640.jpg';
import styles from './Assets.module.scss';

export default function Assets(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div>
        <p>{t('components.assets.publicFolder')}</p>
        {/* the ./ prefix for the image path is mandatory to work in the Electron context */}
        <img src="./city-4883769_640.jpg" width="150px" />
      </div>
      <div>
        <p>{t('components.assets.assetsFolder')}</p>
        <img src={image} width="150px" />
      </div>
    </div>
  );
}
