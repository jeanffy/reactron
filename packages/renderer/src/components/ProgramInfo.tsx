import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProgramInfoDto } from 'shared/infra';

import AppContext from '../services/app-context';

export default function ProgramInfo(): JSX.Element {
  const { t } = useTranslation();
  const [programInfo, setProgramInfo] = useState<ProgramInfoDto | undefined>(undefined);

  useEffect(() => {
    async function getProgramInfo(): Promise<void> {
      setProgramInfo(await AppContext.api.getProgramInfo());
    }
    void getProgramInfo();
  }, []);

  return (
    <>
      {t('components.programInfo.title')}
      <br />
      {programInfo !== undefined && (
        <ul>
          <li>
            {t('components.programInfo.nodeVersion')} <b>{programInfo.nodeVersion}</b>
          </li>
          <li>
            {t('components.programInfo.electronVersion')} <b>{programInfo.electronVersion}</b>
          </li>
          <li>
            {t('components.programInfo.chromeVersion')} <b>{programInfo.chromeVersion}</b>
          </li>
        </ul>
      )}
    </>
  );
}
