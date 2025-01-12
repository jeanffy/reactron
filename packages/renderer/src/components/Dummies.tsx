import { useEffect, useState } from 'react';
import { DummyEntity } from 'shared/domain';

import AppContext from '../services/app-context';

interface DummiesProps {
  howMany: number;
}

export default function Dummies({ howMany }: DummiesProps): JSX.Element {
  const [dummies, setDummies] = useState<DummyEntity[]>([]);

  useEffect(() => {
    async function getDummies(): Promise<void> {
      setDummies(await AppContext.api.getDummies({ howMany }));
    }
    void getDummies();
  }, [howMany]);

  return (
    <>
      <p>Dummies</p>
      <ul>
        {dummies.map(d => (
          <li key={d.name}>{d.name}</li>
        ))}
      </ul>
    </>
  );
}
