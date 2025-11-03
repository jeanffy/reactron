import { ReactElement } from 'react';
import { Link } from 'react-router';

import { ROUTE_ANOTHER_PAGE, ROUTE_HOME } from '../router/router-names.js';

export default function MainNavigation(): ReactElement {
  return (
    <>
      <p>
        <Link to={ROUTE_HOME}>Home</Link> | <Link to={ROUTE_ANOTHER_PAGE}>Another</Link> | <Link to="/foobar">Nonexistent link</Link>
      </p>
    </>
  );
}
